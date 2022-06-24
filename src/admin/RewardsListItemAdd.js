import { v4 as uuidv4 } from "uuid";
import {
	TextControl,
	ToggleControl,
	SelectControl,
} from "@wordpress/components";
import { useState, useContext } from "@wordpress/element";
import { RewardsAdminContext } from "../context";

export default function RewardsListItemAdd() {
	const {
		rewards,
		setRewards,
		rewardRules,
	} = useContext(RewardsAdminContext);
	const [reward, setReward] = useState({
		...woocommerce_growcart.initial_reward,
		id: uuidv4()
	});

	return (
		<div className="RewardsListItemAdd">
			<button
				className="RewardsListItemAdd__back"
				type="button"
				onClick={() => setRewards({
					...rewards,
					activeScreen: "list",
				})}
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
					onChange={(type) => {
						setReward({
							...reward,
							type,
						});
					}}
				/>

				<ToggleControl
					label="Display suggested products"
					help="Display suggested products on the right side of the popup modal."
					checked={reward.display_suggested_products}
					onChange={() =>
						setReward({
							...reward,
							display_suggested_products: !reward.display_suggested_products,
						})
					}
				/>

				<ToggleControl
					label="Display coupon"
					help="Display and allow users to apply coupon codes."
					checked={reward.display_coupon}
					onChange={() =>
						setReward({
							...reward,
							display_coupon: !reward.display_coupon,
						})
					}
				/>
			</div>

			<button
				className="RewardsListItemAdd__next"
				type="button"
				onClick={() => setRewards({
					rewards: [...rewards.rewards, reward],
					activeScreen: "edit",
					currentlyEditing: reward.id
				})}
			>
				Next
			</button>
		</div>
	);
}
