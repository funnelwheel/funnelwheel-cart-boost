import axios from "axios";

const instance = axios.create({
	baseURL: woocommerce_growcart.ajaxURL,
});

export function updateAdminRewards({ security, rewards }) {
	return instance.post(
		"/?action=growcart_update_admin_rewards",
		new URLSearchParams({ security, rewards })
	);
}
