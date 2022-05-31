import { v4 as uuidv4 } from "uuid";
import { TextControl, SelectControl } from "@wordpress/components";
import { useState, useContext } from "@wordpress/element";
import { RewardsAdminContext } from "../context";

export default function RewardsListItemAdd({ setActiveScreen }) {
	const { rewardRules } = useContext(RewardsAdminContext);
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
				className="RewardsListItemAdd__back"
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
					options={rewardRules}
					onChange={(rule) => {
						setReward({
							...reward,
							rule,
						});
					}}
				/>
			</div>

			<button
				className="RewardsListItemAdd__next"
				type="button"
				onClick={() => setActiveScreen("list")}
			>
				Next
			</button>
		</div>
	);
}
