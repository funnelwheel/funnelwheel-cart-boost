import axios from "axios";

const instance = axios.create({
	baseURL: woocommerce_growcart.ajaxURL,
});

export function getAdminRewards() {
	return instance.get("/?action=growcart_get_admin_rewards");
}

export function updateAdminRewards({ security, rewards }) {
	return instance.post(
		"/?action=growcart_update_admin_rewards",
		new URLSearchParams({ security, rewards })
	);
}
