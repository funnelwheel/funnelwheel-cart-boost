import { useState, useEffect } from "@wordpress/element";
import Rewards from "./Rewards";
import { ReactComponent as ChevronUpIcon } from "./../svg/chevron-up.svg";
import { ReactComponent as BasketIcon } from "./../svg/basket.svg";

export default function MiniCart({ setShowPopup }) {
	const [showMiniCart, setShowMiniCart] = useState(
		!woocommerce_grow_cart.is_product
	);

	useEffect(() => {
		if (woocommerce_grow_cart.is_product) {
			window.onscroll = function () {
				setShowMiniCart(window.pageYOffset > 200);
			};
		}
	}, []);

	if (!showMiniCart) return null;

	return (
		<div className="grow-cart-mini slideInUp">
			<div className="grow-cart-mini__inner">
				{/* <div>
                    <h5 className="grow-cart-mini__title">
                        {cartInformation.data.cart_title}
                    </h5>
                    <div
                        className="grow-cart-mini__total"
                        dangerouslySetInnerHTML={{
                            __html: cartInformation.data.total,
                        }}
                    />
                </div> */}

				<Rewards />
				<BasketIcon />
				<button type="button" onClick={() => setShowPopup(true)}>
					<ChevronUpIcon />
				</button>
			</div>
		</div>
	);
}
