<?php
namespace Upnrunn;

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

class WooCommerce_Growcart_Settings {
	/**
	 * The single instance of the class.
	 *
	 * @var self
	 * @since  1.26.0
	 */
	private static $instance = null;

	/**
	 * Our Settings.
	 *
	 * @var array Settings.
	 */
	protected $settings = [];

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
		add_action( 'admin_init', [ $this, 'register_settings' ] );
		add_action( 'admin_menu', array( $this, 'add_plugin_page' ) );
		// add_action( 'admin_enqueue_scripts', [ $this, 'enqueue_scripts' ] );
	}

	protected function init_settings() {
		$this->settings = [
			'general' => [
				__( 'General', 'wp-job-manager' ),
				[
					[
						'name'       => 'woocommerce_growcart_display_suggested_products',
						'std'        => '1',
						'label'      => __( 'Display suggested products', 'wp-job-manager' ),
						'desc'       => '',
						'type'       => 'checkbox',
						'attributes' => [],
					],
					[
						'name'       => 'woocommerce_growcart_display_coupon',
						'std'        => '1',
						'label'      => __( 'Display coupon', 'wp-job-manager' ),
						'desc'       => '',
						'type'       => 'checkbox',
						'attributes' => [],
					],
				],
			],
		];
	}

	/**
	 * Register and add settings
	 */
	public function register_settings() {
		$this->init_settings();

		foreach ( $this->settings as $section ) {
			foreach ( $section[1] as $option ) {
				if ( isset( $option['std'] ) ) {
					add_option( $option['name'], $option['std'] );
				}
				register_setting( $this->settings_group, $option['name'] );
			}
		}
	}

	public function field_pill_cb( $args ) {
		// Get the value of the setting we've registered with register_setting()
		$options = get_option( 'wporg_options' );
		?>
		<select
				id="<?php echo esc_attr( $args['label_for'] ); ?>"
				data-custom="<?php echo esc_attr( $args['wporg_custom_data'] ); ?>"
				name="wporg_options[<?php echo esc_attr( $args['label_for'] ); ?>]">
			<option value="red" <?php echo isset( $options[ $args['label_for'] ] ) ? ( selected( $options[ $args['label_for'] ], 'red', false ) ) : ( '' ); ?>>
				<?php esc_html_e( 'red pill', 'wporg' ); ?>
			</option>
			<option value="blue" <?php echo isset( $options[ $args['label_for'] ] ) ? ( selected( $options[ $args['label_for'] ], 'blue', false ) ) : ( '' ); ?>>
				<?php esc_html_e( 'blue pill', 'wporg' ); ?>
			</option>
		</select>
		<p class="description">
			<?php esc_html_e( 'You take the blue pill and the story ends. You wake in your bed and you believe whatever you want to believe.', 'wporg' ); ?>
		</p>
		<p class="description">
			<?php esc_html_e( 'You take the red pill and you stay in Wonderland and I show you how deep the rabbit-hole goes.', 'wporg' ); ?>
		</p>
		<?php
	}

	/**
	 * Add options page.
	 *
	 * @return void
	 */
	public function add_plugin_page() {
		add_options_page(
			__( 'WooCommerce Growcart Settings' ),
			__( 'WooCommerce Growcart' ),
			'manage_options',
			'woocommerce-growcart',
			array( $this, 'options_page_html' )
		);
	}

	/**
	 * Options page callback
	 */
	public function options_page_html() {
		?>
		<div class="wrap">
			<h1><?php echo esc_html( get_admin_page_title() ); ?></h1>
			<form action="options.php" method="post">
				<h2 class="nav-tab-wrapper">
					<?php
					foreach ( $this->settings as $key => $section ) {
						echo '<a href="#settings-' . esc_attr( sanitize_title( $key ) ) . '" class="nav-tab">' . esc_html( $section[0] ) . '</a>';
					}
					?>
				</h2>

				<?php
				// output security fields for the registered setting "wporg"
				settings_fields( 'wporg' );
				// output setting sections and their fields
				// (sections are registered for "wporg", each field is registered to a specific section)
				do_settings_sections( 'wporg' );
				// output save settings button
				submit_button( 'Save Settings' );
				?>
			</form>
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
