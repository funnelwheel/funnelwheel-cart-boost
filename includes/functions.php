<?php
namespace Upnrunn;

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

/**
 * Get a list of cart items.
 *
 * @return void
 */
function get_cart_items() {
	if ( WC()->cart->is_empty() ) {
		return [];
	}

	$items = [];
	foreach ( array_reverse( WC()->cart->get_cart() ) as $cart_item_key => $cart_item ) {
		$_product = $cart_item['data'];

		$items[] = [
			'key'                   => $cart_item_key,
			'quantity'              => $cart_item['quantity'],
			'product_id'            => $cart_item['product_id'],
			'product_title'         => $_product->get_title(),
			'product_permalink'     => $_product->is_visible() ? $_product->get_permalink( $cart_item ) : '',
			'product_thumbnail'     => $_product->get_image(),
			'product_price'         => WC()->cart->get_product_price( $_product ),
			'product_subtotal'      => WC()->cart->get_product_subtotal( $_product, $cart_item['quantity'] ),
			'min_purchase_quantity' => $_product->get_min_purchase_quantity(),
			'max_purchase_quantity' => $_product->get_max_purchase_quantity(),
		];
	}

	return $items;
}

/**
 * Get a list of cart coupons.
 *
 * @return void
 */
function get_cart_coupons() {
	$coupons = [];

	foreach ( WC()->cart->get_coupons() as $code => $coupon ) {
		if ( is_string( $coupon ) ) {
			$coupon = new WC_Coupon( $coupon );
		}

		$discount_amount_html = '';

		if ( $amount = WC()->cart->get_coupon_discount_amount( $coupon->get_code(), WC()->cart->display_cart_ex_tax ) ) {
			$discount_amount_html = '-' . wc_price( $amount );
		} elseif ( $coupon->get_free_shipping() ) {
			$discount_amount_html = __( 'Free shipping coupon', 'funnelwheel-cart-boost' );
		}

		$discount_amount_html = apply_filters( 'woocommerce_growcart_coupon_discount_amount_html', $discount_amount_html, $coupon );
		$coupons[]            = [
			'code'        => $coupon->get_code(),
			'label'       => wc_cart_totals_coupon_label( $coupon, false ),
			'coupon_html' => $discount_amount_html,
		];
	}

	return $coupons;
}

/**
 * Get SVG icon
 *
 * @param string $name
 * @return void
 */
function get_icon( $name = '' ) {
	switch ( $name ) {
		case 'truck':
			$path = 'M368 0C394.5 0 416 21.49 416 48V96H466.7C483.7 96 499.1 102.7 512 114.7L589.3 192C601.3 204 608 220.3 608 237.3V352C625.7 352 640 366.3 640 384C640 401.7 625.7 416 608 416H576C576 469 533 512 480 512C426.1 512 384 469 384 416H256C256 469 213 512 160 512C106.1 512 64 469 64 416H48C21.49 416 0 394.5 0 368V48C0 21.49 21.49 0 48 0H368zM416 160V256H544V237.3L466.7 160H416zM160 368C133.5 368 112 389.5 112 416C112 442.5 133.5 464 160 464C186.5 464 208 442.5 208 416C208 389.5 186.5 368 160 368zM480 464C506.5 464 528 442.5 528 416C528 389.5 506.5 368 480 368C453.5 368 432 389.5 432 416C432 442.5 453.5 464 480 464z';
			break;

		default:
			$path = '';
			break;
	}

	if ( '' === $path ) {
		return '';
	}

	return sprintf(
		'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" fill="currentColor">
			<path d="%s"/>
		</svg>',
		$path
	);
}

/**
 * Get a list of reward types.
 *
 * @return void
 */
function get_reward_types() {
	return [
		[
			'label' => __( 'Free Shipping', 'funnelwheel-cart-boost' ),
			'value' => 'free_shipping',
		],
		[
			'label' => __( 'Percentage discount', 'funnelwheel-cart-boost' ),
			'value' => 'percent',
		],
		[
			'label' => __( 'Fixed cart discount', 'funnelwheel-cart-boost' ),
			'value' => 'fixed_cart',
		],
		[
			'label' => __( 'Gift Card', 'funnelwheel-cart-boost' ),
			'value' => 'gift',
		],
	];
}

