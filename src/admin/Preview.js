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

    if (!(rewardsInformation.data.rewards.current_rewards.length || rewardsInformation.data.rewards.next_rewards.length)) {
        return null;
    }

    const style = {
        ['--growcart-spacing-top']: activeRewardItem?.styles?.spacing?.top || '24px',
        ['--growcart-spacing-right']: activeRewardItem?.styles?.spacing?.right || '24px',
        ['--growcart-spacing-bottom']: activeRewardItem?.styles?.spacing?.bottom || '24px',
        ['--growcart-spacing-left']: activeRewardItem?.styles?.spacing?.left || '24px',
        ['--growcart-font-size']: activeRewardItem?.styles?.fontSize || '24px',
        ['--growcart-text-color']: activeRewardItem?.styles?.textColor || '#ffffff',
        ['--growcart-background-color']: activeRewardItem?.styles?.backgroundColor || '#000000',
    }

    return <CartContext.Provider value={{ cartInformation, rewardsInformation }}>
        <div className="Preview" style={style}>
            <Cart />
        </div>
    </CartContext.Provider>;
}