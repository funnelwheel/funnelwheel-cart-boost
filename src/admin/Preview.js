import { useContext } from "@wordpress/element";
import { useQuery } from "react-query";
import { getRewards, getCartInformation } from "../api";
import { RewardsAdminContext, CartContext } from "../context";
import { ReactComponent as ArrowDownIcon } from "./../svg/arrow-down.svg";
import Spinner from "./../components/Spinner";
import Cart from "./../components/Cart";

export default function Preview() {
    const { clickToOpenPopup } = woocommerce_growcart.i18n;
    const {
        activeRewardItem
    } = useContext(RewardsAdminContext);
    const { isLoading: isRewardsLoading, error: rewardsError, data: rewardsInformation } = useQuery(["rewards", { active_reward_id: activeRewardItem.id }], getRewards);
    const { isLoading: isCartLoading, error: cartError, data: cartInformation } = useQuery(
        ["cartInformation", { active_reward_id: activeRewardItem.id }],
        getCartInformation
    );

    if (isCartLoading || isRewardsLoading) return <Spinner />;
    if (cartError || rewardsError) return "An error has occurred: " + cartError.message || cartError.rewardsError;

    if (!(rewardsInformation.data.rewards.current_rewards.length || rewardsInformation.data.rewards.next_rewards.length)) {
        return null;
    }

    const style = {
        ['--growcart-font-size']: activeRewardItem?.styles?.fontSize || '24px',
        ['--growcart-header-text-color']: activeRewardItem?.styles?.headerTextColor || '#ffffff',
        ['--growcart-header-background']: activeRewardItem?.styles?.headerBackground || '#343a40',
        ['--growcart-spacing-top']: activeRewardItem?.styles?.spacing?.top || '24px',
        ['--growcart-spacing-right']: activeRewardItem?.styles?.spacing?.right || '24px',
        ['--growcart-spacing-bottom']: activeRewardItem?.styles?.spacing?.bottom || '24px',
        ['--growcart-spacing-left']: activeRewardItem?.styles?.spacing?.left || '24px',
        ['--growcart-text-color']: activeRewardItem?.styles?.textColor || '#ffffff',
        ['--growcart-background-color']: activeRewardItem?.styles?.backgroundColor || '#000000',
        ['--growcart-icon-color']: activeRewardItem?.styles?.iconColor || '#ffffff',
        ['--growcart-icon-background']: activeRewardItem?.styles?.iconBackground || '#495057',
        ['--growcart-active-icon-color']: activeRewardItem?.styles?.activeIconColor || '#ffffff',
        ['--growcart-active-icon-background']: activeRewardItem?.styles?.activeIconBackground || '#198754',
        ['--growcart-progress-color']: activeRewardItem?.styles?.progressColor || '#198754',
        ['--growcart-progress-background']: activeRewardItem?.styles?.progressBackgroundColor || '#495057',
    }

    return <CartContext.Provider value={{ cartInformation, rewardsInformation }}>
        <div className="Preview" style={style}>
            <Cart />
            <div className="OpenPopup">
                <span className="OpenPopup__text">{clickToOpenPopup}</span>
                <ArrowDownIcon />
            </div>
        </div>
    </CartContext.Provider>;
}