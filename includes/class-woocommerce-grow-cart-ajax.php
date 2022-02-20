<?php
namespace Upnrunn;

use WP_Query;

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

/**
 * WooCommerce_Grow_Cart_Ajax class.
 * @var [type]
 */
class WooCommerce_Grow_Cart_Ajax {
	public function __construct() {
		add_action( 'wp_ajax_growcart_get_cart_information', [ $this, 'get_cart_information' ] );
		add_action( 'wp_ajax_nopriv_growcart_get_cart_information', [ $this, 'get_cart_information' ] );
		add_action( 'wp_ajax_growcart_update_cart_item', [ $this, 'update_cart_item' ] );
		add_action( 'wp_ajax_nopriv_growcart_update_cart_item', [ $this, 'update_cart_item' ] );
		add_action( 'wp_ajax_growcart_get_suggested_products', [ $this, 'get_suggested_products' ] );
		add_action( 'wp_ajax_nopriv_growcart_get_suggested_products', [ $this, 'get_suggested_products' ] );
		add_action( 'wp_ajax_growcart_get_rewards', [ $this, 'get_rewards' ] );
		add_action( 'wp_ajax_nopriv_growcart_get_rewards', [ $this, 'get_rewards' ] );
		add_action( 'wp_ajax_growcart_get_admin_rewards', [ $this, 'get_admin_rewards' ] );
		add_action( 'wp_ajax_growcart_update_admin_rewards', [ $this, 'update_admin_rewards' ] );
		add_action( 'wp_ajax_growcart_add_to_cart', [ $this, 'add_to_cart' ] );
		add_action( 'wp_ajax_nopriv_growcart_add_to_cart', [ $this, 'add_to_cart' ] );
	}

	public function get_cart_information() {
		do_action( 'growcart_before_cart_information' );

		WC()->cart->calculate_totals();

		if ( ! function_exists( 'wc_cart_totals_order_total_html' ) ) {
			include_once WC_ABSPATH . 'includes/wc-cart-functions.php';
		}

		ob_start();
		wc_cart_totals_order_total_html();
		$cart_totals_order_total_html = \ob_get_clean();

		$cart_contents_count  = WC()->cart->get_cart_contents_count();
		$rewards              = woocommerce_grow_cart()->rewards->get_available_rewards();
		$filtered_rewards     = woocommerce_grow_cart()->rewards->filter_rewards_by_cart_contents_count( $rewards, $cart_contents_count );
		$current_reward_ids   = [];
		$current_reward_names = [];

		if ( isset( $filtered_rewards['current_rewards'] ) && count( $filtered_rewards['current_rewards'] ) ) {
			$current_reward_ids   = wp_list_pluck( $filtered_rewards['current_rewards'], 'id' );
			$current_reward_names = wp_list_pluck( $filtered_rewards['current_rewards'], 'name' );
		}

		$coupons = [];

		$_coupons = get_cart_coupons();
		foreach ( $_coupons as $key => $value ) {
			if ( in_array( $value['code'], $current_reward_ids, true ) ) {
				continue;
			}

			$coupons[] = $value;
		}

		wp_send_json(
			[
				'current_reward_ids'  => $current_reward_ids,
				'is_empty'            => WC()->cart->is_empty(),
				'items'               => get_cart_items(),
				'cart_title'          => sprintf( __( 'Your Cart (%d)' ), WC()->cart->get_cart_contents_count() ),
				'tax_enabled'         => wc_tax_enabled(),
				'has_shipping'        => WC()->cart->needs_shipping() && WC()->cart->show_shipping(),
				'has_discount'        => WC()->cart->has_discount(),
				'cart_subtotal'       => WC()->cart->get_cart_subtotal(),
				'cart_tax'            => WC()->cart->get_cart_tax(),
				'cart_shipping_total' => WC()->cart->get_cart_shipping_total(),
				'cart_discount_total' => WC()->cart->get_cart_discount_total(),
				'coupons'             => $coupons,
				'$_coupons'           => $_coupons,
				'rewards'             => count( $current_reward_names ) ? implode( ' + ', $current_reward_names ) : false,
				'total'               => $cart_totals_order_total_html,
				'shop_url'            => wc_get_page_permalink( 'shop' ),
				'checkout_url'        => esc_url( wc_get_checkout_url() ),
				'cart_contents_count' => WC()->cart->get_cart_contents_count(),
			]
		);
	}

	public function update_cart_item() {
		$cart_key = sanitize_text_field( $_POST['cart_key'] );
		$quantity = (int) $_POST['quantity'];

		if ( ! is_numeric( $quantity ) || $quantity < 0 || ! $cart_key ) {
			wp_send_json( [ 'error' => __( 'Something went wrong' ) ] );
		}

		$cart_success = 0 === $quantity ? WC()->cart->remove_cart_item( $cart_key ) : WC()->cart->set_quantity( $cart_key, $quantity );
		$response     = [
			'success'               => $cart_success,
			'removed_cart_contents' => WC()->cart->removed_cart_contents,
		];

		wp_send_json( $response );
	}

	public function get_suggested_products() {
		global $post;

		$suggested_products = [];
		$max_items          = 5;
		$cart               = WC()->cart->get_cart();
		$cart_is_empty      = WC()->cart->is_empty();
		$exclude_ids        = wp_list_pluck( $cart, 'product_id' );

		if ( count( WC()->cart->removed_cart_contents ) ) {
			$title = __( 'Frequently bought together' );

			foreach ( WC()->cart->removed_cart_contents as $key => $cart_item ) {
				$product_id = $cart_item['variation_id'] ? $cart_item['variation_id'] : $cart_item['product_id'];

				if ( ! in_array( $product_id, $exclude_ids, true ) ) {
					$suggested_products[] = $product_id;
				}
			}
		} elseif ( $cart_is_empty ) {
			$title = __( 'Popular products' );

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
			$title = __( 'Products you may like' );

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

		wp_send_json(
			[
				'title'                             => $title,
				'products'                          => $products,
				'WC()->cart->removed_cart_contents' => WC()->cart->removed_cart_contents,
			]
		);
	}

	public function get_rewards() {
		wp_send_json( woocommerce_grow_cart()->rewards->get_rewards() );
	}

	public function get_admin_rewards() {
		wp_send_json( woocommerce_grow_cart()->rewards->get_available_rewards() );
	}

	public function update_admin_rewards() {
		check_ajax_referer( 'update-rewards', 'security' );

		if ( isset( $_POST['rewards'] ) ) {
			$rewards = sanitize_text_field( $_POST['rewards'] );
			update_option( 'woocommerce_growcart_rewards', stripslashes( $rewards ) );
		}

		wp_send_json( $_POST['rewards'] );
	}

	public function add_to_cart() {
		if ( ! isset( $_POST['action'] ) || 'growcart_add_to_cart' !== $_POST['action'] || ! isset( $_POST['add-to-cart'] ) ) {
			die();
		}

		// get woocommerce error notice
		$error = wc_get_notices( 'error' );
		$html  = '';

		if ( $error ) {
			// print notice
			ob_start();
			foreach ( $error as $value ) {
				wc_print_notice( $value, 'error' );
			}

			$js_data = array(
				'error' => ob_get_clean(),
			);

			wc_clear_notices(); // clear other notice
			wp_send_json( $js_data );
		} else {
			// trigger action for added to cart in ajax
			do_action( 'woocommerce_ajax_added_to_cart', intval( $_POST['add-to-cart'] ) );
			wc_clear_notices(); // clear other notice
			\WC_AJAX::get_refreshed_fragments();
		}

		die();
	}
}
