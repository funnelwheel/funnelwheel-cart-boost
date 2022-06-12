import { v4 as uuidv4 } from "uuid";
import { useContext } from "@wordpress/element";
import { BaseControl, TextControl, ToggleControl } from "@wordpress/components";
import { RewardsAdminContext } from "../context";
import RulesList from "./RulesList";

export default function RewardsListItem() {
	const {
		reward,
		updateReward,
		rewardTypeLabels,
		setActiveScreen,
		setCurrentlyEditing,
	} = useContext(RewardsAdminContext);

	function getRuleHint(rewardType) {
		return "minimum_cart_quantity" === rewardType
			? "**Add** {{quantity}} more to get {{name}}"
			: "**Spend** {{amount}} more to get {{name}}";
	}

	return (
		<div className="RewardsListItem">
			<button
				className="RewardsListItem__back"
				type="button"
				onClick={() => {
					setActiveScreen("list");
					setCurrentlyEditing(null);
				}}
			>
				Back
			</button>

			<div className="RewardsListItem__row">
				<div className="RewardsListItem__col-rules">
					<div className="RewardsListItem__type">
						<TextControl
							label="Name"
							value={reward.name}
							onChange={(name) => {
								updateReward({
									...reward,
									name,
								});
							}}
						/>

						<BaseControl label="Reward type">
							<div>{rewardTypeLabels[reward.type]}</div>
						</BaseControl>

						<ToggleControl
							label="Display suggested products"
							help="Display suggested products on the right side of the popup modal."
							checked={reward.display_suggested_products}
							onChange={() =>
								updateReward({
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
								updateReward({
									...reward,
									display_coupon: !reward.display_coupon,
								})
							}
						/>
					</div>

					<RulesList
						{...{
							reward: reward,
							addRule: () =>
								updateReward({
									...reward,
									rules: [
										...reward.rules,
										{
											id: uuidv4(),
											name: "Free Shipping",
											type: "free_shipping",
											value: 0,
											minimum_cart_quantity: 1,
											minimum_cart_amount: 1,
											hint: getRuleHint(reward.type),
											enabled: true,
										},
									],
								}),
							updateRule: () => {},
							removeRule: (ruleId) => {
								updateReward({
									...reward,
									rules: reward.rules.filter(
										(rule) => rule.id !== ruleId
									),
								});
							},
						}}
					/>
				</div>

				<div className="RewardsListItem__col-preview">Preview</div>
			</div>
		</div>
	);
}
