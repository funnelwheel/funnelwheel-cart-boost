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
			updateCoupon("");
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
			<dl>
				{cartInformation.data.tax_enabled && (
					<>
						<dt>Tax</dt>
						<dd
							dangerouslySetInnerHTML={{
								__html: cartInformation.data.cart_tax,
							}}
						/>
					</>
				)}

				{cartInformation.data.has_shipping && (
					<>
						<dt>Shipping</dt>
						<dd
							dangerouslySetInnerHTML={{
								__html: cartInformation.data.cart_shipping_total,
							}}
						/>
					</>
				)}

				{cartInformation.data.has_discount && (
					<>
						{cartInformation.data.coupons.map((coupon) => (
							<>
								<dt>{coupon.label}</dt>
								<dd>
									<span
										dangerouslySetInnerHTML={{
											__html: coupon.coupon_html,
										}}
									/>
									<button
										className="CartTotals__remove-coupon"
										type="button"
										onClick={() =>
											mutationRemoveCoupon.mutate({
												security:
													woocommerce_growcart.remove_coupon_nonce,
												coupon: coupon.code,
											})
										}
										disabled={
											mutationRemoveCoupon.isLoading
										}
									>
										[Remove]
									</button>
								</dd>
							</>
						))}

						{cartInformation.data.rewards && (
							<>
								<dt>Rewards</dt>
								<dd
									className="CartTotals__rewards"
									dangerouslySetInnerHTML={{
										__html: cartInformation.data.rewards,
									}}
								/>
							</>
						)}
					</>
				)}

				{cartInformation.data.display_coupon && (
					<>
						<dt>Coupon code</dt>
						<dd>
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
											woocommerce_growcart.apply_coupon_nonce,
										coupon_code: coupon,
									})
								}
								disabled={mutationApplyCoupon.isLoading}
							>
								Apply coupon
							</button>
						</dd>
					</>
				)}

				<dt>Total</dt>
				<dd
					className="CartTotals__total"
					dangerouslySetInnerHTML={{
						__html: cartInformation.data.total,
					}}
				/>
			</dl>
		</div>
	);
}
