import { useContext } from "@wordpress/element";
import { CartContext } from "../context";
import QuantityInput from "./QuantityInput";

export default function CartItems() {
	const { cartInformation } = useContext(CartContext);

	return (
		<div className="CartItems">
			{cartInformation.data.items.map((item) => (
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

					<QuantityInput
						{...{
							quantity: item.quantity,
							min: item.min_purchase_quantity,
							max: item.max_purchase_quantity,
							onChange: (quantity) => {
								console.log(quantity);
							},
						}}
					/>
				</div>
			))}
		</div>
	);
}
