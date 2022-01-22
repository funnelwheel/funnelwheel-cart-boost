import { ReactComponent as PlusIcon } from "./../svg/plus.svg";
import { ReactComponent as DashIcon } from "./../svg/dash.svg";

export default function QuantityInput({
	isLoading,
	quantity,
	min,
	max,
	onChange,
}) {
	return (
		<div className="CartItems__item-quantity">
			<button
				className="CartItems__item-quantity-decrease"
				disabled={quantity === min || min === max || isLoading}
				onClick={() => onChange(quantity - 1)}
			>
				<DashIcon />
			</button>
			<span className="CartItems__item-quantity">{quantity}</span>
			<button
				className="CartItems__item-quantity-increase"
				disabled={quantity === max || min === max || isLoading}
				onClick={() => onChange(quantity + 1)}
			>
				<PlusIcon />
			</button>
		</div>
	);
}
