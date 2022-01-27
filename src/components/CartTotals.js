import { useContext } from "@wordpress/element";
import { useQuery } from "react-query";
import { getCartInformation } from "../api";

export default function CartTotals() {
	const { isLoading, error, data: cartInformation } = useQuery(
		["cartInformation"],
		getCartInformation
	);

	if (isLoading) return "Loading...";
	if (error) return "An error has occurred: " + error.message;

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

				<li>
					<span>Coupon code</span>
					<span>
						<input type="text" placeholder="Enter code" />
						<butto type="button" className="button">
							Apply coupon
						</butto>
					</span>
				</li>
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
