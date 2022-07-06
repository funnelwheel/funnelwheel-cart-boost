import { __ } from '@wordpress/i18n';
import {
	TextControl,
	ToggleControl,
	__experimentalNumberControl as NumberControl,
} from "@wordpress/components";

export default function RulesListItem() {
	return (
		<div className="RulesListItem">
			<div className="RulesListItem__actions">
				<ToggleControl
					checked={rule.enabled}
					onChange={() => {
						updateRule({
							...rule,
							enabled: !rule.enabled,
						});
					}}
				/>
				<button
					type="button"
					className="RulesList__remove"
					onClick={() => removeRule(rule.id)}
				>
					{__("Remove")}
				</button>
			</div>

			<TextControl
				label={__("Name")}
				value={rule.name}
				onChange={(name) => {
					updateRule({
						...rule,
						name,
					});
				}}
			/>

			<TextControl
				label={__("Minimum cart amount")}
				value={rule.value}
				onChange={(value) => {
					updateRule({
						...rule,
						value,
					});
				}}
			/>

			{"minimum_cart_quantity" === reward.type ? (
				<NumberControl
					label={__("Value")}
					isShiftStepEnabled={true}
					onChange={(minimum_cart_quantity) => {
						updateRule({
							...rule,
							minimum_cart_quantity,
						});
					}}
					shiftStep={10}
					value={rule.minimum_cart_quantity}
				/>
			) : (
				<NumberControl
					label={__("Value")}
					isShiftStepEnabled={true}
					onChange={(minimum_cart_amount) => {
						updateRule({
							...rule,
							minimum_cart_amount,
						});
					}}
					shiftStep={10}
					value={rule.minimum_cart_amount}
				/>
			)}
		</div>
	);
}
