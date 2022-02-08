const defaultConfig = require("@wordpress/scripts/config/webpack.config");

module.exports = {
	...defaultConfig,
	entry: {
		...defaultConfig.entry,
		"ajax-add-to-cart": "./src/ajax-add-to-cart.js",
		"rewards": "./src/rewards.js"
	},
};
