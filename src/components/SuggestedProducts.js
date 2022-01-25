import { useQuery } from "react-query";
import { getSuggestedProducts } from "../api";

export default function SuggestedProducts() {
	const { isLoading, error, data: suggestedProducts } = useQuery(
		["suggestedProducts"],
		getSuggestedProducts
	);

	if (isLoading) return "Loading...";
	if (error) return "An error has occurred: " + error.message;

	console.log(suggestedProducts);

	return (
		<div className="SuggestedProducts">
			{suggestedProducts.data.map((item) => (
				<div className="SuggestedProducts__item">
					<a href={item.product_permalink}>{item.product_title}</a>
				</div>
			))}
		</div>
	);
}