/**
 * Get a list of reward rules.
 *
 * @return void
 */
function get_reward_rules() {
	return [
		[
			'label' => __( 'Minimum cart quantity', 'funnelwheel-cart-boost' ),
			'value' => 'minimum_cart_quantity',
		],
		[
			'label' => __( 'Minimum cart amount', 'funnelwheel-cart-boost' ),
			'value' => 'minimum_cart_amount',
		],
	];
}

/**
 * Get a list of available rewards when activating the plugin for the first time.
 *
 * @return void
 */
function get_default_rewards() {
	return [
		[
			'name'                       => 'Cart threshold incentives (by quantity)',
			'type'                       => 'minimum_cart_quantity',
			'value'                      => 0,
			'minimum_cart_quantity'      => 0,
			'minimum_cart_amount'        => 0,
			'rules'                      => [
				[
					'id'                    => '3e6f0d87-bbd1-49f4-a0c0-7f58b665c12a',
					'name'                  => 'Rule 1',
					'type'                  => 'percent',
					'value'                 => 1,
					'minimum_cart_quantity' => 9999,
					'minimum_cart_amount'   => 9999,
					'hint'                  => '**Add** {{quantity}} more to get {{name}}',
					'enabled'               => true,
				],
				[
					'id'                    => 'bfdfa1cb-4b94-4133-a4e4-f4d98fe7f545',
					'name'                  => 'Rule 2',
					'type'                  => 'percent',
					'value'                 => 1,
					'minimum_cart_quantity' => 9999,
					'minimum_cart_amount'   => 9999,
					'hint'                  => '**Add** {{quantity}} more to get {{name}}',
					'enabled'               => true,
				],
			],
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
				'textcolor'               => '#ffffff',
				'backgroundColor'         => '#343a40',
				'progressColor'           => '#198754',
				'progressBackgroundColor' => '#495057',
				'iconColor'               => '#ffffff',
				'iconBackground'          => '#495057',
				'activeIconColor'         => '#ffffff',
				'activeIconBackground'    => '#198754',
			],
			'id'                         => '4d36c7fa-93ce-4384-aa86-b6575b85f9ba',
		],
		[
			'name'                       => 'Cart threshold incentives (by amount)',
			'type'                       => 'minimum_cart_amount',
			'value'                      => 0,
			'minimum_cart_quantity'      => 0,
			'minimum_cart_amount'        => 0,
			'rules'                      => [
				[
					'id'                    => 'fc6c8709-8434-4395-96ba-73587910c4db',
					'name'                  => 'Rule 1',
					'type'                  => 'percent',
					'value'                 => 1,
					'minimum_cart_quantity' => 9999,
					'minimum_cart_amount'   => 9999,
					'hint'                  => '**Spend** {{amount}}{{currency}} more to get {{name}}',
					'enabled'               => true,
				],
				[
					'id'                    => '5e357180-9180-4c4b-b575-e5305b840a2f',
					'name'                  => 'Rule 2',
					'type'                  => 'percent',
					'value'                 => 1,
					'minimum_cart_quantity' => 9999,
					'minimum_cart_amount'   => 9999,
					'hint'                  => '**Spend** {{amount}}{{currency}} more to get {{name}}',
					'enabled'               => true,
				],
			],
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
				'textcolor'               => '#ffffff',
				'backgroundColor'         => '#343a40',
				'progressColor'           => '#198754',
				'progressBackgroundColor' => '#495057',
				'iconColor'               => '#ffffff',
				'iconBackground'          => '#495057',
				'activeIconColor'         => '#ffffff',
				'activeIconBackground'    => '#198754',
			],
			'id'                         => '466641db-218d-4ab7-8636-96e9267271a5',
		],
	];
}
