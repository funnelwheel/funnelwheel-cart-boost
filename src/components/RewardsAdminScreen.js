import { v4 as uuidv4 } from "uuid";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useState, useEffect } from "@wordpress/element";
import {
	TextControl,
	SelectControl,
	__experimentalNumberControl as NumberControl,
} from "@wordpress/components";
import { getAdminRewards, updateAdminRewards } from "../admin-api";

export default function RewardsAdminScreen() {
	const queryClient = useQueryClient();
	const [activeReward, setActiveReward] = useState(null);
	const { isLoading, error, data: rewards } = useQuery(
		"adminRewards",
		getAdminRewards,
		{
			onSuccess: (response) => {
				if (response.data && response.data.length) {
					setActiveReward(response.data[0]);
				}
			},
		}
	);

	const mutation = useMutation(updateAdminRewards, {
		onSuccess: (response) => {
			queryClient.invalidateQueries("adminRewards");
		},
	});

	useEffect(() => {
		// document.querySelector(".woocommerce-save-button").addEventListener(
		// 	"click",
		// 	function (event) {
		// 		event.preventDefault();
		// 	},
		// 	false
		// );
	}, [rewards]);

	if (isLoading) return "Loading...";
	if (error) return "An error has occurred: " + error.message;

	return (
		<div className="RewardsAdminScreen">
			<h2 className="wc-rewards-heading">
				Rewards{" "}
				{rewards.data && rewards.data.length
					? rewards.data.map((reward) => (
							<button
								key={reward.id}
								type="button"
								className="page-title-action"
								onClick={() => {
									setActiveReward(
										rewards.data.find(
											(_reward) =>
												_reward.id === reward.id
										)
									);
								}}
							>
								{reward.name}
							</button>
					  ))
					: null}
				<button
					type="button"
					className="page-title-action"
					onClick={() => {
						mutation.mutate({
							security:
								woocommerce_growcart_rewards.update_rewards_nonce,
							rewards: JSON.stringify([
								...rewards.data,
								{
									id: uuidv4(),
									name: "FREE SHIPPING",
									type: "FREE_SHIPPING",
									value: 0,
									minimum_cart_contents: 3,
								},
							]),
						});
					}}
				>
					Add
				</button>
			</h2>

			{activeReward && (
				<>
					<TextControl
						label="Name"
						value={activeReward.name}
						onChange={(name) =>
							setActiveReward({
								...activeReward,
								name,
							})
						}
					/>

					<SelectControl
						label="Type"
						value={activeReward.type}
						options={[
							{
								label: "FREE SHIPPING",
								value: "FREE_SHIPPING",
							},
							{
								label: "PERCENTAGE",
								value: "PERCENTAGE",
							},
							{ label: "FIXED", value: "FIXED" },
							{ label: "GIFTCARD", value: "GIFTCARD" },
						]}
						onChange={(type) =>
							setActiveReward({
								...activeReward,
								type,
							})
						}
					/>

					<TextControl
						label="Value"
						value={activeReward.value}
						onChange={(value) =>
							setActiveReward({
								...activeReward,
								value,
							})
						}
					/>

					<NumberControl
						label="Minimum cart contents"
						isShiftStepEnabled={true}
						onChange={(minimum_cart_contents) =>
							setActiveReward({
								...activeReward,
								minimum_cart_contents,
							})
						}
						shiftStep={10}
						value={activeReward.minimum_cart_contents}
					/>
				</>
			)}

			<p class="submit">
				<button
					type="button"
					class="button-primary woocommerce-save-button"
					onClick={() => {
						mutation.mutate({
							security:
								woocommerce_growcart_rewards.update_rewards_nonce,
							rewards: JSON.stringify(
								rewards.data.map((reward) => {
									if (reward.id === activeReward.id) {
										return activeReward;
									}

									return reward;
								})
							),
						});
					}}
				>
					Save changes
				</button>
			</p>
		</div>
	);
}
