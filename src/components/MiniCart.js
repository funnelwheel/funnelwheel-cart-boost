import { useState, useEffect } from "@wordpress/element";
import { useQuery } from "react-query";
import { getCartInformation } from "../api";
import Rewards from "./Rewards";
import { ReactComponent as ChevronUpIcon } from "./../svg/chevron-up.svg";
import { ReactComponent as BasketIcon } from "./../svg/basket.svg";

export default function MiniCart({ setShowPopup }) {
	const [showMiniCart, setShowMiniCart] = useState(
		!woocommerce_grow_cart.is_product
	);
	const { isLoading, error, data: cartInformation } = useQuery(
		["cartInformation"],
		getCartInformation
	);

	useEffect(() => {
		if (woocommerce_grow_cart.is_product) {
			window.onscroll = function () {
				setShowMiniCart(window.pageYOffset > 200);
			};
		}
	}, []);

	if (!showMiniCart) return null;
	if (isLoading) return "Loading...";
	if (error) return "An error has occurred: " + error.message;

	return (
		<div className="grow-cart-mini slideInUp">
			<div className="grow-cart-mini__inner">
				<Rewards>
					<div className="">
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
					</div>
				</Rewards>
			</div>
		</div>
	);
}
