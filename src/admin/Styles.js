import {
	BaseControl,
	FontSizePicker,
	__experimentalNumberControl as NumberControl,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
	__experimentalDimensionControl as DimensionControl,
	__experimentalUnitControl as UnitControl,
	Flex,
	FlexItem,
} from "@wordpress/components";
import { useState, useContext } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { Button, Dropdown } from "@wordpress/components";
import { ColorPicker } from "@wordpress/components";
import { ColorIndicator } from "@wordpress/components";
import { RewardsAdminContext } from "../context";

const fontSizes = [
	{
		name: __("Small"),
		slug: "small",
		size: 14,
	},
	{
		name: __("Normal"),
		slug: "normal",
		size: 16,
	},
	{
		name: __("Medium"),
		slug: "medium",
		size: 23,
	},
	{
		name: __("Large"),
		slug: "Large",
		size: 26,
	},
];
const fallbackFontSize = 16;

export default function Styles() {
	const { reward, updateReward } = useContext(RewardsAdminContext);
	const spacing =
		typeof reward.styles === "undefined" ||
			typeof reward.styles.spacing === "undefined"
			? {
				top: 24,
				right: 24,
				bottom: 24,
				left: 24,
			}
			: reward.styles.spacing;
	const fontSize =
		typeof reward.styles === "undefined" ||
			typeof reward.styles.fontSize === "undefined"
			? 14
			: reward.styles.fontSize;
	const textColor =
		typeof reward.styles === "undefined" ||
			typeof reward.styles.textcolor === "undefined"
			? "#000000"
			: reward.styles.textcolor;
	const backgroundColor =
		typeof reward.styles === "undefined" ||
			typeof reward.styles.backgroundColor === "undefined"
			? "#ffffff"
			: reward.styles.backgroundColor;

	return (
		<div className="Styles">
			<BaseControl id="textColor" label="Text Color" __nextHasNoMarginBottom={true}>
				<input type="color" id="textColor" name="textColor" value={textColor} />
			</BaseControl>
			
			<BaseControl id="backgroundColor" label="Background Color" __nextHasNoMarginBottom={true}>
				<input type="color" id="backgroundColor" name="backgroundColor" value={backgroundColor} />
			</BaseControl>

			<BaseControl
				className="Styles__typography"
				label="Typography"
				__nextHasNoMarginBottom={true}
			>
				<FontSizePicker
					fontSizes={fontSizes}
					value={fontSize}
					fallbackFontSize={fallbackFontSize}
					onChange={(fontSize) =>
						updateReward({
							...reward,
							styles: {
								...reward.styles,
								fontSize,
							},
						})
					}
				/>
			</BaseControl>

			<BaseControl
				className="Styles__spacing"
				label="Spacing"
				__nextHasNoMarginBottom={true}
			>
				<Flex>
					<FlexItem>
						<UnitControl
							onChange={(top) =>
								updateReward({
									...reward,
									styles: {
										...reward.styles,
										spacing: {
											...reward.styles.spacing,
											top,
										},
									},
								})
							}
							value={spacing.top}
						/>
					</FlexItem>
					<FlexItem>
						<UnitControl
							onChange={(right) =>
								updateReward({
									...reward,
									styles: {
										...reward.styles,
										spacing: {
											...reward.styles.spacing,
											right,
										},
									},
								})
							}
							value={spacing.right}
						/>
					</FlexItem>
					<FlexItem>
						<UnitControl
							onChange={(bottom) =>
								updateReward({
									...reward,
									styles: {
										...reward.styles,
										spacing: {
											...reward.styles.spacing,
											bottom,
										},
									},
								})
							}
							value={spacing.bottom}
						/>
					</FlexItem>
					<FlexItem>
						<UnitControl
							onChange={(left) =>
								updateReward({
									...reward,
									styles: {
										...reward.styles,
										spacing: {
											...reward.styles.spacing,
											left,
										},
									},
								})
							}
							value={spacing.left}
						/>
					</FlexItem>
				</Flex>
			</BaseControl>
		</div>
	);
}
