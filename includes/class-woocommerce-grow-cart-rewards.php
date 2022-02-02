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

	public function get_rewards() {
		$cart_contents_count = WC()->cart->get_cart_contents_count();
		$rewards             = [
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
				'name'                        => '6%',
				'type'                        => 'PERCENTAGE',
				'minimum_cart_contents_count' => 7,
				'value'                       => 6,
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
				'name'                        => 'MYSTERY GIFTCARD',
				'type'                        => 'GIFTCARD',
				'minimum_cart_contents_count' => 20,
				'value'                       => 100,
				'featured'                    => false,
			],
		];

		$filtered_rewards = $this->filter_rewards_by_cart_contents_count( $rewards, $cart_contents_count );
		$hint             = '';

		if ( $rewards === $filtered_rewards['current_rewards'] ) {
			$hint = 'You\'re getting the most rewards!';
		} else {
			$hint = $this->get_next_reward_hint( $filtered_rewards['next_rewards'] );
		}

		return [
			'hint'                  => $hint,
			'rewards'               => $filtered_rewards,
			'count_rewards'         => count( $rewards ),
			'count_current_rewards' => count( $filtered_rewards['current_rewards'] ),
			'cart_contents_count'   => $cart_contents_count,
		];
	}

	public function filter_rewards_by_cart_contents_count( $rewards = [], $cart_contents_count ) {
		$filtered_rewards = [
			'current_rewards' => [],
			'next_rewards'    => [],
		];

		foreach ( $rewards as $key => $value ) {
			if ( $value['minimum_cart_contents_count'] <= $cart_contents_count ) {
				$filtered_rewards['current_rewards'][ $key ] = $value;
			} else {
				$filtered_rewards['next_rewards'][ $key ] = $value;
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
}
