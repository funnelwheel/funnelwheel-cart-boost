<?php
/**
 * Plugin Name:     GrowCart for WooCommerce
 * Plugin URI:      https://wpgrowcart.com/
 * Description:     GrowCart for WooCommerce delivers mobile-first, CRO-optimized site experiences that get you more customers, that spend more and subscribe longer.
 * Author:          upnrunn™ technologies
 * Author URI:      https://upnrunn.com/
 * Text Domain:     woocommerce-growcart
 * Domain Path:     /languages
 * Version:         0.1.0
 *
 * @package         WooCommerce_GrowCart
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

if ( ! defined( 'WOOCOMMERCE_GROWCART_FILE' ) ) {
	define( 'WOOCOMMERCE_GROWCART_FILE', __FILE__ );
}

// Include the main Container class.
include_once dirname( WOOCOMMERCE_GROWCART_FILE ) . '/includes/class-woocommerce-growcart.php';

// Returns the main instance of Container.
function woocommerce_growcart() {
	return \Upnrunn\WooCommerce_GrowCart::instance();
}

// Global for backwards compatibility.
$GLOBALS['woocommerce_growcart'] = woocommerce_growcart();
