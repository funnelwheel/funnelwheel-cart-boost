import { useContext } from "@wordpress/element";
import { CartContext } from "../context";

export default function CartTotals() {
	const { cartInformation } = useContext(CartContext);

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

				{cartInformation.data.tax_enabled && (
					<li>
						<span>Tax</span>
						<span
							dangerouslySetInnerHTML={{
								__html: cartInformation.data.cart_tax,
							}}
						/>
					</li>
				)}

				{cartInformation.data.has_shipping && (
					<li>
						<span>Shipping</span>
						<span
							dangerouslySetInnerHTML={{
								__html:
									cartInformation.data.cart_shipping_total,
							}}
						/>
					</li>
				)}

				{cartInformation.data.has_discount && (
					<li>
						<span>Shipping</span>
						<span
							dangerouslySetInnerHTML={{
								__html:
									cartInformation.data.cart_discount_total,
							}}
						/>
					</li>
				)}
			</ul>

			<div className="CartTotals__total">
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
