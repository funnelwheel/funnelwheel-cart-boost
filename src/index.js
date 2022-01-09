import {render} from "@wordpress/element";
import Cart from "./components/Cart";

import "./sass/index.scss";

render(<Cart />, document.getElementById("woocommerce-sticky-cart-root"));
