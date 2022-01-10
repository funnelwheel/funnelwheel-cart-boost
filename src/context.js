import {createContext} from "@wordpress/element";
export const CartContext = createContext({
	cart: woocommerce_grow_cart.cart,
	updateCart: () => {}
});
