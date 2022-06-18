<?php
namespace Upnrunn;

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

use WC_AJAX;

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
		$this->settings_group = 'woocommerce_growcart';
		add_action( 'admin_init', [ $this, 'register_settings' ] );
		add_action( 'admin_menu', array( $this, 'add_plugin_page' ) );
		add_action( 'admin_enqueue_scripts', [ $this, 'enqueue_scripts' ] );
	}

	protected function init_settings() {
		$this->settings = [
			'rewards' => [
				__( 'Rewards', 'woocommerce-grow-cart' ),
				[
					[
						'name'       => 'woocommerce_growcart_rewards',
						'std'        => '',
						'desc'       => '',
						'type'       => 'rewards',
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

	/**
	 * Add plugin page.
	 *
	 * @return void
	 */
	public function add_plugin_page() {
		add_menu_page(
			__( 'GrowCart Settings', 'woocommerce-grow-cart' ),
			__( 'GrowCart', 'woocommerce-grow-cart' ),
			'manage_options',
			'wc-growcart',
			array( $this, 'menu_page_html' ),
			'dashicons-cart',
			58
		);
	}

	/**
	 * Options page callback
	 */
	public function menu_page_html() {
		$this->init_settings();
		?>
		<div class="wrap woocommerce-growcart-settings-wrap">
			<h1><?php echo esc_html( get_admin_page_title() ); ?></h1>
			<?php settings_fields( $this->settings_group ); ?>

				<?php
				foreach ( $this->settings as $key => $section ) {
					$section_args = isset( $section[2] ) ? (array) $section[2] : [];
					echo '<div id="settings-' . esc_attr( sanitize_title( $key ) ) . '" class="settings_panel">';
					if ( ! empty( $section_args['before'] ) ) {
						echo '<p class="before-settings">' . wp_kses_post( $section_args['before'] ) . '</p>';
					}
					echo '<table class="form-table settings parent-settings">';

					foreach ( $section[1] as $option ) {
						$value = get_option( $option['name'] );
						$this->output_field( $option, $value );
					}

					echo '</table>';
					if ( ! empty( $section_args['after'] ) ) {
						echo '<p class="after-settings">' . wp_kses_post( $section_args['after'] ) . '</p>';
					}
					echo '</div>';
				}
				?>
		</div>
		<?php
	}

	/**
	 * Outputs the field row.
	 *
	 * @param array $option
	 * @param mixed $value
	 */
	protected function output_field( $option, $value ) {
		$placeholder    = ( ! empty( $option['placeholder'] ) ) ? 'placeholder="' . esc_attr( $option['placeholder'] ) . '"' : '';
		$class          = ! empty( $option['class'] ) ? $option['class'] : '';
		$option['type'] = ! empty( $option['type'] ) ? $option['type'] : 'text';
		$attributes     = [];
		if ( ! empty( $option['attributes'] ) && is_array( $option['attributes'] ) ) {
			foreach ( $option['attributes'] as $attribute_name => $attribute_value ) {
				$attributes[] = esc_attr( $attribute_name ) . '="' . esc_attr( $attribute_value ) . '"';
			}
		}

		echo '<tr valign="top" class="' . esc_attr( $class ) . '">';

		if ( ! empty( $option['label'] ) ) {
			echo '<th scope="row"><label for="setting-' . esc_attr( $option['name'] ) . '">' . esc_html( $option['label'] ) . '</a></th><td>';
		} else {
			echo '<td colspan="2">';
		}

		$method_name = 'input_' . $option['type'];
		if ( method_exists( $this, $method_name ) ) {
			$this->$method_name( $option, $attributes, $value, $placeholder );
		} else {
			/**
			 * Allows for custom fields in admin setting panes.
			 *
			 * @param string $option     Field name.
			 * @param array  $attributes Array of attributes.
			 * @param mixed  $value      Field value.
			 * @param string $value      Placeholder text.
			 */
			do_action( 'woocommerce_growcart_admin_field_' . $option['type'], $option, $attributes, $value, $placeholder );
		}
		echo '</td></tr>';
	}

	/**
	 * Checkbox input field.
	 *
	 * @param array  $option
	 * @param array  $attributes
	 * @param mixed  $value
	 * @param string $ignored_placeholder
	 */
	protected function input_checkbox( $option, $attributes, $value, $ignored_placeholder ) {
		if ( ! isset( $option['hidden_value'] ) ) {
			$option['hidden_value'] = '0';
		}
		?>
		<label>
		<input type="hidden" name="<?php echo esc_attr( $option['name'] ); ?>" value="<?php echo esc_attr( $option['hidden_value'] ); ?>" />
		<input
			id="setting-<?php echo esc_attr( $option['name'] ); ?>"
			name="<?php echo esc_attr( $option['name'] ); ?>"
			type="checkbox"
			value="1"
			<?php
			echo implode( ' ', $attributes ) . ' '; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			checked( '1', $value );
			?>
		/> <?php echo wp_kses_post( $option['cb_label'] ); ?></label>
		<?php
		if ( ! empty( $option['desc'] ) ) {
			echo ' <p class="description">' . wp_kses_post( $option['desc'] ) . '</p>';
		}
	}

	/**
	 * Select input field.
	 *
	 * @param array  $option
	 * @param array  $attributes
	 * @param mixed  $value
	 * @param string $ignored_placeholder
	 */
	protected function input_select( $option, $attributes, $value, $ignored_placeholder ) {
		?>
		<select
			id="setting-<?php echo esc_attr( $option['name'] ); ?>"
			class="regular-text"
			name="<?php echo esc_attr( $option['name'] ); ?>"
			<?php
			echo implode( ' ', $attributes ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			?>
		>
		<?php
		foreach ( $option['options'] as $key => $name ) {
			echo '<option value="' . esc_attr( $key ) . '" ' . selected( $value, $key, false ) . '>' . esc_html( $name ) . '</option>';
		}
		?>
		</select>
		<?php

		if ( ! empty( $option['desc'] ) ) {
			echo ' <p class="description">' . wp_kses_post( $option['desc'] ) . '</p>';
		}
	}

	/**
	 * Undocumented function
	 *
	 * @param [type] $option
	 * @param [type] $attributes
	 * @param [type] $value
	 * @param [type] $ignored_placeholder
	 * @return void
	 */
	public function input_rewards( $option, $attributes, $value, $ignored_placeholder ) {
		?>
		<input
			id="setting-<?php echo esc_attr( $option['name'] ); ?>"
			type="hidden"
			name="<?php echo esc_attr( $option['name'] ); ?>"
			value="<?php echo esc_attr( $value ); ?>"
			<?php
			echo implode( ' ', $attributes ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			?>
		/>
		<?php
		echo '<div id="rewards-screen"></div>';
	}

	/**
	 * Enqueue scripts.
	 *
	 * @return void
	 */
	public function enqueue_scripts() {
		$asset_file = include WOOCOMMERCE_GROWCART_ABSPATH . 'build/rewards.asset.php';

		wp_enqueue_script(
			'woocommerce-growcart',
			plugins_url( 'build/rewards.js', WOOCOMMERCE_GROWCART_FILE ),
			$asset_file['dependencies'],
			$asset_file['version'],
			true
		);

		wp_localize_script(
			'woocommerce-growcart',
			'woocommerce_growcart',
			[
				'ajaxURL'              => admin_url( 'admin-ajax.php' ),
				'wcAjaxURL'            => WC_AJAX::get_endpoint( '%%endpoint%%' ),
				'display_mini_cart'    => true,
				'update_rewards_nonce' => wp_create_nonce( 'update-rewards' ),
				'reward_types'         => [
					[
						'label' => __( 'Free Shipping' ),
						'value' => 'free_shipping',
					],
					[
						'label' => __( 'Percentage' ),
						'value' => 'percent',
					],
					[
						'label' => __( 'Fixed' ),
						'value' => 'fixed_cart',
					],
				],
				'reward_rules'         => [
					[
						'label' => __( 'Minimum cart quantity', 'woocommerce-grow-cart' ),
						'value' => 'minimum_cart_quantity',
					],
					[
						'label' => __( 'Minimum cart amount', 'woocommerce-grow-cart' ),
						'value' => 'minimum_cart_amount',
					],
				],
			]
		);

		wp_enqueue_style(
			'woocommerce-growcart',
			plugins_url( 'build/rewards.css', WOOCOMMERCE_GROWCART_FILE ),
			[ 'wp-components' ],
			$asset_file['version']
		);
	}
}
