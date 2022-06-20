import { useState, useContext } from "@wordpress/element";
import { useMutation, useQueryClient } from "react-query";
import { CartContext } from "../context";
import { applyCoupon, removeCoupon } from "../api";

export default function CartTotals() {
	const queryClient = useQueryClient();
	const [coupon, updateCoupon] = useState("");
	const {
		cartInformation,
	} = useContext(CartContext);

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

	return (
		<ul className="CartTotals">
			{cartInformation.data.tax_enabled && (
				<li>
					<span className="label">Tax</span>
					<span className="value"
						dangerouslySetInnerHTML={{
							__html: cartInformation.data.cart_tax,
						}}
					/>
				</li>
			)}

			{cartInformation.data.has_discount && (
				<>
					{cartInformation.data.coupons.map((coupon) => (
						<li>
							<span className="label">{coupon.label}</span>
							<span className="value">
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
							</span>
						</li>
					))}

					{cartInformation.data.rewards && (
						<li>
							<span className="label">Rewards</span>
							<span
								className="value CartTotals__rewards"
								dangerouslySetInnerHTML={{
									__html: cartInformation.data.rewards,
								}}
							/>
						</li>
					)}
				</>
			)}

			{cartInformation.data.display_coupon && (
				<li>
					<span className="label">Coupon code</span>
					<span className="value">
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
					</span>
				</li>
			)}

			<li>
				<span className="label">Total</span>
				<span
					className="value CartTotals__total"
					dangerouslySetInnerHTML={{
						__html: cartInformation.data.total,
					}}
				/>
			</li>
		</ul>
	);
}
