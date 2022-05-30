import {createContext} from "@wordpress/element";
export const CartContext = createContext({
	cart: {},
	updateCart: () => {}
});

export const RewardsAdminContext = createContext({
	rewards: [],
	updateRewards: () => {}
});
