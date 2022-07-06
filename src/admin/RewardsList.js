import { __ } from '@wordpress/i18n';
import { useContext } from "@wordpress/element";
import {
	ToggleControl,
	__experimentalConfirmDialog as ConfirmDialog,
} from "@wordpress/components";
import { RewardsAdminContext } from "../context";
import { replaceTags } from "../utilities";

export default function RewardsList() {
	const {
		rewards,
		setRewards,
	} = useContext(RewardsAdminContext);

	const tHead = <thead>
		<tr>
			<th scope="col">{__('Status')}</th>
			<th scope="col">{__('Name')}</th>
			<th scope="col">{__('Rules')}</th>
			<th scope="col">{__('Actions')}</th>
		</tr>
	</thead>;

	const tFoot = <tfoot>
		<tr>
			<td colSpan="5">
				<button
					type="button"
					className="RewardsList__add"
					onClick={() => setRewards({
						...rewards,
						activeScreen: "add",
					})}
				>
					{__( 'Add reward' )}
				</button>
			</td>
		</tr>
	</tfoot>

	return (
		<div className="RewardsList">
			<table className="growcart-rewards">
				{tHead}
				{rewards.rewards && rewards.rewards.length ? (
					<tbody>
						{rewards.rewards.map((reward) => {
							return (
								<tr key={reward.id}>
									<td>
										<ToggleControl
											checked={reward.enabled}
											label={
												reward.enabled
													? __( 'Active' )
													: __( 'Disabled' )
											}
											onChange={() => setRewards(
												{
													...rewards,
													rewards: rewards.rewards.map((_reward) => {
														if (
															_reward.id ===
															reward.id
														) {
															return {
																...reward,
																enabled: !reward.enabled,
															};
														}

														return {
															..._reward,
															enabled: false,
														};
													})
												}
											)}
										/>
									</td>
									<td>{reward.name}</td>
									<td>
										{reward.rules.map((rule, index) => (
											<span className="badge" key={index}>
												{replaceTags(rule.name, rule.type, rule.value)}
											</span>
										))}
									</td>
									<td>
										<>
											<button
												type="button"
												className="growcart-reward-edit"
												onClick={() => {
													if (reward.enabled) {
														alert(__( "We'll disable the cart on the store." ));
													}

													setRewards({
														...rewards,
														rewards: rewards.rewards.map(
															(_reward) =>
																_reward.id ===
																	reward.id ? { ..._reward, enabled: false } : _reward
														),
														activeScreen: "edit",
														currentlyEditing: reward.id,
													})
												}}
											>
												{__( 'Edit' )}
											</button>
											{" | "}
											<button
												type="button"
												className="growcart-reward-delete"
												onClick={() =>
													setRewards(
														{
															...rewards,
															rewards: rewards.rewards.filter(
																(_reward) =>
																	_reward.id !==
																	reward.id
															)
														}
													)
												}
											>
												{__( 'Remove' )}
											</button>
										</>
									</td>
								</tr>
							);
						})}
					</tbody>
				) : null}
				{tFoot}
			</table>
		</div>
	);
}
