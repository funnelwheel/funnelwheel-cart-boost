import { v4 as uuidv4 } from "uuid";
import { useContext } from "@wordpress/element";
import { ToggleControl } from '@wordpress/components';
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
						<div className="RewardsListItem__type-label">
							Reward type
						</div>
						<div className="RewardsListItem__type-value">
							{rewardTypeLabels[activeRewardItem.type]}
						</div>

						<ToggleControl

							checked={rule.enabled}
							onChange={() => {
								updateRule({
									...rule,
									enabled: !rule.enabled,
								});
							}}
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
