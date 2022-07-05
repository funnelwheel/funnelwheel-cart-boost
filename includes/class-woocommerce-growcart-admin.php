<?php

namespace Upnrunn;

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

use WC_AJAX;

class WooCommerce_Growcart_Admin {
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
		add_action( 'init', [ $this, 'check_license' ] );
	}

	/**
	 * Undocumented function
	 *
	 * @return void
	 */
	public function check_license() {
		$store_url = WOOCOMMERCE_GROWCART_STORE_URL;
		$item_name = WOOCOMMERCE_GROWCART_STORE_ITEM_NAME;
		$license   = trim( get_option( 'edd_growcart_license_key' ) );

		$api_params = array(
			'edd_action' => 'check_license',
			'license'    => $license,
			'item_name'  => urlencode( $item_name ),
			'url'        => home_url(),
		);

		$response = wp_remote_post(
			$store_url,
			array(
				'body'      => $api_params,
				'timeout'   => 15,
				'sslverify' => false,
			)
		);

		if ( is_wp_error( $response ) ) {
			return false;
		}

		$license_data = json_decode( wp_remote_retrieve_body( $response ) );

		update_option( 'edd_growcart_license_status', $license_data->license );
	}
}
