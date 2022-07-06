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
		back,
		displaySuggestedProducts,
		displaySuggestedProductsHelp,
		displayCoupon,
		displayCouponHelp,
		next,
	} = woocommerce_growcart.i18n;
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
				{back}
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
					label={displaySuggestedProducts}
					help={displaySuggestedProductsHelp}
					checked={reward.display_suggested_products}
					onChange={() =>
						setReward({
							...reward,
							display_suggested_products: !reward.display_suggested_products,
						})
					}
				/>

				<ToggleControl
					label={displayCoupon}
					help={displayCouponHelp}
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
				{next}
			</button>
		</div>
	);
}
