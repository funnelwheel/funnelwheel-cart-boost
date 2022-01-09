<?php
namespace Upnrunn;

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

/**
 * WooCommerce_Sticky_Cart_Ajax class.
 * @var [type]
 */
class WooCommerce_Sticky_Cart_Ajax {
	public function __construct() {
		add_action( 'wp_ajax_woocommerce_get_cart_information', [ $this, 'get_cart_information' ] );
	}

	public function get_cart_information() {
		wp_send_json(
			[
				'isEmpty'   => WC()->cart->is_empty(),
				'cartItems' => WC()->cart->get_cart(),
			]
		);
	}
}
