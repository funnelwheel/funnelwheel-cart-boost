<?php
namespace Upnrunn;

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

/**
 * WooCommerce_Grow_Cart_Ajax class.
 * @var [type]
 */
class WooCommerce_Grow_Cart_Ajax {
	public function __construct() {
		add_action( 'wp_ajax_growcart_get_cart_information', [ $this, 'get_cart_information' ] );
		add_action( 'wp_ajax_growcart_update_cart_information', [ $this, 'update_cart_information' ] );
	}

	public function get_cart_information() {
		wp_send_json(
			[
				'is_empty' => WC()->cart->is_empty(),
				'items'    => get_cart_items(),
			]
		);
	}

	public function update_cart_information() {
		$cart_key = sanitize_text_field( $_POST['cart_key'] );
		$new_qty  = (int) $_POST['new_qty'];

		if ( ! is_numeric( $new_qty ) || $new_qty < 0 || ! $cart_key ) {
			wp_send_json( array( 'error' => __( 'Something went wrong' ) ) );
		}

		$cart_success = 0 === $new_qty ? WC()->cart->remove_cart_item( $cart_key ) : WC()->cart->set_quantity( $cart_key, $new_qty );
		$response     = [
			'success' => $cart_success,
		];

		wp_send_json( $response );
	}
}
