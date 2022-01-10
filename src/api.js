import axios from "axios";

const instance = axios.create({
	baseURL: woocommerce_grow_cart.ajaxURL
});

export function getCartInformation() {
	return instance.get("/", {
		params: {
			action: "woocommerce_get_cart_information"
		}
	});
}
