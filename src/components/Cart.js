import { useState } from "@wordpress/element";
import { useQuery } from "react-query";
import classnames from "classnames";
import { CartContext } from "../context";
import { getCartInformation } from "../api";
import CartItems from "./CartItems";
import CartTotals from "./CartTotals";

export default function Cart() {
	const [showPopup, setShowPopup] = useState(true);
	const { isLoading, error, data: cartInformation } = useQuery(
		["cartInformation"],
		getCartInformation,
		{
			initialData: {
				data: woocommerce_grow_cart.cart,
			},
		}
	);

	if (isLoading) return "Loading...";
	if (error) return "An error has occurred: " + error.message;

	return (
		<CartContext.Provider value={{ cartInformation }}>
			<div
				id="grow-cart"
				className={classnames("modal", { show: showPopup })}
			>
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">Your Cart (2)</h5>
							<button
								type="button"
								className="btn-close"
								onClick={() => setShowPopup(false)}
							>
								&times;
							</button>
						</div>

						<div className="modal-body">
							<div className="grow-cart__main">
								{cartInformation.data.is_empty ? (
									<div className="empty">
										<h4>Your Cart is Empty</h4>
										<p>Fill your cart with amazing broth</p>
										<button type="button">Shop Now</button>
									</div>
								) : (
									<CartItems />
								)}

								<CartTotals />
							</div>
							<div className="grow-cart__upsell">
								<p>Some text in the Modal..</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</CartContext.Provider>
	);
}
