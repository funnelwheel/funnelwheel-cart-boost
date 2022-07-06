import { useContext } from "@wordpress/element";
import { BaseControl, TextControl, ToggleControl } from "@wordpress/components";
import { RewardsAdminContext } from "../context";
import RulesList from "./RulesList";
import Styles from "./Styles";
import Preview from "./Preview";

export default function RewardsListItem() {
	const {
		back,
		publish,
		name,
		rewardType,
		displaySuggestedProducts,
		displaySuggestedProductsHelp,
		displayCoupon,
		displayCouponHelp
	} = woocommerce_growcart.i18n;
	const {
		reward,
		updateReward,
		rewards,
		setRewards,
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
							{back}
						</button>

						<button
							disabled={reward.enabled}
							className="RewardsListItem__publish"
							type="button"
							onClick={() => setRewards({
								...rewards,
								rewards: rewards.rewards.map((_reward) => {
									if (
										_reward.id ===
										reward.id
									) {
										return {
											...reward,
											enabled: true,
										};
									}

									return {
										..._reward,
										enabled: false,
									};
								})
							})}
						>
							{publish}
						</button>
					</div>

					<div className="RewardsListItem__type">
						<TextControl
							label={name}
							value={reward.name}
							onChange={(name) => updateReward({
								...reward,
								name,
							})}
						/>

						<BaseControl label={rewardType}>
							<div>{rewardTypeLabels[reward.type]}</div>
						</BaseControl>

						<ToggleControl
							label={displaySuggestedProducts}
							help={displaySuggestedProductsHelp}
							checked={reward.display_suggested_products}
							onChange={() =>
								updateReward({
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
