export default function Cart() {
	return (
		<div id="StickyCart" className="modal show">
			<div className="modal-dialog modal-dialog-centered">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Your Cart (2)</h5>
						<button type="button" className="btn-close">
							&times;
						</button>
					</div>

                    <div className="modal-body">
    					<p>Some text in the Modal..</p>
    				</div>
				</div>
			</div>
		</div>
	);
}
