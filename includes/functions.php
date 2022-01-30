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
			$discount_amount_html = __( 'Free shipping coupon', 'woocommerce' );
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
