import { useContext } from "@wordpress/element";
import {
	ToggleControl,
	__experimentalConfirmDialog as ConfirmDialog,
} from "@wordpress/components";
import { RewardsAdminContext } from "../context";
import { replaceTags } from "../utilities";

export default function RewardsList() {
	const {
		status,
		name,
		rules,
		actions,
		active,
		disabled,
		alertString,
		edit,
		remove,
		addReward
	} = woocommerce_growcart.i18n;
	const {
		rewards,
		setRewards,
	} = useContext(RewardsAdminContext);

	return (
		<div className="RewardsList">
			<table className="growcart-rewards">
				<thead>
					<tr>
						<th scope="col">{status}</th>
						<th scope="col">{name}</th>
						<th scope="col">{rules}</th>
						<th scope="col">{actions}</th>
					</tr>
				</thead>
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
													? active
													: disabled
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
														alert(alertString);
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
												{edit}
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
												{remove}
											</button>
										</>
									</td>
								</tr>
							);
						})}
					</tbody>
				) : null}
				<tfoot>
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
								{addReward}
							</button>
						</td>
					</tr>
				</tfoot>
			</table>
		</div>
	);
}
