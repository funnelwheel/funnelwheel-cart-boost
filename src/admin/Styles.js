import {
	BaseControl,
	__experimentalNumberControl as NumberControl,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
	FontSizePicker,
	__experimentalDimensionControl as DimensionControl,
	__experimentalUnitControl as UnitControl,
} from "@wordpress/components";
import { useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { Button, Dropdown } from "@wordpress/components";
import { ColorPicker } from "@wordpress/components";
import { ColorIndicator } from "@wordpress/components";

const Example2 = () => {
	const [value, setValue] = useState("10px");

	return <UnitControl onChange={setValue} value={value} />;
};

function Example() {
	const [color, setColor] = useState();
	return (
		<ColorPicker
			color={color}
			onChange={setColor}
			enableAlpha
			defaultValue="#000"
		/>
	);
}

const fontSizes = [
	{
		name: __("Small"),
		slug: "small",
		size: 12,
	},
	{
		name: __("Big"),
		slug: "big",
		size: 26,
	},
];
const fallbackFontSize = 16;

const MyFontSizePicker = () => {
	const [fontSize, setFontSize] = useState(12);

	return (
		<FontSizePicker
			fontSizes={fontSizes}
			value={fontSize}
			fallbackFontSize={fallbackFontSize}
			onChange={(newFontSize) => {
				setFontSize(newFontSize);
			}}
		/>
	);
};

export default function Styles() {
	const [color, setColor] = useState();

	return (
		<div className="Styles">
			<BaseControl
				id="textarea-1"
				label="Color"
				__nextHasNoMarginBottom={true}
			>
				<Dropdown
					className="my-container-class-name"
					contentClassName="my-popover-content-classname"
					position="bottom right"
					renderToggle={({ isOpen, onToggle }) => (
						<Button
							variant="tertiary"
							onClick={onToggle}
							aria-expanded={isOpen}
						>
							<ColorIndicator colorValue="#0073aa" />
							Text
						</Button>
					)}
					renderContent={() => <Example />}
				/>

				<Dropdown
					className="my-container-class-name"
					contentClassName="my-popover-content-classname"
					position="bottom right"
					renderToggle={({ isOpen, onToggle }) => (
						<Button
							variant="tertiary"
							onClick={onToggle}
							aria-expanded={isOpen}
						>
							<ColorIndicator colorValue="#0073aa" />
							Background
						</Button>
					)}
					renderContent={() => <Example />}
				/>
			</BaseControl>

			<BaseControl
				id="textarea-1"
				label="Typography"
				__nextHasNoMarginBottom={true}
			>
				<MyFontSizePicker />
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
