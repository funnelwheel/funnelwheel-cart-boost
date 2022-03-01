<?php
namespace Upnrunn;

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

class WooCommerce_Growcart_Settings {
	/**
	 * Holds the values to be used in the fields callbacks.
	 */
	private $options;

	/**
	 * Start up.
	 */
	public function __construct() {
		// Set class property
		$this->options = get_option( 'woocommerce_growcart_options' );

		add_action( 'admin_menu', array( $this, 'add_plugin_page' ) );
		// add_action( 'admin_init', array( $this, 'page_init' ) );
		add_action( 'admin_enqueue_scripts', [ $this, 'enqueue_scripts' ] );
	}

	/**
	 * Add options page.
	 *
	 * @return void
	 */
	public function add_plugin_page() {
		// This page will be under "Settings"
		add_options_page(
			__( 'WooCommerce Growcart Settings' ),
			__( 'WooCommerce Growcart' ),
			'manage_options',
			'woocommerce-growcart',
			array( $this, 'create_admin_page' )
		);
	}

	/**
	 * Register and add settings
	 */
	public function page_init() {
		register_setting(
			'woocommerce_growcart', // Option group
			'woocommerce_growcart_options', // Option name
			array( $this, 'sanitize' ) // Sanitize
		);

		add_settings_section(
			'woocommerce_growcart_section_rewards', // ID
			__( 'Spaces API' ), // Title
			array( $this, 'section_rewards_callback' ), // Callback
			'woocommerce-growcart' // Page
		);

		add_settings_field(
			'rewards', // ID
			__( 'Rewards' ), // Title
			array( $this, 'field_rewards_callback' ), // Callback
			'woocommerce-growcart', // Page
			'woocommerce_growcart_section_rewards' // Section
		);
	}

	/**
	 * Sanitize each setting field as needed
	 *
	 * @param array $input Contains all settings fields as array keys
	 */
	public function sanitize( $input ) {
		$new_input = array();
		if ( isset( $input['rewards'] ) ) {
			$new_input['rewards'] = sanitize_text_field( $input['rewards'] );
		}

		return $new_input;
	}


	/**
	 * Print the Section text
	 */
	public function section_rewards_callback( $args ) {
		?>
		<p id="<?php echo esc_attr( $args['id'] ); ?>"><?php esc_html_e( 'Please enter API Key and API Secret below.', 'wporg' ); ?></p>
		<?php
	}

	/**
	 * Get the settings option array and print one of its values
	 */
	public function field_rewards_callback( $args ) {
		printf(
			'<input type="text" class="regular-text" id="rewards" name="formidable_digitalocean_spaces_options[rewards]" value="%s" />',
			isset( $this->options['rewards'] ) ? esc_attr( $this->options['rewards'] ) : ''
		);
	}

	/**
	 * Options page callback
	 */
	public function create_admin_page() {
		?>
		<div class="wrap">
			<h1><?php echo esc_html( get_admin_page_title() ); ?></h1>
			<div id="rewards-screen"></div>
		</div>
		<?php
	}

	/**
	 * Enqueue scripts.
	 *
	 * @return void
	 */
	public function enqueue_scripts() {
		$asset_file = include WOOCOMMERCE_GROWCART_ABSPATH . 'build/rewards.asset.php';

		wp_enqueue_script(
			'woocommerce-growcart-rewards',
			plugins_url( 'build/rewards.js', WOOCOMMERCE_GROWCART_FILE ),
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
			plugins_url( 'build/rewards.css', WOOCOMMERCE_GROWCART_FILE ),
			[],
			$asset_file['version']
		);
	}
}
