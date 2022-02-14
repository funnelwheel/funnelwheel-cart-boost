<?php
namespace Upnrunn;

use WP_Query;

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

/**
 * WooCommerce_Grow_Cart_Rewards class.
 * @var [type]
 */
class WooCommerce_Grow_Cart_Rewards {
	public function __construct() {
		add_filter( 'woocommerce_get_shop_coupon_data', [ $this, 'shop_coupon_data' ], 10, 2 );
		add_action( 'woocommerce_before_cart', [ $this, 'auto_add_coupons' ] );
		add_action( 'growcart_before_cart_information', [ $this, 'auto_add_coupons' ] );
		add_filter( 'woocommerce_package_rates', [ $this, 'package_rates' ], 10, 2 );
	}

	public function shop_coupon_data( $coupon, $code ) {
		$cart_contents_count = WC()->cart->get_cart_contents_count();
		$rewards             = $this->get_available_rewards();
		$filtered_rewards    = $this->filter_rewards_by_cart_contents_count( $rewards, $cart_contents_count );

		if ( isset( $filtered_rewards['current_rewards'] ) && count( $filtered_rewards['current_rewards'] ) ) {
			$current_rewards = wp_list_filter( $filtered_rewards['current_rewards'], [ 'id' => $code ] );
			$reward          = current( $current_rewards );

			if ( in_array( $reward['type'], [ 'percent', 'fixed_cart' ], true ) ) {
				$coupon = [
					'code'          => $reward['id'],
					'amount'        => floatval( $reward['value'] ),
					'discount_type' => $reward['type'],
				];
			}
		}

		return $coupon;
	}

	public function auto_add_coupons() {
		$cart_contents_count = WC()->cart->get_cart_contents_count();
		$rewards             = $this->get_available_rewards();
		$filtered_rewards    = $this->filter_rewards_by_cart_contents_count( $rewards, $cart_contents_count );

		if ( isset( $filtered_rewards['current_rewards'] ) && count( $filtered_rewards['current_rewards'] ) ) {
			foreach ( $filtered_rewards['current_rewards'] as $key => $value ) {
				if ( WC()->cart->has_discount( $value['id'] ) ) {
					continue;
				}

				if ( in_array( $value['type'], [ 'percent', 'fixed_cart' ], true ) ) {
					WC()->cart->apply_coupon( $value['id'] );
				}
			}
		}

		if ( isset( $filtered_rewards['next_rewards'] ) && count( $filtered_rewards['next_rewards'] ) ) {
			foreach ( $filtered_rewards['next_rewards'] as $key => $value ) {
				if ( WC()->cart->has_discount( $value['id'] ) ) {
					WC()->cart->remove_coupon( $value['id'] );
				}
			}
		}
	}

	public function free_shipping_is_available( $is_available ) {
		return true;
	}

	public function package_rates( $rates, $package ) {
		$cart_contents_count = WC()->cart->get_cart_contents_count();
		$rewards             = $this->get_available_rewards();
		$filtered_rewards    = $this->filter_rewards_by_cart_contents_count( $rewards, $cart_contents_count );

		if ( isset( $filtered_rewards['current_rewards'] ) && count( $filtered_rewards['current_rewards'] ) ) {
			foreach ( $filtered_rewards['current_rewards'] as $key => $value ) {
				if ( WC()->cart->has_discount( $value['id'] ) ) {
					continue;
				}

				if ( 'free_shipping' === $value['type'] ) {
					return [
						'free_shipping:1' => new \WC_Shipping_Rate(
							'free_shipping:1',
							'free_shipping',
							0,
							[],
							'free_shipping'
						),
					];
				}
			}
		}

		return $rates;
	}

