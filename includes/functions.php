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
