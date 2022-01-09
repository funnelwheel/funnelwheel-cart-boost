<?php
namespace Upnrunn;

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

/**
 * WooCommerce_Sticky_Cart class.
 * @var [type]
 */
final class WooCommerce_Sticky_Cart {
	/**
	 * The single instance of the class.
	 * @var [type]
	 */
	protected static $_instance = null;

	/**
	 * Main Container instance.
	 * Ensures only one instance of WooCommerce_Sticky_Cart is loaded or can be loaded.
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
	 * Define WooCommerce_Sticky_Cart constants.
	 */
	private function define_constants() {
		$this->define( 'WOOCOMMERCE_STICKY_CART_ABSPATH', dirname( WOOCOMMERCE_STICKY_CART_FILE ) . '/' );
	}

	/**
	 * Include required files used in admin and on the frontend.
	 * @return [type] [description]
	 */
	private function includes() {
		include_once WOOCOMMERCE_STICKY_CART_ABSPATH . 'includes/template-functions.php';
	}

	/**
	 * Init hooks.
	 * @return [type] [description]
	 */
	private function hooks() {
		add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_scripts' ] );
	}

	/**
	 * Enqueue scripts.
	 * @return [type] [description]
	 */
	public function enqueue_scripts() {
		$asset_file = include WOOCOMMERCE_STICKY_CART_ABSPATH . 'build/index.asset.php';

		wp_enqueue_script(
			'woocommerce-sticky-cart',
			plugins_url( 'build/index.js', WOOCOMMERCE_STICKY_CART_FILE ),
			$asset_file['dependencies'],
			$asset_file['version'],
			true
		);

		wp_enqueue_style(
			'woocommerce-sticky-cart',
			plugins_url( 'build/index.css', WOOCOMMERCE_STICKY_CART_FILE ),
			[],
			$asset_file['version']
		);
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
