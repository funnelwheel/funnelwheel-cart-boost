import {useState} from "@wordpress/element";
import {CartContext} from "../context";
import CartItems from "./CartItems";

export default function Cart() {
	const [cart, updateCart] = useState(woocommerce_grow_cart.cart);

	console.log(cart);
	// return;

	return (
		<CartContext.Provider value={{cart, updateCart}}>
			<div id="grow-cart" className="modal show">
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">Your Cart (2)</h5>
							<button type="button" className="btn-close">
								&times;
							</button>
						</div>

						<div className="modal-body">
							<div className="grow-cart__main">
								{cart.is_empty ? (
									<div className="empty">
										<h4>Your Cart is Empty</h4>
										<p>Fill your cart with amazing broth</p>
										<button type="button">Shop Now</button>
									</div>
								) : (
									<CartItems />
								)}
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
