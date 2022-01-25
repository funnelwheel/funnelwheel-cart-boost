import { useQuery, useQueryClient, useMutation } from "react-query";
import { getSuggestedProducts, addToCart } from "../api";

export default function SuggestedProducts() {
	const queryClient = useQueryClient();
	const { isLoading, error, data: suggestedProducts } = useQuery(
		["suggestedProducts"],
		getSuggestedProducts
	);
	const mutation = useMutation(addToCart, {
		onSuccess: (response) => {
			queryClient.invalidateQueries("cartInformation");
			$(document.body).trigger("wc_fragment_refresh");
		},
	});

	if (isLoading) return "Loading...";
	if (error) return "An error has occurred: " + error.message;

	return (
		<div className="SuggestedProducts">
			{suggestedProducts.data.map((item) => (
				<div className="SuggestedProducts__item">
					<div
						className="SuggestedProducts__item-thumbnail"
						dangerouslySetInnerHTML={{
							__html: item.product_thumbnail,
						}}
					/>
					<a href={item.product_permalink}>{item.product_title}</a>

					<div className="">
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
						>
							Add
						</button>
					</div>
				</div>
			))}
		</div>
	);
}
