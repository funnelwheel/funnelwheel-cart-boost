<?php
namespace Upnrunn;

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

/**
 * WooCommerce_Grow_Cart class.
 * @var [type]
 */
final class WooCommerce_Grow_Cart {
	/**
	 * The single instance of the class.
	 * @var [type]
	 */
	protected static $_instance = null;

	/**
	 * Main Container instance.
	 * Ensures only one instance of WooCommerce_Grow_Cart is loaded or can be loaded.
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
		$this->define( 'WOOCOMMERCE_GROW_CART_ABSPATH', dirname( WOOCOMMERCE_GROW_CART_FILE ) . '/' );
	}

	/**
	 * Include required files used in admin and on the frontend.
	 * @return [type] [description]
	 */
	private function includes() {
		include_once WOOCOMMERCE_GROW_CART_ABSPATH . 'includes/functions.php';
		include_once WOOCOMMERCE_GROW_CART_ABSPATH . 'includes/template-functions.php';
		include_once WOOCOMMERCE_GROW_CART_ABSPATH . 'includes/class-woocommerce-grow-cart-ajax.php';
	}

	/**
	 * Init hooks.
	 * @return [type] [description]
	 */
	private function hooks() {
		add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_scripts' ] );
		add_action( 'wp_footer', [ $this, 'grow_cart_root' ] );

		// Init classes.
		$this->ajax = new WooCommerce_Grow_Cart_Ajax();
	}

	/**
	 * Enqueue scripts.
	 * @return [type] [description]
	 */
	public function enqueue_scripts() {
		$asset_file = include WOOCOMMERCE_GROW_CART_ABSPATH . 'build/index.asset.php';

		wp_enqueue_script(
			'woocommerce-grow-cart',
			plugins_url( 'build/index.js', WOOCOMMERCE_GROW_CART_FILE ),
			$asset_file['dependencies'],
			$asset_file['version'],
			true
		);

		wp_localize_script(
			'woocommerce-grow-cart',
			'woocommerce_grow_cart',
			[
				'ajaxURL' => admin_url( 'admin-ajax.php' ),
			]
		);

		wp_enqueue_style(
			'woocommerce-grow-cart',
			plugins_url( 'build/index.css', WOOCOMMERCE_GROW_CART_FILE ),
			[],
			$asset_file['version']
		);
	}

	/**
	 * [grow_cart_root description]
	 * @return [type] [description]
	 */
	public function grow_cart_root() {
		echo '<div id="woocommerce-grow-cart-root"></div>';
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
