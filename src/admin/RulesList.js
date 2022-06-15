import {
	TextControl,
	ToggleControl,
	__experimentalNumberControl as NumberControl,
	SelectControl,
} from "@wordpress/components";
import { useContext } from "@wordpress/element";
import { RewardsAdminContext } from "../context";
import { ReactComponent as TrashIcon } from "./../svg/trash.svg";
import { ReactComponent as InfoCircleFillIcon } from "./../svg/info-circle-fill.svg";

export default function RulesList({ reward, addRule, removeRule }) {
	const { updateReward } = useContext(RewardsAdminContext);

	function updateRule(rule) {
		const rules = reward.rules.map((_rule) => {
			if (_rule.id === rule.id) {
				return rule;
			}

			return _rule;
		});

		updateReward({
			...reward,
			rules,
		});
	}

	function getNameFieldHelp(ruleType) {
		switch (ruleType) {
			case "fixed_cart":
				return "Use <code>{{value}}</code> and <code>{{currency}}</code> to display value and currency symbol.";

			case "percent":
				return "Use <code>{{value}}</code> to display value.";

			default:
				null;
		}
	}

	function getHintFieldHelp(rewardType) {
		switch (rewardType) {
			case "minimum_cart_quantity":
				return "Wrap text with <code>**</code> to make it bold. Use <code>{{name}}</code>, <code>{{quantity}}</code> and <code>{{currency}}</code> to display name, minimum cart quantity and currency symbol.";

			default:
				return "Wrap text with <code>**</code> to make it bold. Use <code>{{name}}</code>, <code>{{amount}}</code> and <code>{{currency}}</code> to display name, minimum cart amount and currency symbol.";
		}
	}

	const hasFreeShippingRule = reward.rules.reduce((previousValue, currentValue) => {
		if ("free_shipping" === currentValue.type) {
			return true;
		}

		return previousValue;
	}, false);

	const typeOptions = woocommerce_growcart_admin.reward_types.map(
		(option) => {
			if (hasFreeShippingRule && "free_shipping" === option.value) {
				return { ...option, disabled: true };
			}

			return option;
		}
	);

	return (
		<div className="RulesList">
			<h4 className="RulesList__title">Reward Rules</h4>

			<div className="RulesList__items">
				{reward.rules && reward.rules.length
					? reward.rules.map((rule) => {
							return (
								<div className="RulesListItem" key={rule.id}>
									<div className="RulesListItem__actions">
										<ToggleControl
											label={
												rule.enabled
													? "Active"
													: "Disabled"
											}
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
											onClick={() => {
												if (
													confirm(
														"Deleting rule!"
													) === true
												) {
													removeRule(rule.id);
												}
											}}
										>
											<TrashIcon />
										</button>
									</div>

									<TextControl
										label="Name"
										help={
											<span
												dangerouslySetInnerHTML={{
													__html: getNameFieldHelp(
														rule.type
													),
												}}
											></span>
										}
										value={rule.name}
										onChange={(name) => {
											updateRule({
												...rule,
												name,
											});
										}}
									/>

									<SelectControl
										label="Type"
										value={rule.type}
										options={typeOptions}
										onChange={(type) =>
											updateRule({
												...rule,
												type,
											})
										}
										__nextHasNoMarginBottom
									/>

									{["percent", "fixed_cart"].includes(
										rule.type
									) && (
										<NumberControl
											label="Value"
											value={rule.value}
											onChange={(value) =>
												updateRule({
													...rule,
													value,
												})
											}
											min={0}
										/>
									)}

									<NumberControl
										label={
											"minimum_cart_quantity" ===
											reward.type
												? "Minimum cart quantity"
												: "Minimum cart amount"
										}
										onChange={(value) =>
											updateRule({
												...rule,
												[reward.type]: value,
											})
										}
										value={rule[reward.type]}
										min={1}
									/>

									<TextControl
										label="Hint"
										help={
											<span
												dangerouslySetInnerHTML={{
													__html: getHintFieldHelp(
														reward.type
													),
												}}
											></span>
										}
										value={rule.hint}
										onChange={(hint) => {
											updateRule({
												...rule,
												hint,
											});
										}}
									/>
								</div>
							);
					  })
					: null}
			</div>

			<button type="button" className="RulesList__add" onClick={addRule}>
				Add rule
			</button>
		</div>
	);
}
