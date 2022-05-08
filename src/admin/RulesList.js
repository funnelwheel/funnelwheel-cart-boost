import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "@wordpress/element";
import {
	ToggleControl,
	__experimentalNumberControl as NumberControl,
} from "@wordpress/components";

export default function RulesList({ rules, removeRule, updateRule }) {
	return (
		<div className="RulesList">
			{rules && rules.length
				? rules.map((rule) => {
						return (
							<>
								<ToggleControl
									checked={rule.enabled}
									onChange={() => {
										updateReward({
											...rule,
											enabled: !rule.enabled,
										});
									}}
								/>

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

								<TextControl
									value={reward.value}
									onChange={(value) => {
										updateReward({
											...reward,
											value,
										});
									}}
								/>

								<NumberControl
									isShiftStepEnabled={true}
									onChange={(minimum_cart_contents) => {
										updateReward({
											...reward,
											[reward.rule]: minimum_cart_contents,
										});
									}}
									shiftStep={10}
									value={reward[reward.rule]}
								/>
							</>
						);
				  })
				: null}
		</div>
	);
}
