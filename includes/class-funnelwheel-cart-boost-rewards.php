<?php
namespace Upnrunn;

use WP_Query;

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

/**
 * FunnelWheel_Cart_Boost_Rewards class.
 * @var [type]
 */
class FunnelWheel_Cart_Boost_Rewards {
	/**
	 * Store list of gift card IDs.
	 *
	 * @var array
	 */
	private static $gift_cart_ids = [];


	/**
	 * Get a list of available rewards when activating the plugin for the first time.
	 *
	 * @return void
	 */
	public function get_default_rewards() {
		return get_default_rewards();
	}

	/**
	 * Constructor.
	 */
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
	 * Conditionally set gift cart items' price to zero or remove expired gift cart items from the cart.
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

		$gift_id          = false;
		$filtered_rewards = $this->get_filtered_rules();

		if ( isset( $filtered_rewards['current_rewards'] ) && count( $filtered_rewards['current_rewards'] ) ) {
			foreach ( $filtered_rewards['current_rewards'] as $key => $value ) {
				if ( 'gift' === $value['type'] ) {
					$gift_id = intval( $value['productId'] );
				}
			}
		}

		if ( ! $gift_id ) {
			if ( isset( $filtered_rewards['next_rewards'] ) && count( $filtered_rewards['next_rewards'] ) ) {
				foreach ( $filtered_rewards['next_rewards'] as $key => $value ) {
					if ( 'gift' === $value['type'] ) {
						$gift_cart_id = $cart->generate_cart_id( intval( $value['productId'] ) );
						WC()->cart->remove_cart_item( $gift_cart_id );
					}
				}
			}

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
	 * Conditionally disable gift cart item quantify input on the cart page.
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
	 * Add a gift label to the product name in the cart.
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
				sprintf( ' - %s', esc_html__( 'Free Gift', 'funnelwheel-cart-boost' ) )
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
	 * Find an active reward and return a list of available reward rules.
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
	 * Get current rewards, unlocked rewards, progress, hint, and other information required by the frontend popup.
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
			$minimum_cart_quantity = intval( $value['minimum_cart_quantity'] );
			if ( 'gift' === $value['type'] ) {
				$gift_cart_id = WC()->cart->generate_cart_id( intval( $value['productId'] ) );
				if ( ! empty( WC()->cart->find_product_in_cart( $gift_cart_id ) ) ) {
					$minimum_cart_quantity += 1;
				}
			}

			if ( $minimum_cart_quantity <= $cart_contents_count ) {
				$filtered_rewards['current_rewards'][] = $value;
			} else {
				$filtered_rewards['next_rewards'][] = $value;
			}
		}

