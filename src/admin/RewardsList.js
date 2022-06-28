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

	return (
		<div className="RewardsList">
			<table className="growcart-rewards">
				<thead>
					<tr>
						<th scope="col">Status</th>
						<th scope="col">Name</th>
						<th scope="col">Rules</th>
						<th scope="col">Actions</th>
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
													? "Active"
													: "Disabled"
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
														alert("We'll disable the cart on the store.");
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
												Edit
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
												Remove
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
								Add reward
							</button>
						</td>
					</tr>
				</tfoot>
			</table>
		</div>
	);
}
