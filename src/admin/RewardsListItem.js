import { v4 as uuidv4 } from "uuid";
import { useContext } from "@wordpress/element";
import { BaseControl, TextControl, ToggleControl } from "@wordpress/components";
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

						<BaseControl id="textarea-1" label="Reward type">
							<div>{rewardTypeLabels[activeRewardItem.type]}</div>
						</BaseControl>

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
											name: "Free Fhipping",
											type: "free_shipping",
											value: 0,
											minimum_cart_quantity: 0,
											minimum_cart_amount: 0,
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
