import $ from "jquery";
import classNames from "classnames";
import { useState, useContext, useEffect } from "@wordpress/element";
import { useQueryClient } from "react-query";
import { CartContext } from "../context";
import MiniCart from "./MiniCart";
import RewardsList from "./RewardsList";
import CartItems from "./CartItems";
import CartTotals from "./CartTotals";
import SuggestedProducts from "./SuggestedProducts";

export default function Cart() {
	const queryClient = useQueryClient();
	const [showPopup, setShowPopup] = useState(false);
	const {
		cartInformation,
	} = useContext(CartContext);

	function invalidateQueries() {
		queryClient.invalidateQueries("cartInformation");
		queryClient.invalidateQueries("suggestedProducts");
		queryClient.invalidateQueries("rewards");
		setShowPopup(true);
	}

	useEffect(() => {
		$(document.body).on(
			"added_to_cart removed_from_cart",
			invalidateQueries
		);
	}, []);

	const main = (
		<>
			{cartInformation.data.is_empty ? (
				<div className="empty">
					<h4>Your Cart is Empty</h4>
					<p>Fill your cart with amazing products</p>
					<a href={cartInformation.data.shop_url}>Shop Now</a>
				</div>
			) : (
				<>
					<RewardsList />
					<CartItems />
					<CartTotals />

					<div className="grow-cart__proceed-to-checkout wc-proceed-to-checkout">
						<a
							href={cartInformation.data.checkout_url}
							className="checkout-button button alt wc-forward"
						>
							Proceed to checkout
						</a>
					</div>
				</>
			)}
		</>
	);

	return (
		<>
			{showPopup && (
				<div
					id="grow-cart"
					className={classNames("modal show", {
						["modal--small"]:
							!cartInformation.data.display_suggested_products ||
							!cartInformation.data.suggested_products.products
								.length,
					})}
				>
					<div className="modal-dialog modal-dialog-bottom">
						<div
							className={classNames("modal-content", {
								slideInUp: showPopup,
							})}
						>
							<div className="modal-header">
								<h5 className="modal-title">
									{cartInformation.data.cart_title}
								</h5>
								<button
									type="button"
									className="btn-close"
									onClick={() => setShowPopup(false)}
								>
									&times;
								</button>
							</div>

							<div className="modal-body">
								<div
									className={classNames("grow-cart__main", {
										["grow-cart__main-full"]: !cartInformation
											.data.suggested_products.products
											.length,
									})}
								>
									{main}
								</div>
								{cartInformation.data
									.display_suggested_products &&
									cartInformation.data.suggested_products.products
										.length > 0 ? (
									<div className="grow-cart__upsell">
										<SuggestedProducts />
									</div>
								) : null}
							</div>
						</div>
					</div>
				</div>
			)}

			<MiniCart setShowPopup={setShowPopup} />
		</>
	);
}
