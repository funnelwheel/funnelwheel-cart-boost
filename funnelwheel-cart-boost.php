<?php
/**
 * Plugin Name:     GrowCart for WooCommerce
 * Plugin URI:      https://wpdrift.com/growcart/
 * Description:     GrowCart for WooCommerce delivers mobile-first, CRO-optimized site experiences that get you more customers, that spend more and subscribe longer.
 * Author:          WPdrift
 * Author URI:      https://wpdrift.com/
 * Text Domain:     woocommerce-growcart
 * Domain Path:     /languages
 * Version:         0.1.0
 *
 * @package         WooCommerce_GrowCart
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

define( 'WOOCOMMERCE_GROWCART_FILE', __FILE__ );
define( 'WOOCOMMERCE_GROWCART_STORE_URL', 'https://wpdrift.com' );
define( 'WOOCOMMERCE_GROWCART_STORE_ITEM_ID', 304 );
define( 'WOOCOMMERCE_GROWCART_STORE_ITEM_NAME', __( 'GrowCart for WooCommerce', 'woocommerce-growcart' ) );
define( 'WOOCOMMERCE_GROWCART_LICENSE_PAGE', 'growcart-license' );

// Include the main Container class.
include_once dirname( WOOCOMMERCE_GROWCART_FILE ) . '/includes/class-woocommerce-growcart.php';

// Returns the main instance of Container.
function woocommerce_growcart() {
	return \Upnrunn\WooCommerce_GrowCart::instance();
}

// Global for backwards compatibility.
$GLOBALS['woocommerce_growcart'] = woocommerce_growcart();
