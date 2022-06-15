import { useContext } from "@wordpress/element";
import {
	ToggleControl,
	__experimentalConfirmDialog as ConfirmDialog,
} from "@wordpress/components";
import { RewardsAdminContext } from "../context";

export default function RewardsList() {
	const {
		rewards,
		setCurrentlyEditing,
		setActiveScreen,
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
				{rewards && rewards.length ? (
					<tbody>
						{rewards.map((reward) => {
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
											onChange={() => {
												setRewards(
													rewards.map((_reward) => {
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
												);
											}}
										/>
									</td>
									<td>{reward.name}</td>
									<td>
										{reward.rules.map((rule) => (
											<span className="badge">
												{rule.name}
											</span>
										))}
									</td>
									<td>
										<>
											<a
												className="growcart-reward-edit"
												href="#"
												onClick={() => {
													setCurrentlyEditing(
														reward.id
													);
													setActiveScreen("edit");
												}}
											>
												Edit
											</a>
											{" | "}
											<a
												href="#"
												className="growcart-reward-delete"
												onClick={() =>
													setRewards(
														rewards.filter(
															(_reward) =>
																_reward.id !==
																reward.id
														)
													)
												}
											>
												Remove
											</a>
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
								onClick={() => setActiveScreen("add")}
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
