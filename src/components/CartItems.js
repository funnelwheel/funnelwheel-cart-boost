import { useContext } from "@wordpress/element";
import { CartContext } from "../context";

export default function CartItems() {
	const { cart, updateCart } = useContext(CartContext);

	return (
		<div className="CartItems">
			{cart.items.map((item) => (
				<div className="CartItems__item" key={item.key}>
					<a href={item.product_permalink}>{item.product_title}</a>
					<div
						className="CartItems__item-thumbnail"
						dangerouslySetInnerHTML={{
							__html: item.product_thumbnail,
						}}
					/>

					<div
						className="CartItems__item-subtotal"
						dangerouslySetInnerHTML={{
							__html: item.product_subtotal,
						}}
					/>
				</div>
			))}
		</div>
	);
}
