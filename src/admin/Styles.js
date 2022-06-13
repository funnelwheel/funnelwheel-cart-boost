import {
	BaseControl,
	__experimentalNumberControl as NumberControl,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
	FontSizePicker,
	__experimentalDimensionControl as DimensionControl,
	__experimentalUnitControl as UnitControl,
} from "@wordpress/components";
import { useState, useContext } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { Button, Dropdown } from "@wordpress/components";
import { ColorPicker } from "@wordpress/components";
import { ColorIndicator } from "@wordpress/components";
import { RewardsAdminContext } from "../context";

const Example2 = () => {
	const [value, setValue] = useState("10px");

	return <UnitControl onChange={setValue} value={value} />;
};

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
	const fontSize =
		typeof reward.styles === "undefined" ? 12 : reward.styles.fontSize;
	const textColor =
		typeof reward.styles === "undefined"
			? "#000000"
			: reward.styles.textcolor;
	const backgroundColor =
		typeof reward.styles === "undefined"
			? "#ffffff"
			: reward.styles.backgroundColor;

	return (
		<div className="Styles">
			<BaseControl
				className="Styles__color"
				label="Color"
				__nextHasNoMarginBottom={true}
			>
				<div className="components-tools-panel-item first">
					<Dropdown
						position="bottom right"
						renderToggle={({ isOpen, onToggle }) => (
							<Button onClick={onToggle} aria-expanded={isOpen}>
								<ColorIndicator colorValue={textColor} />
								Text
							</Button>
						)}
						renderContent={() => (
							<ColorPicker
								color={textColor}
								onChange={(textcolor) =>
									updateReward({
										...reward,
										styles: {
											...reward.styles,
											textcolor,
										},
									})
								}
								enableAlpha
								defaultValue="#000000"
							/>
						)}
					/>
				</div>

				<div className="components-tools-panel-item last">
					<Dropdown
						position="bottom right"
						renderToggle={({ isOpen, onToggle }) => (
							<Button onClick={onToggle} aria-expanded={isOpen}>
								<ColorIndicator colorValue={backgroundColor} />
								Background
							</Button>
						)}
						renderContent={() => (
							<ColorPicker
								color={backgroundColor}
								onChange={(backgroundColor) =>
									updateReward({
										...reward,
										styles: {
											...reward.styles,
											backgroundColor,
										},
									})
								}
								enableAlpha
								defaultValue="#ffffff"
							/>
						)}
					/>
				</div>
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
				id="textarea-1"
				label="Spacing"
				__nextHasNoMarginBottom={true}
			>
				<Example2 />
				<Example2 />
				<Example2 />
				<Example2 />
			</BaseControl>
		</div>
	);
}
