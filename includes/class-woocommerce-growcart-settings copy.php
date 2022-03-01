<?php
namespace Upnrunn;

use WC_Settings_Page;

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

class WooCommerce_Grow_Cart_Settings extends WC_Settings_Page {
	public function __construct() {
		$this->id    = 'growcart';
		$this->label = __( 'GrowCart', 'woocommerce' );
		parent::__construct();
	}

	public function output() {
		global $current_section, $hide_save_button;

		if ( '' === $current_section ) {
			$hide_save_button = true;
			$this->output_rewards_screen();
		}
	}

	public function output_rewards_screen() {
		$asset_file = include WOOCOMMERCE_GROW_CART_ABSPATH . 'build/rewards.asset.php';

		wp_enqueue_script(
			'woocommerce-growcart-rewards',
			plugins_url( 'build/rewards.js', WOOCOMMERCE_GROW_CART_FILE ),
			$asset_file['dependencies'],
			$asset_file['version'],
			true
		);

		wp_localize_script(
			'woocommerce-growcart-rewards',
			'woocommerce_growcart_rewards',
			[
				'ajaxURL'              => admin_url( 'admin-ajax.php' ),
				'update_rewards_nonce' => wp_create_nonce( 'update-rewards' ),
			]
		);

		wp_enqueue_style(
			'woocommerce-growcart-rewards',
			plugins_url( 'build/rewards.css', WOOCOMMERCE_GROW_CART_FILE ),
			[],
			$asset_file['version']
		);

		echo '<div id="rewards-screen"></div>';
	}
}

return new WooCommerce_Grow_Cart_Settings();
