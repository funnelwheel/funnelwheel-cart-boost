<?php
namespace Upnrunn;

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

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
			$discount_amount_html = __( 'Free shipping coupon', 'woocommerce-grow-cart' );
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
 * Undocumented function
 *
 * @return void
 */
function get_reward_types() {
	return [
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
	];
}

/**
 * Undocumented function
 *
 * @return void
 */
function get_reward_rules() {
	return [
		[
			'label' => __( 'Minimum cart quantity', 'woocommerce-grow-cart' ),
			'value' => 'minimum_cart_quantity',
		],
		[
			'label' => __( 'Minimum cart amount', 'woocommerce-grow-cart' ),
			'value' => 'minimum_cart_amount',
		],
	];
}
