<?php
/**
 * Plugin Name:     FunnelWheel Cart Boost
 * Plugin URI:      https://funnelwheel.com/cart-boost
 * Description:     Cart Boost for WooCommerce delivers mobile-first, CRO-optimized site experiences that get you more customers, that spend more and subscribe longer.
 * Author:          FunnelWheel
 * Author URI:      https://funnelwheel.com
 * Version:         0.1.0
 * Text Domain:     funnelwheel-cart-boost
 * Domain Path:     /languages
 * License:         GPLv2 or later
 * License URI:     https://www.gnu.org/licenses/gpl-2.0.html
 *
 * @package         FunnelWheel_Cart_Boost
 */


// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

define( 'WOOCOMMERCE_GROWCART_FILE', __FILE__ );
define( 'WOOCOMMERCE_GROWCART_STORE_URL', 'http://funnelwheel.com' );
define( 'WOOCOMMERCE_GROWCART_STORE_ITEM_ID', 304 );
define( 'WOOCOMMERCE_GROWCART_STORE_ITEM_NAME', __( 'GrowCart for WooCommerce', 'funnelwheel-cart-boost' ) );
define( 'WOOCOMMERCE_GROWCART_LICENSE_PAGE', 'growcart-license' );

// Include the main Container class.
include_once dirname( WOOCOMMERCE_GROWCART_FILE ) . '/includes/class-funnelwheel-cart-boost.php';

// Returns the main instance of Container.
function funnelwheel_cart_boost() {
	return \Upnrunn\FunnelWheel_Cart_Boost::instance();
}

// Global for backwards compatibility.
$GLOBALS['funnelwheel_cart_boost'] = funnelwheel_cart_boost();