		return $filtered_rewards;
	}

	/**
	 * Filter available rewards by cart subtotal.
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
			$reward_hint_string     = '' === $next_reward['hint'] ? __( '**Add** {{quantity}} more products to get {{name}}', 'funnelwheel-cart-boost' ) : $next_reward['hint'];
			$cart_contents_count    = WC()->cart->get_cart_contents_count();
			$required_cart_quantity = intval( $next_reward['minimum_cart_quantity'] ) - $cart_contents_count;
		} else {
			$reward_hint_string   = '' === $next_reward['hint'] ? __( '**Spend** {{amount}} more to get {{name}}', 'funnelwheel-cart-boost' ) : $next_reward['hint'];
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

		foreach ( $filtered_rewards as $key => $reward ) {
			$minimum_quantity   = intval( $reward['minimum_cart_quantity'] );
			$required_to_unlock = $minimum_quantity - $cart_contents_count;

			if ( $minimum_quantity <= $cart_contents_count ) {
				$hint = sprintf(
					// translators: %s: Reward name.
					__( "You've unlocked your %s!", 'funnelwheel-cart-boost' ),
					$reward['name']
				);
			} else {
				$hint = sprintf(
					// translators: %d: Number of products remaining to unlock the reward.
					__( 'Add %d more products to unlock', 'funnelwheel-cart-boost' ),
					$required_to_unlock
				);
			}

			$featured_rewards[] = [
				'name' => $reward['name'],
				'hint' => $hint,
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
	 * Get a string that shows how much you are saving from rewards.
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
				$reward_strings[] = '<span class="CartTotals__free-shipping">' . get_icon( 'truck' ) . '<span> ' . __( 'Free Shipping', 'funnelwheel-cart-boost' ) . '</span>' . '</span>';
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
			$reward_amount = wc_price( $reward_total );

			// translators: %s: Amount of savings (e.g. "$5.00").
			$reward_text = sprintf( __( 'You are saving %s', 'funnelwheel-cart-boost' ), $reward_amount );

			$reward_strings[] = '<span>' . esc_html( $reward_text ) . '</span>';
		}


		if ( empty( $reward_strings ) ) {
			return '';
		}

		return implode( '<span> + </span>', $reward_strings );
	}

	/**
	 * Get suggested products.
	 *
	 * @return array Suggested products data with title and product details.
	 */
	public function get_suggested_products() {
	    $max_items       = 5;
	    $cart            = WC()->cart->get_cart();
	    $cart_is_empty   = WC()->cart->is_empty();
	    $exclude_ids     = wp_list_pluck( $cart, 'product_id' );
	    $suggested_ids   = [];
	    $title           = '';

	    // Check removed cart contents for 'Frequently bought together'
	    if ( ! empty( WC()->cart->removed_cart_contents ) ) {
	        $title = __( 'Frequently bought together', 'funnelwheel-cart-boost' );

	        foreach ( WC()->cart->removed_cart_contents as $cart_item ) {
	            $product_id = $cart_item['variation_id'] ? $cart_item['variation_id'] : $cart_item['product_id'];

	            if ( ! in_array( $product_id, $exclude_ids, true ) ) {
	                $suggested_ids[] = $product_id;
	            }
	        }
	    }
	    // If cart empty, suggest popular products sorted by total sales
	    elseif ( $cart_is_empty ) {
	        $title = __( 'Popular products', 'funnelwheel-cart-boost' );

	        $args = [
	            'post_type'           => 'product',
	            'post_status'         => 'publish',
	            'ignore_sticky_posts' => true,
	            // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_key
	            'meta_key'            => 'total_sales',
	            'orderby'             => 'meta_value_num',
	            'order'               => 'DESC',
	            'fields'              => 'ids',
	            'posts_per_page'      => $max_items,
	        ];

	        $query = new WP_Query( $args );
	        $suggested_ids = array_merge( $suggested_ids, wp_parse_id_list( $query->posts ) );
	    }
	    // Otherwise, suggest related products for items in cart
	    else {
	        $title = __( 'Products you may like', 'funnelwheel-cart-boost' );

	        foreach ( $cart as $cart_item ) {
	            if ( count( $suggested_ids ) >= $max_items ) {
	                break;
	            }

	            $product_id       = $cart_item['variation_id'] ? $cart_item['variation_id'] : $cart_item['product_id'];
	            $related_products = wc_get_related_products( $product_id, $max_items, $exclude_ids );

	            $suggested_ids = array_merge( $suggested_ids, wp_parse_id_list( $related_products ) );
	            $suggested_ids = array_unique( $suggested_ids );
	        }
	    }

	    $products = [];
	    foreach ( $suggested_ids as $product_id ) {
	        if ( count( $products ) >= $max_items ) {
	            break;
	        }

	        $_product = wc_get_product( $product_id );
	        if ( ! $_product || 'simple' !== $_product->get_type() ) {
	            continue;
	        }

	        $products[] = [
	            'product_id'                => $product_id,
	            'product_title'             => $_product->get_title(),
	            'product_short_description' => $_product->get_short_description(),
	            'product_permalink'         => $_product->is_visible() ? $_product->get_permalink() : '',
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
	 * Sort rewards by minimum cart quantity.
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
	 * Sort rewards by minimum cart amount.
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
	 * Filter and get active reward rules.
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
	 * Get active reward.
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
	 * Get active reward rules.
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
					return intval( $value['productId'] );
				}
			}
		}

		return false;
	}
}
