import axios from "axios";

const instance = axios.create({
	baseURL: woocommerce_growcart.ajaxURL,
});

export function getCartInformation() {
	return instance.get("/?action=growcart_get_cart_information");
}

export function getSuggestedProducts() {
	return instance.get("/?action=growcart_get_suggested_products");
}

export function getRewards() {
	return instance.get("/?action=growcart_get_rewards");
}

export function addToCart({ product_id, quantity }) {
	return instance.post(
		"/?action=woocommerce_add_to_cart",
		new URLSearchParams({ product_id, quantity })
	);
}

export function updateCartItem({ cart_key, quantity }) {
	return instance.post(
		"/?action=growcart_update_cart_item",
		new URLSearchParams({ cart_key, quantity })
	);
}

export function applyCoupon({ security, coupon_code }) {
	return axios.post(
		woocommerce_growcart.wcAjaxURL
			.toString()
			.replace("%%endpoint%%", "apply_coupon"),
		new URLSearchParams({ security, coupon_code })
	);
}

export function removeCoupon({ security, coupon }) {
	return axios.post(
		woocommerce_growcart.wcAjaxURL
			.toString()
			.replace("%%endpoint%%", "remove_coupon"),
		new URLSearchParams({ security, coupon })
	);
}
