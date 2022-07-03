<?php

namespace Upnrunn;

// Exit if accessed directly.
defined('ABSPATH') || exit;

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
		if (is_null(self::$instance)) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Start up.
	 */
	public function __construct() {
		$this->settings_group = 'woocommerce_growcart';
		$this->settings = [
			'rewards' => [
				__('Rewards', 'woocommerce-grow-cart'),
				[
					[
						'name'       => 'woocommerce_growcart_rewards',
						'std'        => json_encode(woocommerce_growcart()->rewards->get_default_rewards()),
						'desc'       => '',
						'type'       => 'rewards',
						'attributes' => [],
					],
				],
			],
		];

		add_action('admin_init', [$this, 'register_settings']);
		add_action('admin_menu', array($this, 'add_plugin_pages'));
		add_action('admin_enqueue_scripts', [$this, 'enqueue_scripts']);
	}

	/**
	 * Register and add settings
	 */
	public function register_settings() {
		foreach ($this->settings as $section) {
			foreach ($section[1] as $option) {
				if (isset($option['std'])) {
					add_option($option['name'], $option['std']);
				}
				register_setting($this->settings_group, $option['name']);
			}
		}
	}

	/**
	 * Add plugin pages.
	 *
	 * @return void
	 */
	public function add_plugin_pages() {
		add_menu_page(
			__('GrowCart Settings', 'woocommerce-grow-cart'),
			__('GrowCart', 'woocommerce-grow-cart'),
			'manage_options',
			'wc-growcart',
			array($this, 'menu_page_html'),
			'dashicons-cart',
			58
		);

		add_submenu_page(
			'wc-growcart',
			__('GrowCart License', 'textdomain'),
			__('License', 'textdomain'),
			'manage_options',
			'books-shortcode-ref',
			array($this, 'license_page_html'),
		);
	}

	/**
	 * Options page callback.
	 */
	public function menu_page_html() {
		?>
		<div class="wrap woocommerce-growcart-settings-wrap">
			<h1><?php echo esc_html(get_admin_page_title()); ?></h1>
			<?php settings_fields($this->settings_group); ?>

			<?php
			foreach ($this->settings as $key => $section) {
				$section_args = isset($section[2]) ? (array) $section[2] : [];
				echo '<div id="settings-' . esc_attr(sanitize_title($key)) . '" class="settings_panel">';
				if (!empty($section_args['before'])) {
					echo '<p class="before-settings">' . wp_kses_post($section_args['before']) . '</p>';
				}
				echo '<table class="form-table settings parent-settings">';

				foreach ($section[1] as $option) {
					$value = get_option($option['name']);
					$this->output_field($option, $value);
				}

				echo '</table>';
				if (!empty($section_args['after'])) {
					echo '<p class="after-settings">' . wp_kses_post($section_args['after']) . '</p>';
				}
				echo '</div>';
			}
			?>
		</div>
	<?php
	}

	/**
	 * edd_growcart_license_key
	 *
	 * @return void
	 */
	public function license_page_html() {
		$license = get_option('edd_growcart_license_key');
		$status  = get_option('edd_growcart_license_status');
		?>
		<div class="wrap">
			<h2><?php _e('Plugin License Options'); ?></h2>
			<form method="post" action="options.php">

				<?php settings_fields('edd_sample_license'); ?>

				<table class="form-table">
					<tbody>
						<tr valign="top">
							<th scope="row" valign="top">
								<?php _e('License Key'); ?>
							</th>
							<td>
								<input id="edd_growcart_license_key" name="edd_growcart_license_key" type="text" class="regular-text" value="<?php esc_attr_e($license); ?>" />
								<label class="description" for="edd_growcart_license_key"><?php _e('Enter your license key'); ?></label>
							</td>
						</tr>
						<?php if (false !== $license) { ?>
							<tr valign="top">
								<th scope="row" valign="top">
									<?php _e('Activate License'); ?>
								</th>
								<td>
									<?php if ($status !== false && $status == 'valid') { ?>
										<span style="color:green;"><?php _e('active'); ?></span>
										<?php wp_nonce_field('edd_sample_nonce', 'edd_sample_nonce'); ?>
										<input type="submit" class="button-secondary" name="edd_license_deactivate" value="<?php _e('Deactivate License'); ?>" />
									<?php } else {
										wp_nonce_field('edd_sample_nonce', 'edd_sample_nonce'); ?>
										<input type="submit" class="button-secondary" name="edd_license_activate" value="<?php _e('Activate License'); ?>" />
									<?php } ?>
								</td>
							</tr>
						<?php } ?>
					</tbody>
				</table>
				<?php submit_button(); ?>
			</form>
		<?php
	}

	/**
	 * Outputs the field row.
	 *
	 * @param array $option
	 * @param mixed $value
	 */
	protected function output_field($option, $value) {
		$placeholder    = (!empty($option['placeholder'])) ? 'placeholder="' . esc_attr($option['placeholder']) . '"' : '';
		$class          = !empty($option['class']) ? $option['class'] : '';
		$option['type'] = !empty($option['type']) ? $option['type'] : 'text';
		$attributes     = [];
		if (!empty($option['attributes']) && is_array($option['attributes'])) {
			foreach ($option['attributes'] as $attribute_name => $attribute_value) {
				$attributes[] = esc_attr($attribute_name) . '="' . esc_attr($attribute_value) . '"';
			}
		}

		echo '<tr valign="top" class="' . esc_attr($class) . '">';

		if (!empty($option['label'])) {
			echo '<th scope="row"><label for="setting-' . esc_attr($option['name']) . '">' . esc_html($option['label']) . '</a></th><td>';
		} else {
			echo '<td colspan="2">';
		}

		$method_name = 'input_' . $option['type'];
		if (method_exists($this, $method_name)) {
			$this->$method_name($option, $attributes, $value, $placeholder);
		} else {
			/**
			 * Allows for custom fields in admin setting panes.
			 *
			 * @param string $option     Field name.
			 * @param array  $attributes Array of attributes.
			 * @param mixed  $value      Field value.
			 * @param string $value      Placeholder text.
			 */
			do_action('woocommerce_growcart_admin_field_' . $option['type'], $option, $attributes, $value, $placeholder);
		}
		echo '</td></tr>';
	}

	/**
	 * Output rewards input field.
	 *
	 * @param [type] $option
	 * @param [type] $attributes
	 * @param [type] $value
	 * @param [type] $ignored_placeholder
	 * @return void
	 */
	public function input_rewards($option, $attributes, $value, $ignored_placeholder) {
		?>
			<input id="setting-<?php echo esc_attr($option['name']); ?>" type="hidden" name="<?php echo esc_attr($option['name']); ?>" value="<?php echo esc_attr($value); ?>" <?php
																																														echo implode(' ', $attributes); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
																																														?> />
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
			plugins_url('build/rewards.js', WOOCOMMERCE_GROWCART_FILE),
			$asset_file['dependencies'],
			$asset_file['version'],
			true
		);

		wp_localize_script(
			'woocommerce-growcart',
			'woocommerce_growcart',
			[
				'ajaxURL'              => admin_url('admin-ajax.php'),
				'wcAjaxURL'            => WC_AJAX::get_endpoint('%%endpoint%%'),
				'display_mini_cart'    => true,
				'update_rewards_nonce' => wp_create_nonce('update-rewards'),
				'reward_types'         => get_reward_types(),
				'reward_rules'         => get_reward_rules(),
				'currency_symbol'      => get_woocommerce_currency_symbol(),
				'initial_reward'       => [
					'name'                       => 'Cart threshold incentives',
					'type'                       => 'minimum_cart_quantity',
					'value'                      => 0,
					'minimum_cart_quantity'      => 0,
					'minimum_cart_amount'        => 0,
					'rules'                      => [],
					'enabled'                    => false,
					'display_suggested_products' => true,
					'display_coupon'             => true,
					'styles'                     => [
						'headerTextColor'         => '#ffffff',
						'headerBackground'        => '#343a40',
						'fontSize'                => '14px',
						'spacing'                 => [
							'top'    => '24px',
							'right'  => '24px',
							'bottom' => '24px',
							'left'   => '24px',
						],
						'textColor'               => '#ffffff',
						'backgroundColor'         => '#343a40',
						'progressColor'           => '#198754',
						'progressBackgroundColor' => '#495057',
						'iconColor'               => '#ffffff',
						'iconBackground'          => '#495057',
						'activeIconColor'         => '#ffffff',
						'activeIconBackground'    => '#198754',
					],
				],
			]
		);

		wp_enqueue_style(
			'woocommerce-growcart',
			plugins_url('build/rewards.css', WOOCOMMERCE_GROWCART_FILE),
			['wp-components'],
			$asset_file['version']
		);
	}
}
