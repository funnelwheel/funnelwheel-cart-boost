import { v4 as uuidv4 } from "uuid";
import { TextControl, SelectControl } from "@wordpress/components";
import { useState } from "@wordpress/element";

export default function RewardsListItemAdd({ setActiveScreen }) {
	const [reward, setReward] = useState({
		id: uuidv4(),
		name: "Free Shipping",
		type: "free_shipping",
		rule: "minimum_cart_contents",
		value: 0,
		minimum_cart_contents: 0,
		minimum_cart_amount: 0,
	});

	return (
		<div className="RewardsListItemAdd">
			<button
				className="RewardsListItem__back"
				type="button"
				onClick={() => setActiveScreen("list")}
			>
				Back
			</button>

			<div className="RewardsListItemAdd__body">
				<TextControl
					label="Name"
					value={reward.name}
					onChange={(name) => {
						setReward({
							...reward,
							name,
						});
					}}
				/>

				<SelectControl
                    label="Type"
					value={reward.type}
					options={woocommerce_growcart_rewards.reward_types}
					onChange={(type) => {
						setReward({
							...reward,
							type,
						});
					}}
				/>
			</div>
		</div>
	);
}
