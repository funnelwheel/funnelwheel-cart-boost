import {
	TextControl,
	SelectControl,
	__experimentalNumberControl as NumberControl,
} from "@wordpress/components";
import { useState } from "@wordpress/element";

export default function RewardsAdminScreen() {
	const [reward, setReward] = useState({
		name: "",
		type: "PERCENTAGE",
		value: "",
		minimum_cart_contents: 0,
	});

	return (
		<div className="RewardsAdminScreen">
			<h2 className="wc-rewards-heading">
				Shipping zones{" "}
				<a
					href="http://localhost/wp/woocommerce/wp-admin/admin.php?page=wc-settings&amp;tab=shipping&amp;zone_id=new"
					class="page-title-action"
				>
					Add shipping zone
				</a>
			</h2>

			<TextControl
				label="Name"
				value={reward.name}
				onChange={(name) =>
					setReward({
						...reward,
						name,
					})
				}
			/>

			<SelectControl
				label="Type"
				value={reward.type}
				options={[
					{ label: "FREE SHIPPING", value: "FREE_SHIPPING" },
					{ label: "PERCENTAGE", value: "PERCENTAGE" },
					{ label: "FIXED", value: "FIXED" },
					{ label: "GIFTCARD", value: "GIFTCARD" },
				]}
				onChange={(type) =>
					setReward({
						...reward,
						type,
					})
				}
			/>

			<TextControl
				label="Value"
				value={reward.value}
				onChange={(value) =>
					setReward({
						...reward,
						value,
					})
				}
			/>

			<NumberControl
				label="Minimum cart contents"
				isShiftStepEnabled={true}
				onChange={(minimum_cart_contents) =>
					setReward({
						...reward,
						minimum_cart_contents,
					})
				}
				shiftStep={10}
				value={reward.minimum_cart_contents}
			/>
		</div>
	);
}
