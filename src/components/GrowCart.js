import { useQuery } from "react-query";
import { getRewards, getCartInformation } from "../api";
import { CartContext } from "../context";
import Spinner from "./../components/Spinner";
import Cart from "./../components/Cart";

export default function GrowCart() {
    const { isLoading: isCartLoading, error: cartError, data: cartInformation } = useQuery(
        ["cartInformation", {active_reward_id: ""}],
        getCartInformation
    );
    const { isLoading: isRewardsLoading, error: rewardsError, data: rewardsInformation } = useQuery(["rewards", { active_reward_id: "" }], getRewards);

    if (isCartLoading || isRewardsLoading) return <Spinner />;
    if (cartError || rewardsError) return "An error has occurred: " + cartError.message || cartError.rewardsError;


    return <CartContext.Provider value={{ cartInformation, rewardsInformation }}>
        <Cart />
    </CartContext.Provider>;
}