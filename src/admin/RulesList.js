import {
	ToggleControl,
	__experimentalNumberControl as NumberControl,
} from "@wordpress/components";

export default function RulesList({ reward, rules, removeRule, updateRule }) {
    console.log({ reward, rules, removeRule, updateRule });
	return (
		<div className="RulesList">
			{rules && rules.length
				? rules.map((rule) => {
						return (
							<>
								<ToggleControl
									checked={rule.enabled}
									onChange={() => {
										updateRule({
											...rule,
											enabled: !rule.enabled,
										});
									}}
								/>

								<TextControl
									label="Name"
									value={rule.name}
									onChange={(name) => {
										updateRule({
											...rule,
											name,
										});
									}}
								/>

								<TextControl
									value={rule.value}
									onChange={(value) => {
										updateRule({
											...rule,
											value,
										});
									}}
								/>

								{"minimum_cart_contents" === reward.type ? (
									<NumberControl
										isShiftStepEnabled={true}
										onChange={(minimum_cart_contents) => {
											updateRule({
												...rule,
												minimum_cart_contents,
											});
										}}
										shiftStep={10}
										value={rule.minimum_cart_contents}
									/>
								) : (
									<NumberControl
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
							</>
						);
				  })
				: null}
		</div>
	);
}
