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
	}

	public function get_default_rewards() {
		return [
			[
				'name'                        => 'FREE SHIPPING',
				'type'                        => 'FREE_SHIPPING',
				'minimum_cart_contents_count' => 3,
				'value'                       => 0,
				'featured'                    => true,
			],
			[
				'name'                        => '3%',
				'type'                        => 'PERCENTAGE',
				'minimum_cart_contents_count' => 5,
				'value'                       => 3,
				'featured'                    => false,
			],
			[
				'name'                        => '100 USD',
				'type'                        => 'FIXED',
				'minimum_cart_contents_count' => 10,
				'value'                       => 100,
				'featured'                    => false,
			],
			[
				'name'                        => 'GIFTCARD',
				'type'                        => 'GIFTCARD',
				'minimum_cart_contents_count' => 15,
				'value'                       => 100,
				'featured'                    => false,
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
			if ( intval( $value['minimum_cart_contents_count'] ) <= $cart_contents_count ) {
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
		$required_cart_contents = $next_reward['minimum_cart_contents_count'] - $cart_contents_count;

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
			$required_cart_contents = $value['minimum_cart_contents_count'] - $cart_contents_count;
			$reward_hint_string     = $value['minimum_cart_contents_count'] <= $cart_contents_count ? sprintf(
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

		$minimum_cart_contents_count_list = wp_list_pluck( $rewards, 'minimum_cart_contents' );
		$max_cart_contents_count          = max( wp_parse_id_list( $minimum_cart_contents_count_list ) );

		return ( $cart_contents_count / $max_cart_contents_count ) * 100;
	}
}
