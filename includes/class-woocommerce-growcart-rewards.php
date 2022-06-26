<?php
namespace Upnrunn;

use WP_Query;

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

/**
 * WooCommerce_GrowCart_Rewards class.
 * @var [type]
 */
class WooCommerce_GrowCart_Rewards {
	private static $gift_cart_ids = [];


	/**
	 * Undocumented function
	 *
	 * @return void
	 */
	public function get_default_rewards() {
		return [
			[
				'name'                       => 'Cart threshold incentives (by quantity)',
				'type'                       => 'minimum_cart_quantity',
				'value'                      => 0,
				'minimum_cart_quantity'      => 0,
				'minimum_cart_amount'        => 0,
				'rules'                      => [
					[
						'id'                    => '3e6f0d87-bbd1-49f4-a0c0-7f58b665c12a',
						'name'                  => 'Rule 1',
						'type'                  => 'percent',
						'value'                 => 1,
						'minimum_cart_quantity' => 9999,
						'minimum_cart_amount'   => 9999,
						'hint'                  => '**Add** {{quantity}} more to get {{name}}',
						'enabled'               => true,
					],
					[
						'id'                    => 'bfdfa1cb-4b94-4133-a4e4-f4d98fe7f545',
						'name'                  => 'Rule 2',
						'type'                  => 'percent',
						'value'                 => 1,
						'minimum_cart_quantity' => 9999,
						'minimum_cart_amount'   => 9999,
						'hint'                  => '**Add** {{quantity}} more to get {{name}}',
						'enabled'               => true,
					],
				],
				'enabled'                    => false,
				'display_suggested_products' => true,
				'display_coupon'             => true,
				'styles'                     => [
					'headerTextColor'         => '#ffffff',
					'headerBackground'        => '#343a40',
					'fontSize'                => '14px',
					'spacing'                 => [
						'top'    => '24px',
						'right'  => '24px',
						'bottom' => '24px',
						'left'   => '24px',
					],
					'textcolor'               => '#ffffff',
					'backgroundColor'         => '#343a40',
					'progressColor'           => '#198754',
					'progressBackgroundColor' => '#495057',
					'iconColor'               => '#ffffff',
					'iconBackground'          => '#495057',
					'activeIconColor'         => '#ffffff',
					'activeIconBackground'    => '#198754',
				],
				'id'                         => '4d36c7fa-93ce-4384-aa86-b6575b85f9ba',
			],
			[
				'name'                       => 'Cart threshold incentives (by amount)',
				'type'                       => 'minimum_cart_amount',
				'value'                      => 0,
				'minimum_cart_quantity'      => 0,
				'minimum_cart_amount'        => 0,
				'rules'                      => [
					[
						'id'                    => 'fc6c8709-8434-4395-96ba-73587910c4db',
						'name'                  => 'Rule 1',
						'type'                  => 'percent',
						'value'                 => 1,
						'minimum_cart_quantity' => 9999,
						'minimum_cart_amount'   => 9999,
						'hint'                  => '**Spend** {{amount}}{{currency}} more to get {{name}}',
						'enabled'               => true,
					],
					[
						'id'                    => '5e357180-9180-4c4b-b575-e5305b840a2f',
						'name'                  => 'Rule 2',
						'type'                  => 'percent',
						'value'                 => 1,
						'minimum_cart_quantity' => 9999,
						'minimum_cart_amount'   => 9999,
						'hint'                  => '**Spend** {{amount}}{{currency}} more to get {{name}}',
						'enabled'               => true,
					],
				],
				'enabled'                    => false,
				'display_suggested_products' => true,
				'display_coupon'             => true,
				'styles'                     => [
					'headerTextColor'         => '#ffffff',
					'headerBackground'        => '#343a40',
					'fontSize'                => '14px',
					'spacing'                 => [
						'top'    => '24px',
						'right'  => '24px',
						'bottom' => '24px',
						'left'   => '24px',
					],
					'textcolor'               => '#ffffff',
					'backgroundColor'         => '#343a40',
					'progressColor'           => '#198754',
					'progressBackgroundColor' => '#495057',
					'iconColor'               => '#ffffff',
					'iconBackground'          => '#495057',
					'activeIconColor'         => '#ffffff',
					'activeIconBackground'    => '#198754',
				],
				'id'                         => '466641db-218d-4ab7-8636-96e9267271a5',
			],
		];
	}

