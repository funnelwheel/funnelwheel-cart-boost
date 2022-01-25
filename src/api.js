import axios from "axios";

const instance = axios.create({
	baseURL: woocommerce_grow_cart.ajaxURL,
});

export function getCartInformation() {
	return instance.get("/?action=growcart_get_cart_information");
}

export function updateCartItem({ cart_key, quantity }) {
	return instance.post(
		"/?action=growcart_update_cart_item",
		new URLSearchParams({ cart_key, quantity })
	);
}

export function getSuggestedProducts() {
	return instance.get("/?action=growcart_get_suggested_products");
}
