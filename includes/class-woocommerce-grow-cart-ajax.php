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
		add_action( 'wp_ajax_nopriv_growcart_get_cart_information', [ $this, 'get_cart_information' ] );
		add_action( 'wp_ajax_growcart_update_cart_item', [ $this, 'update_cart_item' ] );
		add_action( 'wp_ajax_nopriv_growcart_update_cart_item', [ $this, 'update_cart_item' ] );
	}

	public function get_cart_information() {
		wp_send_json(
			[
				'is_empty' => WC()->cart->is_empty(),
				'items'    => get_cart_items(),
			]
		);
	}

	public function update_cart_item() {
		$cart_key = sanitize_text_field( $_POST['cart_key'] );
		$quantity = (int) $_POST['quantity'];

		if ( ! is_numeric( $quantity ) || $quantity < 0 || ! $cart_key ) {
			wp_send_json(
				[
					'error'     => __( 'Something went wrong' ),
					'$cart_key' => $cart_key,
					'$quantity' => $quantity,
					'$_POST' => $_POST,
					'$_GET' => $_GET

				]
			);
		}

		$cart_success = 0 === $quantity ? WC()->cart->remove_cart_item( $cart_key ) : WC()->cart->set_quantity( $cart_key, $quantity );
		$response     = [
			'success' => $cart_success,
		];

		wp_send_json( $response );
	}
}
