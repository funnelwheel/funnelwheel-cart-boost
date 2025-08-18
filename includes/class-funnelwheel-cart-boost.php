<?php

namespace Upnrunn;

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

use WC_AJAX;

/**
 * FunnelWheel_Cart_Boost class.
 * @var [type]
 */
final class FunnelWheel_Cart_Boost {
	/**
	 * The single instance of the class.
	 * @var [type]
	 */
	protected static $_instance = null;

	/**
	 * Main Container instance.
	 * Ensures only one instance of FunnelWheel_Cart_Boost is loaded or can be loaded.
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
		$this->define( 'FUNNELWHEEL_CART_BOOST_ABSPATH', dirname( FUNNELWHEEL_CART_BOOST_FILE ) . '/' );
	}

	/**
	 * Include required files used in admin and on the frontend.
	 * @return [type] [description]
	 */
	private function includes() {
		include_once FUNNELWHEEL_CART_BOOST_ABSPATH . 'includes/functions.php';
		include_once FUNNELWHEEL_CART_BOOST_ABSPATH . 'includes/class-funnelwheel-cart-boost-ajax.php';
		include_once FUNNELWHEEL_CART_BOOST_ABSPATH . 'includes/class-funnelwheel-cart-boost-rewards.php';
		include_once FUNNELWHEEL_CART_BOOST_ABSPATH . 'includes/class-funnelwheel-cart-boost-settings.php';
		include_once FUNNELWHEEL_CART_BOOST_ABSPATH . 'includes/class-funnelwheel-cart-boost-admin.php';
	}

	/**
	 * Init classes.
	 *
	 * @return void
	 */
	private function init_classes() {
		$this->ajax     = new FunnelWheel_Cart_Boost_Ajax();
		$this->rewards  = new FunnelWheel_Cart_Boost_Rewards();
		$this->settings = new FunnelWheel_Cart_Boost_Settings();
		$this->admin    = new FunnelWheel_Cart_Boost_Admin();
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
		if ( is_cart() || is_checkout() || ! $this->display_growcart() ) {
			return;
		}

		$asset_file = include FUNNELWHEEL_CART_BOOST_ABSPATH . 'build/index.asset.php';

		wp_enqueue_script(
			'funnelwheel-cart-boost',
			plugins_url( 'build/index.js', FUNNELWHEEL_CART_BOOST_FILE ),
			array_merge( $asset_file['dependencies'], [ 'wc-cart-fragments' ] ),
			$asset_file['version'],
			true
		);

		wp_localize_script(
			'funnelwheel-cart-boost',
			'woocommerce_growcart',
			[
				'ajaxURL'             => admin_url( 'admin-ajax.php' ),
				'wcAjaxURL'           => WC_AJAX::get_endpoint( '%%endpoint%%' ),
				'is_product'          => is_product(),
				'display_mini_cart'   => is_home() || is_front_page() || is_product() ? false : true,
				'apply_coupon_nonce'  => wp_create_nonce( 'apply-coupon' ),
				'remove_coupon_nonce' => wp_create_nonce( 'remove-coupon' ),
			]
		);

		if ( function_exists( 'is_product' ) && is_product() ) {
			wp_enqueue_script(
				'woocommerce-growcart-ajax-add-to-cart',
				plugins_url( 'build/ajax-add-to-cart.js', FUNNELWHEEL_CART_BOOST_FILE ),
				array_merge( $asset_file['dependencies'], [ 'jquery' ] ),
				$asset_file['version'],
				true
			);
		}

		wp_enqueue_style(
			'funnelwheel-cart-boost',
			plugins_url( 'build/index.css', FUNNELWHEEL_CART_BOOST_FILE ),
			[],
			$asset_file['version']
		);

		$active_reward = funnelwheel_cart_boost()->rewards->get_active_reward();
		if ( $active_reward ) {
			$styles = [
				'headerTextColor'         => '#ffffff',
				'headerBackground'        => '#343a40',
				'fontSize'                => '14px',
				'spacing'                 => [
					'top'    => '24px',
					'right'  => '24px',
					'bottom' => '24px',
					'left'   => '24px',
				],
				'textcolor'               => '#ffffff',
				'backgroundColor'         => '#000000',
				'progressColor'           => '#198754',
				'progressBackgroundColor' => '#495057',
				'iconColor'               => '#ffffff',
				'iconBackground'          => '#495057',
				'activeIconColor'         => '#ffffff',
				'activeIconBackground'    => '#198754',
			];

			if ( $active_reward['styles'] ) {
				foreach ( array_keys( $styles ) as $key ) {
					if ( isset( $active_reward['styles'][ $key ] ) ) {
						$styles[ $key ] = $active_reward['styles'][ $key ];
					}
				}
			}

			$custom_css = "
				:root {
					--growcart-font-size: {$styles['fontSize']};
					--growcart-header-text-color: {$styles['headerTextColor']};
					--growcart-header-background: {$styles['headerBackground']};
					--growcart-spacing-top: {$styles['spacing']['top']};
					--growcart-spacing-right: {$styles['spacing']['right']};
					--growcart-spacing-bottom: {$styles['spacing']['bottom']};
					--growcart-spacing-left: {$styles['spacing']['left']};
                    --growcart-text-color: {$styles['textcolor']};
                    --growcart-background-color: {$styles['backgroundColor']};
					--growcart-icon-color: {$styles['iconColor']};
                    --growcart-icon-background: {$styles['iconBackground']};
					--growcart-active-icon-color: {$styles['activeIconColor']};
                    --growcart-active-icon-background: {$styles['activeIconBackground']};
                    --growcart-progress-color: {$styles['progressColor']};
                    --growcart-progress-background-color: {$styles['progressBackgroundColor']};
                }
			";
			wp_add_inline_style( 'funnelwheel-cart-boost', $custom_css );
		}
	}

	/**
	 * Output popup root required by ReactJS.
	 * @return [type] [description]
	 */
	public function growcart_root() {
		if ( is_cart() || is_checkout() ) {
			return;
		}

		echo '<div id="woocommerce-growcart-root"></div>';
	}

	/**
	 * Coditionally display growcart.
	 *
	 * @return void
	 */
	public function display_growcart() {
		$active_reward = funnelwheel_cart_boost()->rewards->get_active_reward();
		if ( ! $active_reward ) {
			return false;
		}

		$active_rules = funnelwheel_cart_boost()->rewards->get_active_rules( $active_reward );
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