	public function __construct() {
		add_action( 'woocommerce_before_calculate_totals', [ $this, 'gift_checkout_process' ] );
		add_filter( 'woocommerce_cart_item_quantity', [ $this, 'change_gift_qty_input_in_cart' ], 10, 2 );
		add_filter( 'woocommerce_cart_item_name', [ $this, 'add_gift_label_in_cart' ], 10, 3 );
		add_filter( 'woocommerce_get_shop_coupon_data', [ $this, 'filter_shop_coupon_data' ], 10, 2 );
		add_filter( 'woocommerce_package_rates', [ $this, 'filter_package_rates' ], 10, 2 );
		add_action( 'growcart_before_cart_information', [ $this, 'auto_add_coupons' ] );
		add_action( 'woocommerce_before_cart_totals', [ $this, 'conditionally_hide_rewards' ] );
		add_action( 'woocommerce_review_order_before_cart_contents', [ $this, 'conditionally_hide_rewards' ] );
	}

	/**
	 * Undocumented function
	 *
	 * @param [type] $cart
	 * @return void
	 */
	public function gift_checkout_process( $cart ) {
		if ( $cart->is_empty() ) {
			return;
		}

		// If the action is fired only the first time.
		if ( did_action( 'woocommerce_before_calculate_totals' ) >= 2 ) {
			return;
		}

		$gift_id = $this->has_valid_gift();
		if ( ! $gift_id ) {
			return;
		}

		// Generate unique ID for the gift in cart.
		$gift_cart_id          = $cart->generate_cart_id( $gift_id );
		self::$gift_cart_ids[] = $gift_cart_id;
		$gift_cart_item        = $cart->get_cart_item( $gift_cart_id );

		// Check if gift is already in cart.
		if ( empty( $cart->find_product_in_cart( $gift_cart_id ) ) ) {
			// Add gift to cart.
			$cart->add_to_cart( $gift_id, 1 );
		} else {
			// Set gift's quantity to its initial value (from settings).
			$cart->set_quantity( $gift_cart_id, 1 );
		}

		if ( ! empty( $gift_cart_item ) ) {
			// Set gift's price.
			$gift_cart_item['data']->set_price( 0 );
		}
	}

	/**
	 * Undocumented function
	 *
	 * @param [type] $product_quantity
	 * @param [type] $cart_item_key
	 * @return void
	 */
	public function change_gift_qty_input_in_cart( $product_quantity, $cart_item_key ) {
		// If there aren't valid gifts return initial quantity.
		if ( empty( self::$gift_cart_ids ) ) {
			return $product_quantity;
		}

		// If current product is a gift.
		if ( in_array( $cart_item_key, self::$gift_cart_ids ) ) {
			$product_quantity = sprintf( '%s <input type="hidden" name="cart[%s][qty]" value="%s" />', 1, $cart_item_key, 1 );
		}

		return $product_quantity;
	}

	/**
	 * Add 'Gift' label for product name in cart.
	 */
	public static function add_gift_label_in_cart( $product_name, $cart_item, $cart_item_key ) {
		// If there aren't valid gifts return initial name.
		if ( empty( self::$gift_cart_ids ) ) {
			return $product_name;
		}

		$product_name_postfix = '';

		// If current product is a gift.
		if ( in_array( $cart_item_key, self::$gift_cart_ids ) ) {
			$product_name_postfix = '<span class="growcart-free-gift-label">' . apply_filters(
				'growcart_free_gift_product_name_postfix',
				sprintf( ' - %s', esc_html__( 'Free Gift', 'woocommerce-grow-cart' ) )
			) . '</span>';
		}

		return $product_name . $product_name_postfix;
	}