	public function get_default_rewards() {
		return [
			[
				'id'                    => 1,
				'name'                  => 'FREE SHIPPING',
				'type'                  => 'free_shipping',
				'minimum_cart_contents' => 3,
				'value'                 => 0,
				'featured'              => true,
			],
			[
				'id'                    => 2,
				'name'                  => '3%',
				'type'                  => 'percent',
				'minimum_cart_contents' => 5,
				'value'                 => 3,
				'featured'              => false,
			],
			[
				'id'                    => 3,
				'name'                  => '100 USD',
				'type'                  => 'fixed_cart',
				'minimum_cart_contents' => 10,
				'value'                 => 100,
				'featured'              => false,
			],
			[
				'id'                    => 4,
				'name'                  => 'GIFTCARD',
				'type'                  => 'giftcard',
				'minimum_cart_contents' => 15,
				'value'                 => 100,
				'featured'              => false,
			],
		];
	}

	public function get_available_rewards() {
		$rewards = get_option( 'woocommerce_growcart_rewards' );
		return $rewards ? json_decode( $rewards, true ) : $this->get_default_rewards();
	}

	public function get_rewards() {
		$cart_contents_count = WC()->cart->get_cart_contents_count();
		$rewards             = $this->get_available_rewards();

		$filtered_rewards = $this->filter_rewards_by_cart_contents_count( $rewards, $cart_contents_count );
		$hint             = '';

		if ( $rewards === $filtered_rewards['current_rewards'] ) {
			$hint = 'You\'re getting the most rewards!';
		} else {
			$hint = $this->get_next_reward_hint( $filtered_rewards['next_rewards'] );
		}

		return [
			'hint'                  => $hint,
			'featured_rewards'      => $this->get_featured_rewards(),
			'count_rewards'         => count( $rewards ),
			'count_current_rewards' => count( $filtered_rewards['current_rewards'] ),
			'cart_contents_count'   => $cart_contents_count,
			'rewards_progress'      => $this->get_rewards_progress( $rewards, $cart_contents_count ),
			'rewards'               => $filtered_rewards,
		];
	}

	public function filter_rewards_by_cart_contents_count( $rewards = [], $cart_contents_count ) {
		$filtered_rewards = [
			'current_rewards' => [],
			'next_rewards'    => [],
		];

		foreach ( $rewards as $key => $value ) {
			if ( intval( $value['minimum_cart_contents'] ) <= $cart_contents_count ) {
				$filtered_rewards['current_rewards'][] = $value;
			} else {
				$filtered_rewards['next_rewards'][] = $value;
			}
		}

		return $filtered_rewards;
	}

	public function get_next_reward_hint( $next_rewards = [] ) {
		$cart_contents_count    = WC()->cart->get_cart_contents_count();
		$next_reward            = current( $next_rewards );
		$reward_hint_string     = 'PERCENTAGE' === $next_reward['type'] ? __( 'Add %1$d more products to save %2$s' ) : __( 'Add %1$d more products to get %2$s' );
		$required_cart_contents = intval( $next_reward['minimum_cart_contents'] ) - $cart_contents_count;

		return sprintf(
			$reward_hint_string,
			$required_cart_contents,
			$next_reward['name']
		);
	}

	public function get_featured_rewards() {
		$cart_contents_count = WC()->cart->get_cart_contents_count();
		$rewards             = $this->get_available_rewards();
		$filtered_rewards    = wp_list_filter( $rewards, [ 'featured' => true ] );

		$featured_rewards = [];
		foreach ( $filtered_rewards as $key => $value ) {
			$required_cart_contents = intval( $value['minimum_cart_contents'] ) - $cart_contents_count;
			$reward_hint_string     = intval( $value['minimum_cart_contents'] ) <= $cart_contents_count ? sprintf(
				__( 'You\'ve unlocked your %s!' ),
				$value['name']
			) : sprintf(
				__( 'Add %d more products to unlock' ),
				$required_cart_contents
			);

			$featured_rewards[] = [
				'name' => $value['name'],
				'hint' => $reward_hint_string,
			];
		}

		return $featured_rewards;
	}

	public function get_rewards_progress( $rewards = [], $cart_contents_count = 0 ) {
		if ( ! $cart_contents_count ) {
			return 0;
		}

		$minimum_cart_contents_list = wp_list_pluck( $rewards, 'minimum_cart_contents' );
		$max_cart_contents_count    = max( wp_parse_id_list( $minimum_cart_contents_list ) );

		return ( $cart_contents_count / $max_cart_contents_count ) * 100;
	}
}
