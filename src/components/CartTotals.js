import { useState } from "@wordpress/element";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getCartInformation, applyCoupon, removeCoupon } from "../api";

export default function CartTotals() {
	const queryClient = useQueryClient();
	const [coupon, updateCoupon] = useState("");
	const { isLoading, error, data: cartInformation } = useQuery(
		["cartInformation"],
		getCartInformation
	);

	const mutationApplyCoupon = useMutation(applyCoupon, {
		onSuccess: (response) => {
			queryClient.invalidateQueries("cartInformation");
		},
	});

	const mutationRemoveCoupon = useMutation(removeCoupon, {
		onSuccess: (response) => {
			queryClient.invalidateQueries("cartInformation");
		},
	});

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
					<>
						{cartInformation.data.coupons.map((coupon) => (
							<li key={coupon.code}>
								<span>{coupon.label}</span>
								<span>
									<span
										dangerouslySetInnerHTML={{
											__html: coupon.coupon_html,
										}}
									/>
									<button
										type="button"
										onClick={() =>
											mutationRemoveCoupon.mutate({
												security:
													woocommerce_grow_cart.remove_coupon_nonce,
												coupon: coupon.code,
											})
										}
									>
										[Remove]
									</button>
								</span>
							</li>
						))}
					</>
				)}

				<li>
					<span>Coupon code</span>
					<span>
						<input
							type="text"
							value={coupon}
							placeholder="Enter code"
							onChange={(e) => updateCoupon(e.target.value)}
						/>
						<button
							type="button"
							className="button"
							onClick={() =>
								mutationApplyCoupon.mutate({
									security:
										woocommerce_grow_cart.apply_coupon_nonce,
									coupon_code: coupon,
								})
							}
						>
							Apply coupon
						</button>
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
