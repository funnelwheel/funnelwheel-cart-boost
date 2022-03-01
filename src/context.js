import {createContext} from "@wordpress/element";
export const CartContext = createContext({
	cart: woocommerce_growcart.cart,
	updateCart: () => {}
});
