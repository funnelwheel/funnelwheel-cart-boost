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
	}

	public function get_cart_information() {
		WC()->cart->calculate_totals();

		if ( ! function_exists( 'wc_cart_totals_order_total_html' ) ) {
			include_once WC_ABSPATH . 'includes/wc-cart-functions.php';
		}

		ob_start();
		wc_cart_totals_order_total_html();
		$cart_totals_order_total_html = \ob_get_clean();

		wp_send_json(
			[
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
				'coupons'             => get_cart_coupons(),
				'total'               => $cart_totals_order_total_html,
				'shop_url'            => wc_get_page_permalink( 'shop' ),
				'checkout_url'        => esc_url( wc_get_checkout_url() ),
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
			'success' => $cart_success,
		];

		wp_send_json( $response );
	}

	public function get_suggested_products() {
		global $post;

		$suggested_products = [];
		$max_items          = 5;
		$exclude_ids        = [];
		$cart               = WC()->cart->get_cart();
		$cart_is_empty      = WC()->cart->is_empty();

		if ( $cart_is_empty ) {
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
			foreach ( $cart as $cart_item ) {
				$exclude_ids[] = $cart_item['product_id'];

				if ( count( $suggested_products ) >= $max_items ) {
					continue;
				}

				$product_id         = $cart_item['variation_id'] ? $cart_item['variation_id'] : $cart_item['product_id'];
				$related_products   = wc_get_related_products( $product_id, $max_items, $exclude_ids );
				$suggested_products = array_merge( $suggested_products, wp_parse_id_list( $related_products ) );
			}
		}

		$return = [];

		foreach ( $suggested_products as $product_id ) {
			$_product = wc_get_product( $product_id );

			$return[] = [
				'product_id'                => $product_id,
				'product_title'             => $_product->get_title(),
				'product_short_description' => $_product->get_short_description(),
				'product_permalink'         => $_product->is_visible() ? $_product->get_permalink( $cart_item ) : '',
				'product_thumbnail'         => $_product->get_image(),
				'product_price'             => WC()->cart->get_product_price( $_product ),
			];
		}

		wp_send_json( $return );
	}
}
