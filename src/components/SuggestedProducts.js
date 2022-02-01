import $ from "jquery";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { getSuggestedProducts, addToCart } from "../api";

export default function SuggestedProducts() {
	const queryClient = useQueryClient();
	const { isLoading, error, data: suggestedProducts } = useQuery(
		["suggestedProducts"],
		getSuggestedProducts
	);
	const mutation = useMutation(addToCart, {
		onSuccess: () => {
			queryClient.invalidateQueries("cartInformation");
			queryClient.invalidateQueries("suggestedProducts");
			$(document.body).trigger("wc_fragment_refresh");
		},
	});

	if (error) return "An error has occurred: " + error.message;

	return (
		<div className="SuggestedProducts">
			{isLoading ? (
				"Loading..."
			) : (
				<>
					<h4 className="SuggestedProducts__title">
						{suggestedProducts.data.title}
					</h4>

					{suggestedProducts.data.products.map((item, index) => (
						<div className="SuggestedProducts__item" key={index}>
							<div
								className="SuggestedProducts__item-thumbnail"
								dangerouslySetInnerHTML={{
									__html: item.product_thumbnail,
								}}
							/>

							<div className="SuggestedProducts__item-title-description-container">
								<a href={item.product_permalink}>
									{item.product_title}
								</a>

								<div className="SuggestedProducts__item-short-description">
									{item.product_short_description}
								</div>

								<div className="SuggestedProducts__item-subtotal-button-container">
									<div
										className="SuggestedProducts__item-subtotal"
										dangerouslySetInnerHTML={{
											__html: item.product_price,
										}}
									/>

									<button
										type="button"
										onClick={() =>
											mutation.mutate({
												product_id: item.product_id,
												quantity: 1,
											})
										}
										disabled={mutation.isLoading}
									>
										Add
									</button>
								</div>
							</div>
						</div>
					))}
				</>
			)}
		</div>
	);
}
