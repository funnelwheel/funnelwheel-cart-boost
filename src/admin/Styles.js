import {
	BaseControl,
	FontSizePicker,
	__experimentalUnitControl as UnitControl,
	Flex,
	FlexItem,
} from "@wordpress/components";
import { useContext } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { RewardsAdminContext } from "../context";

const defaultSpacing = {
	top: '24px',
	right: '24px',
	bottom: '24px',
	left: '24px',
};

export default function Styles() {
	const { reward, updateReward } = useContext(RewardsAdminContext);
	function handleInputChange(event) {
		updateReward({
			...reward,
			styles: {
				...reward.styles,
				[event.target.name]: event.target.value,
			},
		})
	}
	const spacing = reward?.styles?.spacing || defaultSpacing;
	const fontSize = reward?.styles?.fontSize || '14px';
	const textColor = reward?.styles?.textColor || '#000000';
	const backgroundColor = reward?.styles?.backgroundColor || '#ffffff';
	const progressColor = reward?.styles?.progressColor || '#198754';
	const progressBackgroundColor = reward?.styles?.progressBackgroundColor || '#495057';

	return (
		<div className="Styles">
			<BaseControl
				className="Styles__spacing"
				label="Spacing"
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

			<UnitControl
				label="Font Size"
				onChange={(fontSize) =>
					updateReward({
						...reward,
						styles: {
							...reward.styles,
							fontSize,
						},
					})
				}
				value={fontSize}
			/>

			<Flex>
				<FlexItem>
					<BaseControl id="textColor" label="Text Color" __nextHasNoMarginBottom={true}>
						<input type="color" id="textColor" name="textColor" value={textColor} onChange={handleInputChange} />
					</BaseControl>
				</FlexItem>
				<FlexItem>
					<BaseControl id="backgroundColor" label="Background Color" __nextHasNoMarginBottom={true}>
						<input type="color" id="backgroundColor" name="backgroundColor" value={backgroundColor} onChange={handleInputChange} />
					</BaseControl>
				</FlexItem>
			</Flex>

			<Flex>
				<FlexItem>
					<BaseControl id="progressColor" label="Progress Color" __nextHasNoMarginBottom={true}>
						<input type="color" id="progressColor" name="progressColor" value={progressColor} onChange={handleInputChange} />
					</BaseControl>
				</FlexItem>
				<FlexItem>
					<BaseControl id="progressBackgroundColor" label="Progress Background" __nextHasNoMarginBottom={true}>
						<input type="color" id="progressBackgroundColor" name="progressBackgroundColor" value={progressBackgroundColor} onChange={handleInputChange} />
					</BaseControl>
				</FlexItem>
			</Flex>
		</div>
	);
}
