import { useContext } from "@wordpress/element";
import { useQuery } from "react-query";
import { getRewards, getCartInformation } from "../api";
import { RewardsAdminContext, CartContext } from "../context";
import Spinner from "./../components/Spinner";
import Cart from "./../components/Cart";

export default function Preview() {
    const {
        activeRewardItem
    } = useContext(RewardsAdminContext);
    const { isLoading: isCartLoading, error: cartError, data: cartInformation } = useQuery(
        ["cartInformation"],
        getCartInformation
    );
    const { isLoading: isRewardsLoading, error: rewardsError, data: rewardsInformation } = useQuery("rewards", getRewards);

    if (isCartLoading || isRewardsLoading) return <Spinner />;
    if (cartError || rewardsError) return "An error has occurred: " + cartError.message || cartError.rewardsError;

    const style = {
        ['--growcart-spacing-top']: "undefined" === typeof activeRewardItem.styles ? '24px' : activeRewardItem.styles.spacing.top,
        ['--growcart-spacing-right']: "undefined" === typeof activeRewardItem.styles ? '24px' : activeRewardItem.styles.spacing.right,
        ['--growcart-spacing-bottom']: "undefined" === typeof activeRewardItem.styles ? '24px' : activeRewardItem.styles.spacing.bottom,
        ['--growcart-spacing-left']: "undefined" === typeof activeRewardItem.styles ? '24px' : activeRewardItem.styles.spacing.left,
        ['--growcart-font-size']: "undefined" === typeof activeRewardItem.styles ? '24px' : activeRewardItem.styles.fontSize,
        ['--growcart-text-color']: "undefined" === typeof activeRewardItem.styles ? '#ffffff' : activeRewardItem.styles.textColor,
        ['--growcart-background-color']: "undefined" === typeof activeRewardItem.styles ? '#000000' : activeRewardItem.styles.backgroundColor,
    }

    return <CartContext.Provider value={{ cartInformation, rewardsInformation }}>
        <div className="Preview" style={style}>
            <Cart />
        </div>
    </CartContext.Provider>;
}