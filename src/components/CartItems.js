import {useContext} from "@wordpress/element";
import {CartContext} from "../context";

export default function CartItems() {
	const {cart, updateCart} = useContext(CartContext);

    console.log(cart);

	return "CartItems";
}