	/**
	 * Filter shop coupon data.
	 *
	 * @param [type] $coupon
	 * @param [type] $code
	 * @return void
	 */
	public function filter_shop_coupon_data( $coupon, $code ) {
		if ( is_admin() && ! wp_doing_ajax() ) {
			return $coupon;
		}

		$active_reward = $this->get_active_reward();
		if ( ! $active_reward ) {
			return $coupon;
		}

		$active_rules = $this->get_active_rules( $active_reward );
		if ( empty( $active_rules ) ) {
			return $coupon;
		}

		if ( 'minimum_cart_quantity' === $active_reward['type'] ) {
			$cart_contents_count = WC()->cart->get_cart_contents_count();
			$filtered_rewards    = $this->filter_rewards_by_cart_contents_count( $active_rules, $cart_contents_count );
		} else {
			$cart_subtotal    = WC()->cart->subtotal;
			$filtered_rewards = $this->filter_rewards_by_cart_subtotal( $active_rules, $cart_subtotal );
		}

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

	/**
	 * Automatically add coupons.
	 *
	 * @return void
	 */
	public function auto_add_coupons() {
		$coupon_codes = [];
		$coupon_posts = get_posts(
			array(
				'posts_per_page' => -1,
				'post_type'      => 'shop_coupon',
				'post_status'    => 'publish',
			)
		);

		foreach ( $coupon_posts as $coupon_post ) {
			$coupon_codes[] = $coupon_post->post_name;
		}

		$cart_coupons = get_cart_coupons();
		foreach ( $cart_coupons as $coupon ) {
			if ( ! in_array( $coupon, $coupon_codes, true ) && WC()->cart->has_discount( $coupon['code'] ) ) {
				WC()->cart->remove_coupon( $coupon['code'] );
			}
		}

		$filtered_rewards = $this->get_filtered_rules();

		if ( isset( $filtered_rewards['current_rewards'] ) && count( $filtered_rewards['current_rewards'] ) ) {
			$rewards_by_type = [
				'percent'    => [],
				'fixed_cart' => [],
			];

			foreach ( $filtered_rewards['current_rewards'] as $key => $value ) {
				$rewards_by_type[ $value['type'] ][] = $value['value'];
			}

			foreach ( $filtered_rewards['current_rewards'] as $key => $value ) {
				$coupon_code = $value['id'];

				if ( WC()->cart->has_discount( $coupon_code ) ) {
					continue;
				}

				if ( in_array( $value['type'], [ 'percent', 'fixed_cart' ], true ) ) {
					if ( max( $rewards_by_type[ $value['type'] ] ) === $value['value'] ) {
						$applied_coupons   = WC()->cart->get_applied_coupons();
						$applied_coupons[] = $coupon_code;

						WC()->cart->set_applied_coupons( $applied_coupons );

						do_action( 'woocommerce_applied_coupon', $coupon_code );
					} else {
						WC()->cart->remove_coupon( $coupon_code );
					}
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

	/**
	 * Conditionally hide rewards.
	 *
	 * @return void
	 */
	public function conditionally_hide_rewards() {
		$filtered_rewards = $this->get_filtered_rules();

		if ( isset( $filtered_rewards['current_rewards'] ) && count( $filtered_rewards['current_rewards'] ) ) {
			$coupons         = wp_list_pluck( $filtered_rewards['current_rewards'], 'id' );
			$applied_coupons = WC()->cart->get_applied_coupons();
			WC()->cart->set_applied_coupons( array_diff( $applied_coupons, $coupons ) );
		}
	}

	/**
	 * Filter package rates.
	 *
	 * @param [type] $rates
	 * @param [type] $package
	 * @return void
	 */
	public function filter_package_rates( $rates, $package ) {
		$filtered_rewards = $this->get_filtered_rules();

		if ( isset( $filtered_rewards['current_rewards'] ) && count( $filtered_rewards['current_rewards'] ) ) {
			foreach ( $filtered_rewards['current_rewards'] as $key => $value ) {
				if ( WC()->cart->has_discount( $value['id'] ) ) {
					continue;
				}

				if ( 'free_shipping' === $value['type'] ) {
					return [
						'free_shipping:1' => new \WC_Shipping_Rate(
							'free_shipping:1',
							'Free!',
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

	/**
	 * Get available rewards.
	 *
	 * @return void
	 */
	public function get_available_rewards() {
		$rewards = get_option( 'woocommerce_growcart_rewards', $this->get_default_rewards() );
		return json_decode( $rewards, true );
	}

	/**
	 * Undocumented function
	 *
	 * @return void
	 */
	public function get_filtered_rewards() {
		$filtered_rewards = [
			'type'                       => 'minimum_cart_quantity',
			'display_suggested_products' => true,
			'display_coupon'             => true,
			'rewards'                    => [],
			'current_rewards'            => [],
			'next_rewards'               => [],
		];

		$active_reward = $this->get_active_reward();
		if ( ! $active_reward ) {
			return $filtered_rewards;
		}

		$active_rules = $this->get_active_rules( $active_reward );
		if ( empty( $active_rules ) ) {
			return $filtered_rewards;
		}

		if ( 'minimum_cart_quantity' === $active_reward['type'] ) {
			$cart_contents_count = WC()->cart->get_cart_contents_count();
			$filtered_rewards    = $this->filter_rewards_by_cart_contents_count( $active_rules, $cart_contents_count );
		} else {
			$cart_subtotal    = WC()->cart->subtotal;
			$filtered_rewards = $this->filter_rewards_by_cart_subtotal( $active_rules, $cart_subtotal );
		}

		$filtered_rewards['type']                       = $active_reward['type'];
		$filtered_rewards['display_suggested_products'] = $active_reward['display_suggested_products'];
		$filtered_rewards['display_coupon']             = $active_reward['display_coupon'];

		return $filtered_rewards;
	}

	/**
	 * Get rewards.
	 *
	 * @return void
	 */
	public function get_rewards() {
		$hint             = '';
		$filtered_rewards = $this->get_filtered_rewards();
		$most_rewards     = array_values( $filtered_rewards['rewards'] ) === $filtered_rewards['current_rewards'];

		if ( $most_rewards ) {
			$hint = 'You\'re getting the most rewards!';
		} else {
			$hint = $this->get_next_reward_hint( $filtered_rewards['next_rewards'], $filtered_rewards['type'] );
		}

		return [
			'hint'                  => $hint,
			'featured_rewards'      => $this->get_featured_rewards(),
			'count_rewards'         => count( $filtered_rewards ),
			'count_current_rewards' => count( $filtered_rewards['current_rewards'] ),
			'cart_contents_count'   => WC()->cart->get_cart_contents_count(),
			'rewards_progress'      => $most_rewards ? 100 : $this->get_rewards_progress( $filtered_rewards['rewards'], $filtered_rewards['type'] ),
			'rewards'               => $filtered_rewards,
		];
	}

	/**
	 * Filter rewards by cart contents count.
	 *
	 * @param array $rewards
	 * @param [type] $cart_contents_count
	 * @return void
	 */
	public function filter_rewards_by_cart_contents_count( $rewards = [], $cart_contents_count = 0 ) {
		$filtered_rewards = [
			'rewards'         => [],
			'current_rewards' => [],
			'next_rewards'    => [],
		];

		if ( empty( $rewards ) ) {
			return $filtered_rewards;
		}

		uasort( $rewards, [ $this, 'sort_by_minimum_cart_quantity' ] );

		$rewards = array_values( $rewards );

		$filtered_rewards['rewards'] = $rewards;

		foreach ( $rewards as $key => $value ) {
			if ( intval( $value['minimum_cart_quantity'] ) <= $cart_contents_count ) {
				$filtered_rewards['current_rewards'][] = $value;
			} else {
				$filtered_rewards['next_rewards'][] = $value;
			}
		}

		return $filtered_rewards;
	}

	/**
	 * Undocumented function
	 *
	 * @param array $rewards
	 * @param [type] $cart_subtotal
	 * @return void
	 */
	public function filter_rewards_by_cart_subtotal( $rewards = [], $cart_subtotal = 0 ) {
		$filtered_rewards = [
			'rewards'         => [],
			'current_rewards' => [],
			'next_rewards'    => [],
		];

		if ( empty( $rewards ) ) {
			return $filtered_rewards;
		}

		uasort( $rewards, [ $this, 'sort_by_minimum_cart_amount' ] );

		$rewards                     = array_values( $rewards );
		$filtered_rewards['rewards'] = $rewards;

		foreach ( $rewards as $key => $value ) {
			if ( intval( $value['minimum_cart_amount'] ) <= $cart_subtotal ) {
				$filtered_rewards['current_rewards'][] = $value;
			} else {
				$filtered_rewards['next_rewards'][] = $value;
			}
		}

		return $filtered_rewards;
	}

	/**
	 * Get next reward hint.
	 *
	 * @param array $next_rewards
	 * @return void
	 */
	public function get_next_reward_hint( $next_rewards = [], $type = 'minimum_cart_quantity' ) {
		$reward_hint_string = '';
		$next_reward        = current( $next_rewards );
		$currency_symbol    = get_woocommerce_currency_symbol();

		if ( 'minimum_cart_quantity' === $type ) {
			$reward_hint_string     = '' === $next_reward['hint'] ? __( '**Add** {{quantity}} more products to get {{name}}', 'woocommerce-grow-cart' ) : $next_reward['hint'];
			$cart_contents_count    = WC()->cart->get_cart_contents_count();
			$required_cart_quantity = intval( $next_reward['minimum_cart_quantity'] ) - $cart_contents_count;
		} else {
			$reward_hint_string   = '' === $next_reward['hint'] ? __( '**Spend** {{amount}} more to get {{name}}', 'woocommerce-grow-cart' ) : $next_reward['hint'];
			$cart_subtotal        = WC()->cart->subtotal;
			$required_cart_amount = intval( $next_reward['minimum_cart_amount'] ) - $cart_subtotal;
		}

		$allowed_tags   = 'minimum_cart_quantity' === $type ? [ '{{quantity}}', '{{name}}', '{{currency}}' ] : [ '{{amount}}', '{{name}}', '{{currency}}' ];
		$allowed_values = 'minimum_cart_quantity' === $type ? [ $required_cart_quantity, $next_reward['name'], $currency_symbol ] : [ $required_cart_amount, $next_reward['name'], $currency_symbol ];

		$reward_hint_string = str_replace( $allowed_tags, $allowed_values, $reward_hint_string );
		$reward_hint_string = preg_replace( '#\*{2}(.*?)\*{2}#', '<b>$1</b>', $reward_hint_string );

		return wp_kses(
			$reward_hint_string,
			[
				'b'      => [],
				'strong' => [],
			]
		);
	}

	/**
	 * Get featured rewards.
	 *
	 * @return void
	 */
	public function get_featured_rewards() {
		$cart_contents_count = WC()->cart->get_cart_contents_count();
		$rewards             = $this->get_available_rewards();
		$filtered_rewards    = wp_list_filter( $rewards, [ 'featured' => true ] );

		$featured_rewards = [];
		foreach ( $filtered_rewards as $key => $value ) {
			$required_cart_contents = intval( $value['minimum_cart_quantity'] ) - $cart_contents_count;
			$reward_hint_string     = intval( $value['minimum_cart_quantity'] ) <= $cart_contents_count ? sprintf(
				__( 'You\'ve unlocked your %s!', 'woocommerce-grow-cart' ),
				$value['name']
			) : sprintf(
				__( 'Add %d more products to unlock', 'woocommerce-grow-cart' ),
				$required_cart_contents
			);

			$featured_rewards[] = [
				'name' => $value['name'],
				'hint' => $reward_hint_string,
			];
		}

		return $featured_rewards;
	}

	/**
	 * Get rewards progress.
	 *
	 * @param array $rewards
	 * @return void
	 */
	public function get_rewards_progress( $rewards = [], $rewards_rule = 'minimum_cart_quantity' ) {
		$items = wp_list_pluck( $rewards, $rewards_rule );
		$max   = max( wp_parse_id_list( $items ) );

		if ( 'minimum_cart_quantity' === $rewards_rule ) {
			$current = WC()->cart->get_cart_contents_count();
		} else {
			$current = WC()->cart->subtotal;
		}

		if ( ! $current || ! $max ) {
			return 0;
		}

		return ( $current / $max ) * 100;
	}

	/**
	 * Get reward string.
	 *
	 * @param array $current_rewards
	 * @return void
	 */
	public function get_reward_string( $current_rewards = [] ) {
		$cart_subtotal  = WC()->cart->subtotal;
		$reward_total   = 0;
		$reward_strings = [];

		$rewards_by_type = [
			'percent'    => [],
			'fixed_cart' => [],
		];

		foreach ( $current_rewards as $key => $value ) {
			$rewards_by_type[ $value['type'] ][] = $value['value'];
		}

		foreach ( $current_rewards as $key => $value ) {
			if ( 'free_shipping' === $value['type'] ) {
				$reward_strings[] = '<span class="CartTotals__free-shipping">' . get_icon( 'truck' ) . '<span> ' . __( 'Free Shipping', 'woocommerce-grow-cart' ) . '</span>' . '</span>';
			} elseif ( max( $rewards_by_type[ $value['type'] ] ) === $value['value'] ) {
				switch ( $value['type'] ) {
					case 'percent':
						$reward_total += ( $cart_subtotal * $value['value'] ) / 100;
						break;
					case 'fixed_cart':
						$reward_total += $value['value'];
						break;
					default:
						break;
				}
			}
		}

		if ( $reward_total ) {
			$reward_strings[] = sprintf( __( '<span>You are saving %s</span>', 'woocommerce-grow-cart' ), wc_price( $reward_total ) );
		}

		if ( empty( $reward_strings ) ) {
			return '';
		}

		return implode( '<span> + </span>', $reward_strings );
	}

	/**
	 * Get suggested products.
	 *
	 * @return void
	 */
	public function get_suggested_products() {
		global $post;

		$suggested_products = [];
		$max_items          = 5;
		$cart               = WC()->cart->get_cart();
		$cart_is_empty      = WC()->cart->is_empty();
		$exclude_ids        = wp_list_pluck( $cart, 'product_id' );

		if ( count( WC()->cart->removed_cart_contents ) ) {
			$title = __( 'Frequently bought together', 'woocommerce-grow-cart' );

			foreach ( WC()->cart->removed_cart_contents as $key => $cart_item ) {
				$product_id = $cart_item['variation_id'] ? $cart_item['variation_id'] : $cart_item['product_id'];

				if ( ! in_array( $product_id, $exclude_ids, true ) ) {
					$suggested_products[] = $product_id;
				}
			}
		} elseif ( $cart_is_empty ) {
			$title = __( 'Popular products', 'woocommerce-grow-cart' );

			$args = array(
				'post_type'           => 'product',
				'post_status'         => 'publish',
				'ignore_sticky_posts' => true,
				'meta_key'            => 'total_sales',
				'order'               => 'DESC',
				'orderby'             => 'meta_value_num',
				'fields'              => 'ids',
			);

			$query = new WP_Query( $args );

			$suggested_products = array_merge( $suggested_products, wp_parse_id_list( $query->posts ) );
		} else {
			$title = __( 'Products you may like', 'woocommerce-grow-cart' );

			foreach ( $cart as $cart_item ) {
				if ( count( $suggested_products ) >= $max_items ) {
					continue;
				}

				$product_id         = $cart_item['variation_id'] ? $cart_item['variation_id'] : $cart_item['product_id'];
				$related_products   = wc_get_related_products( $product_id, $max_items, $exclude_ids );
				$suggested_products = array_merge( $suggested_products, wp_parse_id_list( $related_products ) );
				$suggested_products = array_unique( $suggested_products );
			}
		}

		$products = [];

		foreach ( $suggested_products as $product_id ) {
			$_product = wc_get_product( $product_id );
			if ( ( count( $products ) >= $max_items ) || ! ( 'simple' === $_product->get_type() ) ) {
				continue;
			}

			$products[] = [
				'product_id'                => $product_id,
				'product_title'             => $_product->get_title(),
				'product_short_description' => $_product->get_short_description(),
				'product_permalink'         => $_product->is_visible() ? $_product->get_permalink( $cart_item ) : '',
				'product_thumbnail'         => $_product->get_image(),
				'product_price'             => WC()->cart->get_product_price( $_product ),
			];
		}

		return [
			'title'    => $title,
			'products' => $products,
		];
	}

	/**
	 * Undocumented function
	 *
	 * @param [type] $a
	 * @param [type] $b
	 * @return void
	 */
	protected function sort_by_minimum_cart_quantity( $a, $b ) {
		if ( floatval( $a['minimum_cart_quantity'] ) === floatval( $b['minimum_cart_quantity'] ) ) {
			return 0;
		}

		return ( floatval( $a['minimum_cart_quantity'] ) < floatval( $b['minimum_cart_quantity'] ) ) ? -1 : 1;
	}

	/**
	 * Undocumented function
	 *
	 * @param [type] $a
	 * @param [type] $b
	 * @return void
	 */
	protected function sort_by_minimum_cart_amount( $a, $b ) {
		if ( floatval( $a['minimum_cart_amount'] ) === floatval( $b['minimum_cart_amount'] ) ) {
			return 0;
		}

		return ( floatval( $a['minimum_cart_amount'] ) < floatval( $b['minimum_cart_amount'] ) ) ? -1 : 1;
	}

	/**
	 * Undocumented function
	 *
	 * @return void
	 */
	public function get_filtered_rules() {
		$filtered_rules = [];

		$active_reward = $this->get_active_reward();
		if ( ! $active_reward ) {
			return $filtered_rules;
		}

		$active_rules = $this->get_active_rules( $active_reward );
		if ( empty( $active_rules ) ) {
			return $filtered_rules;
		}

		if ( 'minimum_cart_quantity' === $active_reward['type'] ) {
			$cart_contents_count = WC()->cart->get_cart_contents_count();
			$filtered_rules      = $this->filter_rewards_by_cart_contents_count( $active_rules, $cart_contents_count );
		} else {
			$cart_subtotal  = WC()->cart->subtotal;
			$filtered_rules = $this->filter_rewards_by_cart_subtotal( $active_rules, $cart_subtotal );
		}

		return $filtered_rules;
	}

	/**
	 * Undocumented function
	 *
	 * @return void
	 */
	public function get_active_reward() {
		$available_rewards = $this->get_available_rewards();
		if ( empty( $available_rewards ) ) {
			return null;
		}

		$active_reward_id = isset( $_GET['active_reward_id'] ) ? sanitize_text_field( $_GET['active_reward_id'] ) : '';
		$filters          = '' === $active_reward_id ? [ 'enabled' => true ] : [ 'id' => $active_reward_id ];

		$available_rewards_enabled = wp_list_filter( $available_rewards, $filters );
		if ( empty( $available_rewards_enabled ) ) {
			return null;
		}

		$rewards = array_values( $available_rewards_enabled );

		return $rewards[0];
	}

	/**
	 * Undocumented function
	 *
	 * @param array $rules
	 * @return void
	 */
	public function get_active_rules( $active_reward ) {
		if ( empty( $active_reward['rules'] ) ) {
			return [];
		}

		$_active_rules = wp_list_filter( $active_reward['rules'], [ 'enabled' => 1 ] );
		if ( empty( $_active_rules ) ) {
			return [];
		}

		$currency_symbol = get_woocommerce_currency_symbol();

		$active_rules = [];
		foreach ( $_active_rules as $active_rule ) {
			$allowed_tags        = 'percent' === $active_rule['type'] ? [ '{{value}}' ] : [ '{{value}}', '{{currency}}' ];
			$allowed_values      = 'percent' === $active_rule['type'] ? [ $active_rule['value'] ] : [ $active_rule['value'], $currency_symbol ];
			$active_rule['name'] = wp_kses(
				str_replace( $allowed_tags, $allowed_values, $active_rule['name'] ),
				[
					'b'      => [],
					'strong' => [],
				]
			);

			$active_rules[] = $active_rule;
		}

		return $active_rules;
	}

	/**
	 * Undocumented function
	 *
	 * @return boolean
	 */
	public function has_valid_gift() {
		$filtered_rewards = $this->get_filtered_rules();

		if ( isset( $filtered_rewards['current_rewards'] ) && count( $filtered_rewards['current_rewards'] ) ) {
			foreach ( $filtered_rewards['current_rewards'] as $key => $value ) {
				if ( 'gift' === $value['type'] ) {
					return $value['productId'];
				}
			}
		}

		return false;
	}
}
