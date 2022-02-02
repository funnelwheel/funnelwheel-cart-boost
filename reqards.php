<?php
$rewards = [
	[
		'name'           => 'FREE SHIPPING',
		'type'           => 'FREE_SHIPPING',
		'minimum_orders' => 3,
		'value'          => 0,
	],
	[
		'name'           => '3%',
		'type'           => 'PERCENTAGE',
		'minimum_orders' => 5,
		'value'          => 3,
	],
	[
		'name'           => '6%',
		'type'           => 'PERCENTAGE',
		'minimum_orders' => 7,
		'value'          => 6,
	],
	[
		'name'           => '100 USD',
		'type'           => 'FIXED',
		'minimum_orders' => 10,
		'value'          => 100,
	],
	[
		'name'           => 'MYSTERY GIFTCARD',
		'type'           => 'GIFTCARD',
		'minimum_orders' => 20,
		'value'          => 100,
	],
];
