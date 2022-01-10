import {useQuery} from "react-query";
import {getCartInformation} from "../api";

export default function Cart() {
	const {isLoading, isError, data, error} = useQuery(
		"cartInformation",
		getCartInformation
	);

	if (isLoading) return "Loading...";
	if (error) return "An error has occurred: " + error.message;

	console.log(data);

	return (
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
							<div className="empty">
								<h4>Your Cart is Empty</h4>
								<p>Fill your cart with amazing broth</p>
								<button type="button">Shop Now</button>
							</div>
						</div>
						<div className="grow-cart__upsell">
							<p>Some text in the Modal..</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
