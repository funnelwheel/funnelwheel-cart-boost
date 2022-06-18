import $ from "jquery";
import { useState, useEffect, useContext } from "@wordpress/element";
import { CartContext } from "../context";
import { ReactComponent as ChevronUpIcon } from "./../svg/chevron-up.svg";
import { ReactComponent as BasketIcon } from "./../svg/basket.svg";
import RewardsList from "./RewardsList";

export default function MiniCart({ setShowPopup }) {
	const { cartInformation } = useContext(CartContext);
	const [showMiniCart, setShowMiniCart] = useState(
		woocommerce_growcart.display_mini_cart
	);

	function displayMiniCart() {
		setShowMiniCart(true);
	}

	useEffect(() => {
		$(document.body).on("added_to_cart removed_from_cart", displayMiniCart);
		if (woocommerce_growcart.is_product) {
			window.onscroll = function () {
				setShowMiniCart(window.pageYOffset > 200);
			};
		}
	}, []);

	if (!showMiniCart) {
		return null
	};

	return (
		<div className="grow-cart-mini slideInUp">
			<div className="grow-cart-mini__inner">
				<RewardsList>
					<>
						<span className="cart-contents">
							<BasketIcon />
							<span className="badge">
								{cartInformation.data.cart_contents_count}
							</span>
						</span>
						<button
							type="button"
							onClick={() => setShowPopup(true)}
						>
							<ChevronUpIcon />
						</button>
					</>
				</RewardsList>
			</div>
		</div>
	);
}
