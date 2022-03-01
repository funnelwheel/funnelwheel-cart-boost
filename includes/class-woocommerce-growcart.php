<?php
namespace Upnrunn;

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

use WC_AJAX;

/**
 * WooCommerce_GrowCart class.
 * @var [type]
 */
final class WooCommerce_GrowCart {
	/**
	 * The single instance of the class.
	 * @var [type]
	 */
	protected static $_instance = null;

	/**
	 * Main Container instance.
	 * Ensures only one instance of WooCommerce_GrowCart is loaded or can be loaded.
	 *
	 * @return [type] [description]
	 */
	public static function instance() {
		if ( is_null( self::$_instance ) ) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}

	/**
	 * Container constructor.
	 */
	public function __construct() {
		$this->define_constants();
		$this->includes();
		$this->hooks();
	}

	/**
	 * Define WooCommerce_Grow_Cart constants.
	 */
	private function define_constants() {
		$this->define( 'WOOCOMMERCE_GROWCART_ABSPATH', dirname( WOOCOMMERCE_GROWCART_FILE ) . '/' );
	}

	/**
	 * Include required files used in admin and on the frontend.
	 * @return [type] [description]
	 */
	private function includes() {
		include_once WOOCOMMERCE_GROWCART_ABSPATH . 'includes/functions.php';
		include_once WOOCOMMERCE_GROWCART_ABSPATH . 'includes/template-functions.php';
		include_once WOOCOMMERCE_GROWCART_ABSPATH . 'includes/class-woocommerce-growcart-ajax.php';
		include_once WOOCOMMERCE_GROWCART_ABSPATH . 'includes/class-woocommerce-growcart-rewards.php';
		include_once WOOCOMMERCE_GROWCART_ABSPATH . 'includes/class-woocommerce-growcart-settings.php';
	}

	/**
	 * Init hooks.
	 * @return [type] [description]
	 */
	private function hooks() {
		add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_scripts' ] );
		add_action( 'wp_footer', [ $this, 'grow_cart_root' ] );
		add_filter( 'woocommerce_get_settings_pages', [ $this, 'settings_pages' ] );

		// Init classes.
		$this->ajax     = new WooCommerce_GrowCart_Ajax();
		$this->rewards  = new WooCommerce_GrowCart_Rewards();
		$this->settings = new WooCommerce_Growcart_Settings();
	}

	/**
	 * Enqueue scripts.
	 * @return [type] [description]
	 */
	public function enqueue_scripts() {
		if ( is_cart() || is_checkout() ) {
			return;
		}

		$asset_file        = include WOOCOMMERCE_GROWCART_ABSPATH . 'build/index.asset.php';
		$display_mini_cart = is_home() || is_front_page() || is_product() ? false : true;

		wp_enqueue_script(
			'woocommerce-growcart',
			plugins_url( 'build/index.js', WOOCOMMERCE_GROWCART_FILE ),
			array_merge( $asset_file['dependencies'], [ 'wc-cart-fragments' ] ),
			$asset_file['version'],
			true
		);

		wp_localize_script(
			'woocommerce-growcart',
			'woocommerce_growcart',
			[
				'ajaxURL'             => admin_url( 'admin-ajax.php' ),
				'wcAjaxURL'           => WC_AJAX::get_endpoint( '%%endpoint%%' ),
				'is_product'          => is_product(),
				'display_mini_cart'   => $display_mini_cart,
				'cart'                => [
					'is_empty' => WC()->cart->is_empty(),
					'items'    => get_cart_items(),
					'coupons'  => get_cart_coupons(),
				],
				'apply_coupon_nonce'  => wp_create_nonce( 'apply-coupon' ),
				'remove_coupon_nonce' => wp_create_nonce( 'remove-coupon' ),
			]
		);

		if ( function_exists( 'is_product' ) && is_product() ) {
			wp_enqueue_script(
				'woocommerce-growcart-ajax-add-to-cart',
				plugins_url( 'build/ajax-add-to-cart.js', WOOCOMMERCE_GROWCART_FILE ),
				array_merge( $asset_file['dependencies'], [ 'jquery' ] ),
				$asset_file['version'],
				true
			);
		}

		wp_enqueue_style(
			'woocommerce-growcart',
			plugins_url( 'build/index.css', WOOCOMMERCE_GROWCART_FILE ),
			[],
			$asset_file['version']
		);
	}

	/**
	 * [grow_cart_root description]
	 * @return [type] [description]
	 */
	public function grow_cart_root() {
		if ( is_cart() || is_checkout() ) {
			return;
		}

		echo '<div id="woocommerce-growcart-root"></div>';
	}

	/**
	 * Undocumented function
	 *
	 * @param [type] $settings
	 * @return void
	 */
	public function settings_pages( $settings ) {
		$settings[] = include WOOCOMMERCE_GROWCART_ABSPATH . 'includes/class-woocommerce-growcart-settings.php';

		return $settings;
	}

	/**
	 * Define constant if not already set.
	 *
	 * @param string      $name  Constant name.
	 * @param string|bool $value Constant value.
	 */
	private function define( $name, $value ) {
		if ( ! defined( $name ) ) {
			define( $name, $value );
		}
	}
}
