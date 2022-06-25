import { useContext } from "@wordpress/element";
import { BaseControl, TextControl, ToggleControl } from "@wordpress/components";
import { RewardsAdminContext } from "../context";
import RulesList from "./RulesList";
import Styles from "./Styles";
import Preview from "./Preview";

export default function RewardsListItem() {
	const {
		rewards,
		setRewards,
		reward,
		updateReward,
		rewardTypeLabels,
	} = useContext(RewardsAdminContext);

	return (
		<div className="RewardsListItem">
			<div className="RewardsListItem__row">
				<div className="RewardsListItem__col-rules">
					<div className="RewardsListItem__action-buttons">
						<button
							className="RewardsListItem__back"
							type="button"
							onClick={() => setRewards({
								...rewards,
								activeScreen: "list",
								currentlyEditing: null,
							})}
						>
							Back
						</button>

						<button
							disabled={reward.enabled}
							className="RewardsListItem__publish"
							type="button"
							onClick={() => updateReward({
								...reward,
								enabled: true,
							})}
						>
							Publish
						</button>
					</div>

					<div className="RewardsListItem__type">
						<TextControl
							label="Name"
							value={reward.name}
							onChange={(name) => updateReward({
								...reward,
								name,
							})}
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

					<RulesList />
				</div>

				<div className="RewardsListItem__col-preview">
					<Preview />
					<Styles />
				</div>
			</div>
		</div>
	);
}
