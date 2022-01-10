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
		add_action( 'wp_ajax_woocommerce_get_cart_information', [ $this, 'get_cart_information' ] );
	}

	public function get_cart_information() {
		wp_send_json(
			[
				'is_empty' => WC()->cart->is_empty(),
				'items'    => get_cart_items(),
			]
		);
	}
}
