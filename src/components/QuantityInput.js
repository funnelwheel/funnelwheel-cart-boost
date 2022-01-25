import { ReactComponent as PlusIcon } from "./../svg/plus.svg";
import { ReactComponent as DashIcon } from "./../svg/dash.svg";
import { ReactComponent as TrashIcon } from "./../svg/trash.svg";

export default function QuantityInput({
	isLoading,
	quantity,
	min,
	max,
	onChange,
	onRemove,
}) {
	return (
		<div className="CartItems__item-quantity">
			<button
				type="button"
				className="CartItems__item-quantity-decrease"
				disabled={quantity === min || min === max || isLoading}
				onClick={() => onChange(quantity - 1)}
			>
				<DashIcon />
			</button>
			<span className="CartItems__item-quantity-value">{quantity}</span>
			<button
				type="button"
				className="CartItems__item-quantity-increase"
				disabled={quantity === max || min === max || isLoading}
				onClick={() => onChange(quantity + 1)}
			>
				<PlusIcon />
			</button>

			<button type="button" onClick={onRemove} disabled={isLoading}>
				<TrashIcon />
			</button>
		</div>
	);
}
