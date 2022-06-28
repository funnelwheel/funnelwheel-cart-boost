import {
	BaseControl,
	__experimentalUnitControl as UnitControl,
	Tooltip,
	Flex,
	FlexItem,
} from "@wordpress/components";
import { useContext } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { RewardsAdminContext } from "../context";
import { ReactComponent as ClockwiseIcon } from "./../svg/arrow-clockwise.svg";

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

	const headerTextColor = reward?.styles?.headerTextColor || '#ffffff';
	const headerBackground = reward?.styles?.headerBackground || '#343a40';
	const fontSize = reward?.styles?.fontSize || '14px';
	const spacing = reward?.styles?.spacing || defaultSpacing;
	const textColor = reward?.styles?.textColor || '#000000';
	const backgroundColor = reward?.styles?.backgroundColor || '#ffffff';
	const iconColor = reward?.styles?.iconColor || '#ffffff';
	const iconBackground = reward?.styles?.iconBackground || '#495057';
	const activeIconColor = reward?.styles?.activeIconColor || '#ffffff';
	const activeIconBackground = reward?.styles?.activeIconBackground || '#198754';
	const progressColor = reward?.styles?.progressColor || '#198754';
	const progressBackgroundColor = reward?.styles?.progressBackgroundColor || '#495057';

	return (
		<div className="Styles">
			<div className="Styles__block">
				<h4 className="Styles__block-title">
					Modal

					<Tooltip text="Revert" position="top" delay={1}>
						<button
							className="Styles__redo"
							type="button"
							onClick={() => updateReward({
								...reward,
								styles: {
									...reward.styles,
									fontSize: woocommerce_growcart.initial_reward.styles.fontSize,
									headerTextColor: woocommerce_growcart.initial_reward.styles.headerTextColor,
									headerBackground: woocommerce_growcart.initial_reward.styles.headerBackground
								},
							})}
						>
							<ClockwiseIcon />
						</button>
					</Tooltip>
				</h4>
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
						<BaseControl className="components-color-control" id="headerTextColor" label="Header Text Color" __nextHasNoMarginBottom={true}>
							<input type="color" id="headerTextColor" name="headerTextColor" value={headerTextColor} onChange={handleInputChange} />
						</BaseControl>
					</FlexItem>
					<FlexItem>
						<BaseControl className="components-color-control" id="headerBackground" label="Header Background" __nextHasNoMarginBottom={true}>
							<input type="color" id="headerBackground" name="headerBackground" value={headerBackground} onChange={handleInputChange} />
						</BaseControl>
					</FlexItem>
				</Flex>
			</div>

			<div className="Styles__block">
				<h4 className="Styles__block-title">
					Rewards

					<Tooltip text="Revert" position="top" delay={1}>
						<button
							className="Styles__redo"
							type="button"
							onClick={() => updateReward({
								...reward,
								styles: {
									...reward.styles,
									spacing: woocommerce_growcart.initial_reward.styles.spacing,
									textColor: woocommerce_growcart.initial_reward.styles.textColor,
									backgroundColor: woocommerce_growcart.initial_reward.styles.backgroundColor,
									iconColor: woocommerce_growcart.initial_reward.styles.iconColor,
									iconBackground: woocommerce_growcart.initial_reward.styles.iconBackground,
									activeIconColor: woocommerce_growcart.initial_reward.styles.activeIconColor,
									activeIconBackground: woocommerce_growcart.initial_reward.styles.activeIconBackground,
									progressColor: woocommerce_growcart.initial_reward.styles.activeIconBackground,
									progressBackgroundColor: woocommerce_growcart.initial_reward.styles.progressBackgroundColor,
								},
							})}
						>
							<ClockwiseIcon />
						</button>
					</Tooltip>
				</h4>
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
				<Flex>
					<FlexItem>
						<BaseControl className="components-color-control" id="textColor" label="Text Color" __nextHasNoMarginBottom={true}>
							<input type="color" id="textColor" name="textColor" value={textColor} onChange={handleInputChange} />
						</BaseControl>
					</FlexItem>
					<FlexItem>
						<BaseControl className="components-color-control" id="backgroundColor" label="Background" __nextHasNoMarginBottom={true}>
							<input type="color" id="backgroundColor" name="backgroundColor" value={backgroundColor} onChange={handleInputChange} />
						</BaseControl>
					</FlexItem>
				</Flex>

				<Flex>
					<FlexItem>
						<BaseControl className="components-color-control" id="iconColor" label="Icon Color" __nextHasNoMarginBottom={true}>
							<input type="color" id="iconColor" name="iconColor" value={iconColor} onChange={handleInputChange} />
						</BaseControl>
					</FlexItem>
					<FlexItem>
						<BaseControl className="components-color-control" id="iconBackground" label="Icon Background" __nextHasNoMarginBottom={true}>
							<input type="color" id="iconBackground" name="iconBackground" value={iconBackground} onChange={handleInputChange} />
						</BaseControl>
					</FlexItem>
				</Flex>

				<Flex>
					<FlexItem>
						<BaseControl className="components-color-control" id="activeIconColor" label="Active Icon Color" __nextHasNoMarginBottom={true}>
							<input type="color" id="activeIconColor" name="activeIconColor" value={activeIconColor} onChange={handleInputChange} />
						</BaseControl>
					</FlexItem>
					<FlexItem>
						<BaseControl className="components-color-control" id="activeIconBackground" label="Active Icon Background" __nextHasNoMarginBottom={true}>
							<input type="color" id="activeIconBackground" name="activeIconBackground" value={activeIconBackground} onChange={handleInputChange} />
						</BaseControl>
					</FlexItem>
				</Flex>

				<Flex>
					<FlexItem>
						<BaseControl className="components-color-control" id="progressColor" label="Progress Bar" __nextHasNoMarginBottom={true}>
							<input type="color" id="progressColor" name="progressColor" value={progressColor} onChange={handleInputChange} />
						</BaseControl>
					</FlexItem>
					<FlexItem>
						<BaseControl className="components-color-control" id="progressBackgroundColor" label="Progress Bar Background" __nextHasNoMarginBottom={true}>
							<input type="color" id="progressBackgroundColor" name="progressBackgroundColor" value={progressBackgroundColor} onChange={handleInputChange} />
						</BaseControl>
					</FlexItem>
				</Flex>
			</div>
		</div>
	);
}
