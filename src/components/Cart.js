import {useEffect} from "@wordpress/element";
import apiFetch from "@wordpress/api-fetch";
import {addQueryArgs} from "@@wordpress/url";

export default function Cart() {
	useEffect(() => {
		apiFetch({
			url: addQueryArgs(
				"http://localhost/wp/woocommerce/wp-admin/admin-ajax.php",
				{action: "woocommerce_get_cart_information"}
			)
		}).then(posts => {
			console.log(posts);
		});
	}, []);

	return (
		<div id="sticky-cart" className="modal show">
			<div className="modal-dialog modal-dialog-centered">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Your Cart (2)</h5>
						<button type="button" className="btn-close">
							&times;
						</button>
					</div>

					<div className="modal-body">
						<div className="sticky-cart__main">
							<div className="empty">
								<h4>Your Cart is Empty</h4>
								<p>Fill your cart with amazing broth</p>
								<button type="button">Shop Now</button>
							</div>
						</div>
						<div className="sticky-cart__upsell">
							<p>Some text in the Modal..</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
