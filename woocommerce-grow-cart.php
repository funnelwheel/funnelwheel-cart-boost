<?php
/**
 * Plugin Name:     GrowCart for WooCommerce
 * Plugin URI:      https://wpgrowcart.com/
 * Description:     GrowCart for WooCommerce delivers mobile-first, CRO-optimized site experiences that get you more customers, that spend more and subscribe longer.
 * Author:          upnrunn™ technologies
 * Author URI:      https://upnrunn.com/
 * Text Domain:     woocommerce-grow-cart
 * Domain Path:     /languages
 * Version:         0.1.0
 *
 * @package         WooCommerce_Grow_Cart
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

if ( ! defined( 'WOOCOMMERCE_GROW_CART_FILE' ) ) {
	define( 'WOOCOMMERCE_GROW_CART_FILE', __FILE__ );
}

// Include the main Container class.
include_once dirname( WOOCOMMERCE_GROW_CART_FILE ) . '/includes/class-woocommerce-grow-cart.php';

// Returns the main instance of Container.
function woocommerce_grow_cart() {
	return \Upnrunn\WooCommerce_Grow_Cart::instance();
}

// Global for backwards compatibility.
$GLOBALS['woocommercegrowy_cart'] = woocommerce_grow_cart();
