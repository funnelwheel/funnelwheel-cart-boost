import { v4 as uuidv4 } from "uuid";
import { TextControl, SelectControl } from "@wordpress/components";
import { useState, useContext } from "@wordpress/element";
import { RewardsAdminContext } from "../context";

export default function RewardsListItemAdd() {
	const {
		addReward,
		setCurrentlyEditing,
		setActiveScreen,
		rewardRules,
	} = useContext(RewardsAdminContext);
	const [reward, setReward] = useState({
		id: uuidv4(),
		name: "Free Shipping",
		type: "minimum_cart_quantity",
		value: 0,
		minimum_cart_quantity: 0,
		minimum_cart_amount: 0,
		rules: [],
		enabled: false,
		display_suggested_products: true,
		display_coupon: true,
	});

	return (
		<div className="RewardsListItemAdd">
			<button
				className="RewardsListItemAdd__back"
				type="button"
				onClick={() => setActiveScreen("list")}
			>
				Back
			</button>

			<div className="RewardsListItemAdd__body">
				<TextControl
					label="Name"
					value={reward.name}
					onChange={(name) => {
						setReward({
							...reward,
							name,
						});
					}}
				/>

				<SelectControl
					label="Type"
					value={reward.type}
					options={rewardRules}
					onChange={(type) => {
						setReward({
							...reward,
							type,
						});
					}}
				/>

				<ToggleControl
					label="Display suggested products"
					help="Display suggested products on the right side of the popup modal."
					checked={reward.display_suggested_products}
					onChange={() =>
						setReward({
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
						setReward({
							...reward,
							display_coupon: !reward.display_coupon,
						})
					}
				/>
			</div>

			<button
				className="RewardsListItemAdd__next"
				type="button"
				onClick={() => {
					addReward(reward);
					setCurrentlyEditing(reward.id);
					setActiveScreen("edit");
				}}
			>
				Next
			</button>
		</div>
	);
}
