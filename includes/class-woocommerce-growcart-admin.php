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
		add_action( 'admin_notices', [ $this, 'admin_notices' ] );
	}

	/**
	 * Undocumented function
	 *
	 * @return void
	 */
	public function check_license() {
		$license_status_check = get_transient( 'edd_growcart_license_status_check' );
		if ( $license_status_check ) {
			return;
		}

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

		set_transient( 'edd_growcart_license_status_check', true, HOUR_IN_SECONDS );
		update_option( 'edd_growcart_license_status', $license_data->license );
	}

	/**
	 * Undocumented function
	 *
	 * @return void
	 */
	public function admin_notices() {
		$license_status = get_option( 'edd_growcart_license_status' );
		if ( 'valid' === $license_status ) {
			return;
		}

		$class   = 'notice notice-error';
		$message = sprintf( __( 'You need a valid license to continue using GrowCart, please <a href="%s">activate</a> your license.', 'woocommerce-grow-cart' ), admin_url( 'admin.php?page=' . WOOCOMMERCE_GROWCART_LICENSE_PAGE ) );

		printf( '<div class="%1$s"><p>%2$s</p></div>', esc_attr( $class ), $message );
	}
}
