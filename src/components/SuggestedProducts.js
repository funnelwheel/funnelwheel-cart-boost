import { useQuery } from "react-query";
import { getSuggestedProducts } from "../api";

export default function SuggestedProducts() {
	const { isLoading, error, data: suggestedProducts } = useQuery(
		["suggestedProducts"],
		getSuggestedProducts
	);

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

						<button type="button">Add</button>
					</div>
				</div>
			))}
		</div>
	);
}
