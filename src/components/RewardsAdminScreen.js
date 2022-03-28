import { v4 as uuidv4 } from "uuid";
import classnames from "classnames";
import { useState, useEffect } from "@wordpress/element";
import {
	TextControl,
	SelectControl,
	__experimentalNumberControl as NumberControl,
} from "@wordpress/components";
import { ReactComponent as XIcon } from "./../svg/x.svg";

export default function RewardsAdminScreen() {
	const [rewards, setRewards] = useState([
		{
			id: uuidv4(),
			name: "FREE SHIPPING",
			type: "free_shipping",
			value: 0,
			minimum_cart_contents: 3,
		},
	]);
	const [activeReward, setActiveReward] = useState(rewards[0]);

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

	return (
		<div className="RewardsAdminScreen">
			{rewards && rewards.length ? (
				<table className="table widefat">
					<thead>
						<tr>
							<th scope="col">Name</th>
							<th scope="col">Type</th>
							<th scope="col">Value</th>
							<th scope="col">Minimum cart contents</th>
						</tr>
					</thead>
					<tbody>
						{rewards.map((reward) => (
							<tr>
								<th>{reward.name}</th>
								<td>{reward.type}</td>
								<td>{reward.value}</td>
								<td>{reward.minimum_cart_contents}</td>
							</tr>
						))}
					</tbody>
				</table>
			) : null}

			{rewards && rewards.length ? (
				<ul className="Rewards-List">
					{rewards.map((reward) => (
						<li
							key={reward.id}
							className={classnames("reward-title", {
								active:
									activeReward &&
									activeReward.id === reward.id,
							})}
						>
							<span
								onClick={() => {
									setActiveReward(
										rewards.find(
											(_reward) =>
												_reward.id === reward.id
										)
									);
								}}
							>
								{reward.name}
							</span>
							<span
								onClick={() =>
									setRewards(
										rewards.filter(
											(_reward) =>
												_reward.id !== reward.id
										)
									)
								}
							>
								<XIcon />
							</span>
						</li>
					))}
				</ul>
			) : null}

			<button
				type="button"
				onClick={() =>
					setRewards([
						...rewards,
						{
							id: uuidv4(),
							name: "FREE SHIPPING",
							type: "free_shipping",
							value: 0,
							minimum_cart_contents: 3,
						},
					])
				}
			>
				Add
			</button>

			{activeReward && (
				<>
					<TextControl
						label="Name"
						value={activeReward.name}
						onChange={(name) => {
							setActiveReward({
								...activeReward,
								name,
							});
						}}
					/>

					<SelectControl
						label="Type"
						value={activeReward.type}
						options={[
							{
								label: "FREE SHIPPING",
								value: "free_shipping",
							},
							{
								label: "PERCENTAGE",
								value: "percent",
							},
							{ label: "FIXED", value: "fixed_cart" },
							{ label: "GIFTCARD", value: "giftcard" },
						]}
						onChange={(type) => {
							setActiveReward({
								...activeReward,
								type,
							});
						}}
					/>

					<TextControl
						label="Value"
						value={activeReward.value}
						onChange={(value) => {
							setActiveReward({
								...activeReward,
								value,
							});
						}}
					/>

					<NumberControl
						label="Minimum cart contents"
						isShiftStepEnabled={true}
						onChange={(minimum_cart_contents) => {
							setActiveReward({
								...activeReward,
								minimum_cart_contents,
							});
						}}
						shiftStep={10}
						value={activeReward.minimum_cart_contents}
					/>
				</>
			)}
		</div>
	);
}
