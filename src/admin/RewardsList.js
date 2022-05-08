import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "@wordpress/element";
import {
	TextControl,
	SelectControl,
	__experimentalNumberControl as NumberControl,
} from "@wordpress/components";

export default function RewardsList() {
	const [rewards, setRewards] = useState([]);

	function updateReward(reward) {
		setRewards(
			rewards.map((_reward) => {
				if (_reward.id === reward.id) {
					return reward;
				}

				return _reward;
			})
		);
	}

	useEffect(() => {
		const rewards = JSON.parse(
			document.getElementById("setting-woocommerce_growcart_rewards")
				.value
		);
		setRewards(rewards);
	}, []);

	useEffect(() => {
		document.getElementById(
			"setting-woocommerce_growcart_rewards"
		).value = JSON.stringify(rewards);
	}, [rewards]);

	const rewardRuleLabels = woocommerce_growcart_rewards.reward_rules.reduce(
		(previousValue, currentValue) => {
			previousValue[currentValue.value] = currentValue.label;
			return previousValue;
		},
		{}
	);

	const rewardTypeLabels = woocommerce_growcart_rewards.reward_types.reduce(
		(previousValue, currentValue) => {
			previousValue[currentValue.value] = currentValue.label;
			return previousValue;
		},
		{}
	);

	return (
		<div className="RewardsList">
			<table className="growcart-rewards widefat">
				<thead>
					<tr>
						<th scope="col">Name</th>
						<th scope="col">Type</th>
						<th scope="col">Value</th>
						<th scope="col">Rule</th>
						<th scope="col">Minimum cart contents/amount</th>
					</tr>
				</thead>
				{rewards && rewards.length ? (
					<tbody>
						{rewards.map((reward) => {
							return (
								<tr>
									<td>
										{activeReward &&
										activeReward.id === reward.id ? (
											<TextControl
												label="Name"
												value={reward.name}
												onChange={(name) => {
													updateReward({
														...reward,
														name,
													});
												}}
											/>
										) : (
											reward.name
										)}

										<div class="row-actions">
											{activeReward &&
											activeReward.id === reward.id ? (
												<a
													className="growcart-reward-cancel-edit"
													href="#"
													onClick={(name) => {
														setActiveReward(null);
													}}
												>
													Cancel changes
												</a>
											) : (
												<>
													<a
														className="growcart-reward-edit"
														href="#"
														onClick={() => {
															setActiveReward(
																rewards.find(
																	(_reward) =>
																		_reward.id ===
																		reward.id
																)
															);
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
											)}
										</div>
									</td>
									<td>
										{activeReward &&
										activeReward.id === reward.id ? (
											<SelectControl
												value={reward.type}
												options={
													woocommerce_growcart_rewards.reward_types
												}
												onChange={(type) => {
													updateReward({
														...reward,
														type,
													});
												}}
											/>
										) : (
											rewardTypeLabels[reward.type]
										)}
									</td>
									<td>
										{activeReward &&
										activeReward.id === reward.id ? (
											<TextControl
												value={reward.value}
												onChange={(value) => {
													updateReward({
														...reward,
														value,
													});
												}}
											/>
										) : (
											reward.value
										)}
									</td>
									<td>
										{activeReward &&
										activeReward.id === reward.id ? (
											<SelectControl
												value={reward.rule}
												options={
													woocommerce_growcart_rewards.reward_rules
												}
												onChange={(rule) => {
													updateReward({
														...reward,
														rule,
													});
												}}
											/>
										) : (
											rewardRuleLabels[reward.rule]
										)}
									</td>
									<td>
										{activeReward &&
										activeReward.id === reward.id ? (
											<NumberControl
												isShiftStepEnabled={true}
												onChange={(
													minimum_cart_contents
												) => {
													updateReward({
														...reward,
														[reward.rule]: minimum_cart_contents,
													});
												}}
												shiftStep={10}
												value={reward[reward.rule]}
											/>
										) : (
											reward[reward.rule]
										)}
									</td>
								</tr>
							);
						})}
					</tbody>
				) : null}
				<tfoot>
					<tr>
						<td colspan="5">
							<button
								type="button"
								className="button button-primary"
								onClick={() =>
									setRewards([
										...rewards,
										{
											id: uuidv4(),
											name: "FREE SHIPPING",
											type: "free_shipping",
											rule: "minimum_cart_contents",
											value: 0,
											minimum_cart_contents: 3,
											minimum_cart_amount: 0,
										},
									])
								}
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
