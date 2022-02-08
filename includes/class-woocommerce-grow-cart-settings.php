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
}

return new WooCommerce_Grow_Cart_Settings();
