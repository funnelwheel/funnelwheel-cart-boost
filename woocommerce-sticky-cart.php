<?php
/**
 * Plugin Name:     WooCommerce Sticky Cart
 * Plugin URI:      https://upnrunn.com/woocommerce-sticky-cart
 * Description:     WooCommerce Sticky Cart delivers mobile-first, CRO-optimized site experiences that get you more customers, that spend more and subscribe longer.
 * Author:          upnrunn™ technologies
 * Author URI:      https://upnrunn.com/
 * Text Domain:     woocommerce-sticky-cart
 * Domain Path:     /languages
 * Version:         0.1.0
 *
 * @package         WooCommerce_Sticky_Cart
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

if ( ! defined( 'WOOCOMMERCE_STICKY_CART_FILE' ) ) {
	define( 'WOOCOMMERCE_STICKY_CART_FILE', __FILE__ );
}

// Include the main Container class.
include_once dirname( WOOCOMMERCE_STICKY_CART_FILE ) . '/includes/class-woocommerce-sticky-cart.php';

// Returns the main instance of Container.
function woocommerce_sticky_cart() {
	return \Upnrunn\WooCommerce_Sticky_Cart::instance();
}

// Global for backwards compatibility.
$GLOBALS['woocommerce_sticky_cart'] = woocommerce_sticky_cart();
