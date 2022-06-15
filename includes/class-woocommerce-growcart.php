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
		$this->init_classes();
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
	 * Init classes.
	 *
	 * @return void
	 */
	private function init_classes() {
		$this->ajax     = new WooCommerce_GrowCart_Ajax();
		$this->rewards  = new WooCommerce_GrowCart_Rewards();
		$this->settings = new WooCommerce_Growcart_Settings();
	}

	/**
	 * Init hooks.
	 * @return [type] [description]
	 */
	private function hooks() {
		add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_scripts' ] );
		add_action( 'wp_footer', [ $this, 'growcart_root' ] );
	}

	/**
	 * Enqueue scripts.
	 * @return [type] [description]
	 */
	public function enqueue_scripts() {
		if ( is_cart() || is_checkout() ) {
			return;
		}

		$asset_file = include WOOCOMMERCE_GROWCART_ABSPATH . 'build/index.asset.php';

		if ( $this->display_growcart() ) {
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
					'display_mini_cart'   => is_home() || is_front_page() || is_product() ? false : true,
					'cart'                => [
						'is_empty' => WC()->cart->is_empty(),
						'items'    => get_cart_items(),
						'coupons'  => get_cart_coupons(),
					],
					'apply_coupon_nonce'  => wp_create_nonce( 'apply-coupon' ),
					'remove_coupon_nonce' => wp_create_nonce( 'remove-coupon' ),
				]
			);
		}

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

		$active_reward = woocommerce_growcart()->rewards->get_active_reward();
		if ( $active_reward ) {
			$spacing_top      = isset( $active_reward['styles'], $active_reward['styles']['spacing'] ) ? $active_reward['styles']['spacing']['top'] : '24px';
			$spacing_right    = isset( $active_reward['styles'], $active_reward['styles']['spacing'] ) ? $active_reward['styles']['spacing']['right'] : '24px';
			$spacing_bottom   = isset( $active_reward['styles'], $active_reward['styles']['spacing'] ) ? $active_reward['styles']['spacing']['bottom'] : '24px';
			$spacing_left     = isset( $active_reward['styles'], $active_reward['styles']['spacing'] ) ? $active_reward['styles']['spacing']['left'] : '24px';
			$font_size        = isset( $active_reward['styles'], $active_reward['styles']['fontSize'] ) ? $active_reward['styles']['fontSize'] : '14px';
			$text_color       = isset( $active_reward['styles'], $active_reward['styles']['textcolor'] ) ? $active_reward['styles']['textcolor'] : '#ffffff';
			$background_color = isset( $active_reward['styles'], $active_reward['styles']['backgroundColor'] ) ? $active_reward['styles']['backgroundColor'] : '#000000';

			$custom_css = "
				:root {
					--growcart-spacing-top: {$spacing_top};
					--growcart-spacing-right: {$spacing_right};
					--growcart-spacing-bottom: {$spacing_bottom};
					--growcart-spacing-left: {$spacing_left};
					--growcart-font-size: {$font_size};
                    --growcart-text-color: {$text_color};
                    --growcart-background-color: {$background_color};
                }
			";
			wp_add_inline_style( 'woocommerce-growcart', $custom_css );
		}
	}

	/**
	 * [growcart_root description]
	 * @return [type] [description]
	 */
	public function growcart_root() {
		if ( is_cart() || is_checkout() ) {
			return;
		}

		echo '<div id="woocommerce-growcart-root"></div>';
	}

	/**
	 * Undocumented function
	 *
	 * @return void
	 */
	public function display_growcart() {
		$active_reward = woocommerce_growcart()->rewards->get_active_reward();
		if ( ! $active_reward ) {
			return false;
		}

		$active_rules = woocommerce_growcart()->rewards->get_active_rules( $active_reward );
		if ( empty( $active_rules ) ) {
			return false;
		}

		return true;
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
