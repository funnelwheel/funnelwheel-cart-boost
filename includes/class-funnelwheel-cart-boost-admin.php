<?php

namespace Upnrunn;

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

use WC_AJAX;

class FunnelWheel_Cart_Boost_Admin {
	/**
	 * The single instance of the class.
	 *
	 * @var self
	 * @since  0.1.0
	 */
	private static $instance = null;

	/**
	 * Allows for accessing single instance of class. Class should only be constructed once per call.
	 *
	 * @static
	 * @return self Main instance.
	 */
	public static function instance() {
		if ( is_null( self::$instance ) ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Start up.
	 */
	public function __construct() {
		add_action( 'init', [ $this, 'set_script_translations' ] );
	}

	/**
	 * Set script translations.
	 *
	 * @return void
	 */
	public function set_script_translations() {
		wp_set_script_translations(
			'funnelwheel-cart-boost',
			'funnelwheel-cart-boost',
			plugin_dir_path( FUNNELWHEEL_CART_BOOST_FILE ) . 'languages'
		);
	}
}
