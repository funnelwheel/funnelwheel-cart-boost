import { __ } from '@wordpress/i18n';
import { useContext } from "@wordpress/element";
import { BaseControl, TextControl, ToggleControl } from "@wordpress/components";
import { RewardsAdminContext } from "../context";
import RulesList from "./RulesList";
import Styles from "./Styles";
import Preview from "./Preview";

export default function RewardsListItem() {
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
							{__('Back')}
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
							{__('Publish')}
						</button>
					</div>

					<div className="RewardsListItem__type">
						<TextControl
							label={__('Name')}
							value={reward.name}
							onChange={(name) => updateReward({
								...reward,
								name,
							})}
						/>

						<BaseControl label={__( 'Reward type' )}>
							<div>{rewardTypeLabels[reward.type]}</div>
						</BaseControl>

						<ToggleControl
							label={__( 'Display suggested products' )}
							help={__( 'Display suggested products on the right side of the popup modal.' )}
							checked={reward.display_suggested_products}
							onChange={() =>
								updateReward({
									...reward,
									display_suggested_products: !reward.display_suggested_products,
								})
							}
						/>

						<ToggleControl
							label={__( 'Display coupon' )}
							help={__( 'Display and allow users to apply coupon codes.' )}
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
