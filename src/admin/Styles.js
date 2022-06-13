import {
	__experimentalNumberControl as NumberControl,
	FontSizePicker,
} from "@wordpress/components";
import { useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";

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
			<div className="field">
				<label for="field__mini-cart-header-background-color">
					Background Color
				</label>
				<input
					type="color"
					id="field__mini-cart-header-background-color"
					value={color}
					onChange={(e) => setColor(e.target.value)}
				/>
			</div>

			<div className="field">
				<label for="field__mini-cart-header-font-color">
					Font Color
				</label>
				<input
					type="color"
					id="field__mini-cart-header-font-color"
					value={color}
					onChange={(e) => setColor(e.target.value)}
				/>
			</div>

			<MyFontSizePicker />
		</div>
	);
}
