import { useContext } from "@wordpress/element";
import { CartContext } from "../context";

export default function CartTotals() {
	const { cartInformation } = useContext(CartContext);

	console.log(cartInformation);

	return (
		<div className="CartTotals">
			<ul>
				<li>
					<span>Subtotal</span>
					<span
						dangerouslySetInnerHTML={{
							__html: cartInformation.data.cart_subtotal,
						}}
					/>
				</li>
			</ul>

			<div>
				<span>Total</span>
				<span
					dangerouslySetInnerHTML={{
						__html: cartInformation.data.total,
					}}
				/>
			</div>
		</div>
	);
}
