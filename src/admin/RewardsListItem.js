import { v4 as uuidv4 } from "uuid";
import { useContext } from "@wordpress/element";
import { TextControl, ToggleControl } from "@wordpress/components";
import { RewardsAdminContext } from "../context";
import RulesList from "./RulesList";

export default function RewardsListItem() {
	const {
		activeRewardItem,
		updateReward,
		rewardTypeLabels,
		setActiveScreen,
		setCurrentlyEditing,
	} = useContext(RewardsAdminContext);

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
							value={activeRewardItem.name}
							onChange={(name) => {
								updateReward({
									...activeRewardItem,
									name,
								});
							}}
						/>

						<div className="RewardsListItem__type-label">
							Reward type
						</div>
						<div className="RewardsListItem__type-value">
							{rewardTypeLabels[activeRewardItem.type]}
						</div>
						
						<ToggleControl
							label="Display suggested products"
							help="Display suggested products on the right side of the popup modal."
							checked={
								activeRewardItem.display_suggested_products
							}
							onChange={() =>
								updateReward({
									...activeRewardItem,
									display_suggested_products: !activeRewardItem.display_suggested_products,
								})
							}
						/>

						<ToggleControl
							label="Display coupon"
							help="Display and allow users to apply coupon codes."
							checked={activeRewardItem.display_coupon}
							onChange={() =>
								updateReward({
									...activeRewardItem,
									display_coupon: !activeRewardItem.display_coupon,
								})
							}
						/>
					</div>

					<RulesList
						{...{
							reward: activeRewardItem,
							addRule: () =>
								updateReward({
									...activeRewardItem,
									rules: [
										...activeRewardItem.rules,
										{
											id: uuidv4(),
											name: "20 USD",
											minimum_cart_amount: 0,
											value: 0,
										},
									],
								}),
							updateRule: () => {},
							removeRule: (ruleId) => {
								updateReward({
									...activeRewardItem,
									rules: activeRewardItem.rules.filter(
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
