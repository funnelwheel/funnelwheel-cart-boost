import {createContext} from "@wordpress/element";
export const CartContext = createContext({
	cart: {},
	updateCart: () => {}
});

export const AdminRewardsContext = createContext({
	rewards: [],
	updateRewards: () => {}
});
