import { useContext } from "@wordpress/element";
import { RewardsAdminContext } from "../context";
import Cart from "./../components/Cart";

export default function Preview() {
    const {
        activeRewardItem
    } = useContext(RewardsAdminContext);

    const style = {
        ['--growcart-spacing-top']: "undefined" === typeof activeRewardItem.styles ? '24px' : activeRewardItem.styles.spacing.top,
        ['--growcart-spacing-right']: "undefined" === typeof activeRewardItem.styles ? '24px' : activeRewardItem.styles.spacing.right,
        ['--growcart-spacing-bottom']: "undefined" === typeof activeRewardItem.styles ? '24px' : activeRewardItem.styles.spacing.bottom,
        ['--growcart-spacing-left']: "undefined" === typeof activeRewardItem.styles ? '24px' : activeRewardItem.styles.spacing.left,
        ['--growcart-font-size']: "undefined" === typeof activeRewardItem.styles ? '24px' : activeRewardItem.styles.fontSize,
        ['--growcart-text-color']: "undefined" === typeof activeRewardItem.styles ? '#ffffff' : activeRewardItem.styles.textColor,
        ['--growcart-background-color']: "undefined" === typeof activeRewardItem.styles ? '#000000' : activeRewardItem.styles.backgroundColor,
    }

    return <div className="Preview" style={style}>
        <Cart />
    </div>;
}