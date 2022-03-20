<?php
namespace Upnrunn;

use WP_Query;
use WC_AJAX;

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

/**
 * WooCommerce_GrowCart_Ajax class.
 * @var [type]
 */
class WooCommerce_GrowCart_Ajax {
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

		$cart_contents_count = WC()->cart->get_cart_contents_count();
		$rewards             = woocommerce_growcart()->rewards->get_available_rewards();
		uasort( $rewards, [ $this, 'sort_by_minimum_cart_contents' ] );
		$rewards            = array_values( $rewards );
		$filtered_rewards   = woocommerce_growcart()->rewards->filter_rewards_by_cart_contents_count( $rewards, $cart_contents_count );
		$current_reward_ids = [];
		$reward_string      = '';

		if ( isset( $filtered_rewards['current_rewards'] ) && count( $filtered_rewards['current_rewards'] ) ) {
			$current_reward_ids = wp_list_pluck( $filtered_rewards['current_rewards'], 'id' );
			$reward_string      = woocommerce_growcart()->rewards->get_reward_string( $filtered_rewards['current_rewards'] );
		}

		$coupons = [];

		$_coupons = get_cart_coupons();
		foreach ( $_coupons as $key => $value ) {
			if ( in_array( $value['code'], $current_reward_ids, true ) ) {
				continue;
			}

			$coupons[] = $value;
		}

		if ( ! function_exists( 'wc_cart_totals_order_total_html' ) ) {
			include_once WC_ABSPATH . 'includes/wc-cart-functions.php';
		}

		WC()->cart->calculate_totals();

		$cart_totals_order_total_html = '<del>' . WC()->cart->get_cart_subtotal() . '</del> ';

		ob_start();
		wc_cart_totals_order_total_html();
		$cart_totals_order_total_html .= \ob_get_clean();

		wp_send_json(
			[
				'current_reward_ids'  => $current_reward_ids,
				'is_empty'            => WC()->cart->is_empty(),
				'items'               => get_cart_items(),
				'cart_title'          => sprintf( __( 'Your Cart (%d)', 'woocommerce-grow-cart' ), WC()->cart->get_cart_contents_count() ),
				'tax_enabled'         => wc_tax_enabled(),
				'has_shipping'        => WC()->cart->needs_shipping() && WC()->cart->show_shipping(),
				'has_discount'        => WC()->cart->has_discount(),
				'cart_subtotal'       => WC()->cart->get_cart_subtotal(),
				'cart_tax'            => WC()->cart->get_cart_tax(),
				'cart_shipping_total' => WC()->cart->get_cart_shipping_total(),
				'cart_discount_total' => WC()->cart->get_cart_discount_total(),
				'coupons'             => $coupons,
				'rewards'             => $reward_string,
				'total'               => $cart_totals_order_total_html,
				'shop_url'            => wc_get_page_permalink( 'shop' ),
				'checkout_url'        => esc_url( wc_get_checkout_url() ),
				'cart_contents_count' => WC()->cart->get_cart_contents_count(),
				'suggested_products'  => woocommerce_growcart()->rewards->get_suggested_products(),
			]
		);
	}

	public function update_cart_item() {
		$cart_key = sanitize_text_field( $_POST['cart_key'] );
		$quantity = (int) $_POST['quantity'];

		if ( ! is_numeric( $quantity ) || $quantity < 0 || ! $cart_key ) {
			wp_send_json( [ 'error' => __( 'Something went wrong', 'woocommerce-grow-cart' ) ] );
		}

		$cart_success = 0 === $quantity ? WC()->cart->remove_cart_item( $cart_key ) : WC()->cart->set_quantity( $cart_key, $quantity );
		$response     = [
			'success'               => $cart_success,
			'removed_cart_contents' => WC()->cart->removed_cart_contents,
		];

		wp_send_json( $response );
	}

	public function get_suggested_products() {
		wp_send_json( woocommerce_growcart()->rewards->get_suggested_products() );
	}

	public function get_rewards() {
		wp_send_json( woocommerce_growcart()->rewards->get_rewards() );
	}

	public function get_admin_rewards() {
		wp_send_json( woocommerce_growcart()->rewards->get_available_rewards() );
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
			WC_AJAX::get_refreshed_fragments();
		}

		die();
	}

	protected function sort_by_minimum_cart_contents( $a, $b ) {
		if ( floatval( $a['minimum_cart_contents'] ) === floatval( $b['minimum_cart_contents'] ) ) {
			return 0;
		}

		return ( floatval( $a['minimum_cart_contents'] ) < floatval( $b['minimum_cart_contents'] ) ) ? -1 : 1;
	}
}
