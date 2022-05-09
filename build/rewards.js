/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/admin/RewardsList.js":
/*!**********************************!*\
  !*** ./src/admin/RewardsList.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ RewardsList; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/v4.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _RulesList__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./RulesList */ "./src/admin/RulesList.js");





function RewardsList() {
  const activeRewardId = (0,uuid__WEBPACK_IMPORTED_MODULE_3__["default"])();
  const [rewards, setRewards] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)([{
    id: (0,uuid__WEBPACK_IMPORTED_MODULE_3__["default"])(),
    name: "Minimum cart contents",
    type: "minimum_cart_contents",
    enabled: false,
    rules: []
  }, {
    id: activeRewardId,
    name: "Minimum cart amount",
    type: "minimum_cart_amount",
    enabled: false,
    rules: [{
      id: (0,uuid__WEBPACK_IMPORTED_MODULE_3__["default"])(),
      name: "Free Fhipping",
      minimum_cart_amount: 10,
      value: 0
    }, {
      id: (0,uuid__WEBPACK_IMPORTED_MODULE_3__["default"])(),
      name: "1%",
      minimum_cart_amount: 20,
      value: 0
    }, {
      id: (0,uuid__WEBPACK_IMPORTED_MODULE_3__["default"])(),
      name: "20 USD",
      minimum_cart_amount: 50,
      value: 0
    }]
  }]);
  const [activeReward, setActiveReward] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(activeRewardId);
  const activeRewardItem = rewards.find(reward => reward.id === activeReward);
  console.log(activeRewardItem);

  function updateReward(reward) {
    setRewards(rewards.map(_reward => {
      if (_reward.id === reward.id) {
        return reward;
      }

      return _reward;
    }));
  }

  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {// const rewards = JSON.parse(
    // 	document.getElementById("setting-woocommerce_growcart_rewards")
    // 		.value
    // );
    // setRewards(rewards);
  }, []);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    document.getElementById("setting-woocommerce_growcart_rewards").value = JSON.stringify(rewards);
  }, [rewards]);
  const rewardTypeLabels = woocommerce_growcart_rewards.reward_rules.reduce((previousValue, currentValue) => {
    previousValue[currentValue.value] = currentValue.label;
    return previousValue;
  }, {});
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "RewardsListItem"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "RewardsListItem__col"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "RewardsListItem__type"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "RewardsListItem__type-label"
  }, "Reward type"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "RewardsListItem__type-value"
  }, rewardTypeLabels[activeRewardItem.type])), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_RulesList__WEBPACK_IMPORTED_MODULE_2__["default"], {
    reward: activeRewardItem,
    addRule: () => updateReward({ ...activeRewardItem,
      rules: [...activeRewardItem.rules, {
        id: (0,uuid__WEBPACK_IMPORTED_MODULE_3__["default"])(),
        name: "20 USD",
        minimum_cart_amount: 0,
        value: 0
      }]
    }),
    updateRule: () => {},
    removeRule: () => {}
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "RewardsListItem__col"
  }, "Preview"));
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "RewardsList"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("table", {
    className: "growcart-rewards widefat"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("thead", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
    scope: "col"
  }, "Status"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
    scope: "col"
  }, "Name"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
    scope: "col"
  }, "Type"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
    scope: "col"
  }, "Actions"))), rewards && rewards.length ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tbody", null, rewards.map(reward => {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
      checked: reward.enabled,
      onChange: () => {
        updateReward({ ...reward,
          enabled: !reward.enabled
        });
      }
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, reward.name), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, rewardTypeLabels[reward.type]), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      className: "growcart-reward-edit",
      href: "#",
      onClick: () => {
        setActiveReward(rewards.find(_reward => _reward.id === reward.id));
      }
    }, "Edit"), " | ", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      href: "#",
      className: "growcart-reward-delete",
      onClick: () => setRewards(rewards.filter(_reward => _reward.id !== reward.id))
    }, "Remove"))));
  })) : null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tfoot", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    colspan: "5"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    className: "button button-primary",
    onClick: () => setRewards([...rewards, {
      id: (0,uuid__WEBPACK_IMPORTED_MODULE_3__["default"])(),
      name: "FREE SHIPPING",
      type: "free_shipping",
      rule: "minimum_cart_contents",
      value: 0,
      minimum_cart_contents: 3,
      minimum_cart_amount: 0
    }])
  }, "Add reward"))))));
}

/***/ }),

/***/ "./src/admin/RulesList.js":
/*!********************************!*\
  !*** ./src/admin/RulesList.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ RulesList; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);


function RulesList(_ref) {
  let {
    reward,
    addRule,
    removeRule,
    updateRule
  } = _ref;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "RulesList"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "RulesList__top"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", {
    className: "RulesList__title"
  }, "Reward Rules"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    className: "RulesList__add",
    onClick: addRule
  }, "Add rule")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "RulesList__items"
  }, reward.rules && reward.rules.length ? reward.rules.map(rule => {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "RulesListItem"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
      checked: rule.enabled,
      onChange: () => {
        updateRule({ ...rule,
          enabled: !rule.enabled
        });
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
      label: "Name",
      value: rule.name,
      onChange: name => {
        updateRule({ ...rule,
          name
        });
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
      label: "Minimum cart amount",
      value: rule.value,
      onChange: value => {
        updateRule({ ...rule,
          value
        });
      }
    }), "minimum_cart_contents" === reward.type ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalNumberControl, {
      label: "Value",
      isShiftStepEnabled: true,
      onChange: minimum_cart_contents => {
        updateRule({ ...rule,
          minimum_cart_contents
        });
      },
      shiftStep: 10,
      value: rule.minimum_cart_contents
    }) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalNumberControl, {
      label: "Value",
      isShiftStepEnabled: true,
      onChange: minimum_cart_amount => {
        updateRule({ ...rule,
          minimum_cart_amount
        });
      },
      shiftStep: 10,
      value: rule.minimum_cart_amount
    }));
  }) : null));
}

/***/ }),

/***/ "./src/sass/admin-rewards.scss":
/*!*************************************!*\
  !*** ./src/sass/admin-rewards.scss ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/react-query/es/core/focusManager.js":
/*!**********************************************************!*\
  !*** ./node_modules/react-query/es/core/focusManager.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FocusManager": function() { return /* binding */ FocusManager; },
/* harmony export */   "focusManager": function() { return /* binding */ focusManager; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var _subscribable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./subscribable */ "./node_modules/react-query/es/core/subscribable.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./node_modules/react-query/es/core/utils.js");



var FocusManager = /*#__PURE__*/function (_Subscribable) {
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(FocusManager, _Subscribable);

  function FocusManager() {
    var _this;

    _this = _Subscribable.call(this) || this;

    _this.setup = function (onFocus) {
      var _window;

      if (!_utils__WEBPACK_IMPORTED_MODULE_1__.isServer && ((_window = window) == null ? void 0 : _window.addEventListener)) {
        var listener = function listener() {
          return onFocus();
        }; // Listen to visibillitychange and focus


        window.addEventListener('visibilitychange', listener, false);
        window.addEventListener('focus', listener, false);
        return function () {
          // Be sure to unsubscribe if a new handler is set
          window.removeEventListener('visibilitychange', listener);
          window.removeEventListener('focus', listener);
        };
      }
    };

    return _this;
  }

  var _proto = FocusManager.prototype;

  _proto.onSubscribe = function onSubscribe() {
    if (!this.cleanup) {
      this.setEventListener(this.setup);
    }
  };

  _proto.onUnsubscribe = function onUnsubscribe() {
    if (!this.hasListeners()) {
      var _this$cleanup;

      (_this$cleanup = this.cleanup) == null ? void 0 : _this$cleanup.call(this);
      this.cleanup = undefined;
    }
  };

  _proto.setEventListener = function setEventListener(setup) {
    var _this$cleanup2,
        _this2 = this;

    this.setup = setup;
    (_this$cleanup2 = this.cleanup) == null ? void 0 : _this$cleanup2.call(this);
    this.cleanup = setup(function (focused) {
      if (typeof focused === 'boolean') {
        _this2.setFocused(focused);
      } else {
        _this2.onFocus();
      }
    });
  };

  _proto.setFocused = function setFocused(focused) {
    this.focused = focused;

    if (focused) {
      this.onFocus();
    }
  };

  _proto.onFocus = function onFocus() {
    this.listeners.forEach(function (listener) {
      listener();
    });
  };

  _proto.isFocused = function isFocused() {
    if (typeof this.focused === 'boolean') {
      return this.focused;
    } // document global can be unavailable in react native


    if (typeof document === 'undefined') {
      return true;
    }

    return [undefined, 'visible', 'prerender'].includes(document.visibilityState);
  };

  return FocusManager;
}(_subscribable__WEBPACK_IMPORTED_MODULE_2__.Subscribable);
var focusManager = new FocusManager();

/***/ }),

/***/ "./node_modules/react-query/es/core/hydration.js":
/*!*******************************************************!*\
  !*** ./node_modules/react-query/es/core/hydration.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dehydrate": function() { return /* binding */ dehydrate; },
/* harmony export */   "hydrate": function() { return /* binding */ hydrate; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");


// TYPES
// FUNCTIONS
function dehydrateMutation(mutation) {
  return {
    mutationKey: mutation.options.mutationKey,
    state: mutation.state
  };
} // Most config is not dehydrated but instead meant to configure again when
// consuming the de/rehydrated data, typically with useQuery on the client.
// Sometimes it might make sense to prefetch data on the server and include
// in the html-payload, but not consume it on the initial render.


function dehydrateQuery(query) {
  return {
    state: query.state,
    queryKey: query.queryKey,
    queryHash: query.queryHash
  };
}

function defaultShouldDehydrateMutation(mutation) {
  return mutation.state.isPaused;
}

function defaultShouldDehydrateQuery(query) {
  return query.state.status === 'success';
}

function dehydrate(client, options) {
  var _options, _options2;

  options = options || {};
  var mutations = [];
  var queries = [];

  if (((_options = options) == null ? void 0 : _options.dehydrateMutations) !== false) {
    var shouldDehydrateMutation = options.shouldDehydrateMutation || defaultShouldDehydrateMutation;
    client.getMutationCache().getAll().forEach(function (mutation) {
      if (shouldDehydrateMutation(mutation)) {
        mutations.push(dehydrateMutation(mutation));
      }
    });
  }

  if (((_options2 = options) == null ? void 0 : _options2.dehydrateQueries) !== false) {
    var shouldDehydrateQuery = options.shouldDehydrateQuery || defaultShouldDehydrateQuery;
    client.getQueryCache().getAll().forEach(function (query) {
      if (shouldDehydrateQuery(query)) {
        queries.push(dehydrateQuery(query));
      }
    });
  }

  return {
    mutations: mutations,
    queries: queries
  };
}
function hydrate(client, dehydratedState, options) {
  if (typeof dehydratedState !== 'object' || dehydratedState === null) {
    return;
  }

  var mutationCache = client.getMutationCache();
  var queryCache = client.getQueryCache();
  var mutations = dehydratedState.mutations || [];
  var queries = dehydratedState.queries || [];
  mutations.forEach(function (dehydratedMutation) {
    var _options$defaultOptio;

    mutationCache.build(client, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, options == null ? void 0 : (_options$defaultOptio = options.defaultOptions) == null ? void 0 : _options$defaultOptio.mutations, {
      mutationKey: dehydratedMutation.mutationKey
    }), dehydratedMutation.state);
  });
  queries.forEach(function (dehydratedQuery) {
    var _options$defaultOptio2;

    var query = queryCache.get(dehydratedQuery.queryHash); // Do not hydrate if an existing query exists with newer data

    if (query) {
      if (query.state.dataUpdatedAt < dehydratedQuery.state.dataUpdatedAt) {
        query.setState(dehydratedQuery.state);
      }

      return;
    } // Restore query


    queryCache.build(client, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, options == null ? void 0 : (_options$defaultOptio2 = options.defaultOptions) == null ? void 0 : _options$defaultOptio2.queries, {
      queryKey: dehydratedQuery.queryKey,
      queryHash: dehydratedQuery.queryHash
    }), dehydratedQuery.state);
  });
}

/***/ }),

/***/ "./node_modules/react-query/es/core/index.js":
/*!***************************************************!*\
  !*** ./node_modules/react-query/es/core/index.js ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CancelledError": function() { return /* reexport safe */ _retryer__WEBPACK_IMPORTED_MODULE_0__.CancelledError; },
/* harmony export */   "QueryCache": function() { return /* reexport safe */ _queryCache__WEBPACK_IMPORTED_MODULE_1__.QueryCache; },
/* harmony export */   "QueryClient": function() { return /* reexport safe */ _queryClient__WEBPACK_IMPORTED_MODULE_2__.QueryClient; },
/* harmony export */   "QueryObserver": function() { return /* reexport safe */ _queryObserver__WEBPACK_IMPORTED_MODULE_3__.QueryObserver; },
/* harmony export */   "QueriesObserver": function() { return /* reexport safe */ _queriesObserver__WEBPACK_IMPORTED_MODULE_4__.QueriesObserver; },
/* harmony export */   "InfiniteQueryObserver": function() { return /* reexport safe */ _infiniteQueryObserver__WEBPACK_IMPORTED_MODULE_5__.InfiniteQueryObserver; },
/* harmony export */   "MutationCache": function() { return /* reexport safe */ _mutationCache__WEBPACK_IMPORTED_MODULE_6__.MutationCache; },
/* harmony export */   "MutationObserver": function() { return /* reexport safe */ _mutationObserver__WEBPACK_IMPORTED_MODULE_7__.MutationObserver; },
/* harmony export */   "setLogger": function() { return /* reexport safe */ _logger__WEBPACK_IMPORTED_MODULE_8__.setLogger; },
/* harmony export */   "notifyManager": function() { return /* reexport safe */ _notifyManager__WEBPACK_IMPORTED_MODULE_9__.notifyManager; },
/* harmony export */   "focusManager": function() { return /* reexport safe */ _focusManager__WEBPACK_IMPORTED_MODULE_10__.focusManager; },
/* harmony export */   "onlineManager": function() { return /* reexport safe */ _onlineManager__WEBPACK_IMPORTED_MODULE_11__.onlineManager; },
/* harmony export */   "hashQueryKey": function() { return /* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_12__.hashQueryKey; },
/* harmony export */   "isError": function() { return /* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_12__.isError; },
/* harmony export */   "isCancelledError": function() { return /* reexport safe */ _retryer__WEBPACK_IMPORTED_MODULE_0__.isCancelledError; },
/* harmony export */   "dehydrate": function() { return /* reexport safe */ _hydration__WEBPACK_IMPORTED_MODULE_13__.dehydrate; },
/* harmony export */   "hydrate": function() { return /* reexport safe */ _hydration__WEBPACK_IMPORTED_MODULE_13__.hydrate; }
/* harmony export */ });
/* harmony import */ var _retryer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./retryer */ "./node_modules/react-query/es/core/retryer.js");
/* harmony import */ var _queryCache__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./queryCache */ "./node_modules/react-query/es/core/queryCache.js");
/* harmony import */ var _queryClient__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./queryClient */ "./node_modules/react-query/es/core/queryClient.js");
/* harmony import */ var _queryObserver__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./queryObserver */ "./node_modules/react-query/es/core/queryObserver.js");
/* harmony import */ var _queriesObserver__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./queriesObserver */ "./node_modules/react-query/es/core/queriesObserver.js");
/* harmony import */ var _infiniteQueryObserver__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./infiniteQueryObserver */ "./node_modules/react-query/es/core/infiniteQueryObserver.js");
/* harmony import */ var _mutationCache__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./mutationCache */ "./node_modules/react-query/es/core/mutationCache.js");
/* harmony import */ var _mutationObserver__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./mutationObserver */ "./node_modules/react-query/es/core/mutationObserver.js");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./logger */ "./node_modules/react-query/es/core/logger.js");
/* harmony import */ var _notifyManager__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./notifyManager */ "./node_modules/react-query/es/core/notifyManager.js");
/* harmony import */ var _focusManager__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./focusManager */ "./node_modules/react-query/es/core/focusManager.js");
/* harmony import */ var _onlineManager__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./onlineManager */ "./node_modules/react-query/es/core/onlineManager.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./utils */ "./node_modules/react-query/es/core/utils.js");
/* harmony import */ var _hydration__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./hydration */ "./node_modules/react-query/es/core/hydration.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./types */ "./node_modules/react-query/es/core/types.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_types__WEBPACK_IMPORTED_MODULE_14__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _types__WEBPACK_IMPORTED_MODULE_14__) if(["default","CancelledError","QueryCache","QueryClient","QueryObserver","QueriesObserver","InfiniteQueryObserver","MutationCache","MutationObserver","setLogger","notifyManager","focusManager","onlineManager","hashQueryKey","isError","isCancelledError","dehydrate","hydrate"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = function(key) { return _types__WEBPACK_IMPORTED_MODULE_14__[key]; }.bind(0, __WEBPACK_IMPORT_KEY__)
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);














 // Types



/***/ }),

/***/ "./node_modules/react-query/es/core/infiniteQueryBehavior.js":
/*!*******************************************************************!*\
  !*** ./node_modules/react-query/es/core/infiniteQueryBehavior.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "infiniteQueryBehavior": function() { return /* binding */ infiniteQueryBehavior; },
/* harmony export */   "getNextPageParam": function() { return /* binding */ getNextPageParam; },
/* harmony export */   "getPreviousPageParam": function() { return /* binding */ getPreviousPageParam; },
/* harmony export */   "hasNextPage": function() { return /* binding */ hasNextPage; },
/* harmony export */   "hasPreviousPage": function() { return /* binding */ hasPreviousPage; }
/* harmony export */ });
/* harmony import */ var _retryer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./retryer */ "./node_modules/react-query/es/core/retryer.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./node_modules/react-query/es/core/utils.js");


function infiniteQueryBehavior() {
  return {
    onFetch: function onFetch(context) {
      context.fetchFn = function () {
        var _context$fetchOptions, _context$fetchOptions2, _context$fetchOptions3, _context$fetchOptions4, _context$state$data, _context$state$data2;

        var refetchPage = (_context$fetchOptions = context.fetchOptions) == null ? void 0 : (_context$fetchOptions2 = _context$fetchOptions.meta) == null ? void 0 : _context$fetchOptions2.refetchPage;
        var fetchMore = (_context$fetchOptions3 = context.fetchOptions) == null ? void 0 : (_context$fetchOptions4 = _context$fetchOptions3.meta) == null ? void 0 : _context$fetchOptions4.fetchMore;
        var pageParam = fetchMore == null ? void 0 : fetchMore.pageParam;
        var isFetchingNextPage = (fetchMore == null ? void 0 : fetchMore.direction) === 'forward';
        var isFetchingPreviousPage = (fetchMore == null ? void 0 : fetchMore.direction) === 'backward';
        var oldPages = ((_context$state$data = context.state.data) == null ? void 0 : _context$state$data.pages) || [];
        var oldPageParams = ((_context$state$data2 = context.state.data) == null ? void 0 : _context$state$data2.pageParams) || [];
        var abortController = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getAbortController)();
        var abortSignal = abortController == null ? void 0 : abortController.signal;
        var newPageParams = oldPageParams;
        var cancelled = false; // Get query function

        var queryFn = context.options.queryFn || function () {
          return Promise.reject('Missing queryFn');
        };

        var buildNewPages = function buildNewPages(pages, param, page, previous) {
          newPageParams = previous ? [param].concat(newPageParams) : [].concat(newPageParams, [param]);
          return previous ? [page].concat(pages) : [].concat(pages, [page]);
        }; // Create function to fetch a page


        var fetchPage = function fetchPage(pages, manual, param, previous) {
          if (cancelled) {
            return Promise.reject('Cancelled');
          }

          if (typeof param === 'undefined' && !manual && pages.length) {
            return Promise.resolve(pages);
          }

          var queryFnContext = {
            queryKey: context.queryKey,
            signal: abortSignal,
            pageParam: param,
            meta: context.meta
          };
          var queryFnResult = queryFn(queryFnContext);
          var promise = Promise.resolve(queryFnResult).then(function (page) {
            return buildNewPages(pages, param, page, previous);
          });

          if ((0,_retryer__WEBPACK_IMPORTED_MODULE_1__.isCancelable)(queryFnResult)) {
            var promiseAsAny = promise;
            promiseAsAny.cancel = queryFnResult.cancel;
          }

          return promise;
        };

        var promise; // Fetch first page?

        if (!oldPages.length) {
          promise = fetchPage([]);
        } // Fetch next page?
        else if (isFetchingNextPage) {
            var manual = typeof pageParam !== 'undefined';
            var param = manual ? pageParam : getNextPageParam(context.options, oldPages);
            promise = fetchPage(oldPages, manual, param);
          } // Fetch previous page?
          else if (isFetchingPreviousPage) {
              var _manual = typeof pageParam !== 'undefined';

              var _param = _manual ? pageParam : getPreviousPageParam(context.options, oldPages);

              promise = fetchPage(oldPages, _manual, _param, true);
            } // Refetch pages
            else {
                (function () {
                  newPageParams = [];
                  var manual = typeof context.options.getNextPageParam === 'undefined';
                  var shouldFetchFirstPage = refetchPage && oldPages[0] ? refetchPage(oldPages[0], 0, oldPages) : true; // Fetch first page

                  promise = shouldFetchFirstPage ? fetchPage([], manual, oldPageParams[0]) : Promise.resolve(buildNewPages([], oldPageParams[0], oldPages[0])); // Fetch remaining pages

                  var _loop = function _loop(i) {
                    promise = promise.then(function (pages) {
                      var shouldFetchNextPage = refetchPage && oldPages[i] ? refetchPage(oldPages[i], i, oldPages) : true;

                      if (shouldFetchNextPage) {
                        var _param2 = manual ? oldPageParams[i] : getNextPageParam(context.options, pages);

                        return fetchPage(pages, manual, _param2);
                      }

                      return Promise.resolve(buildNewPages(pages, oldPageParams[i], oldPages[i]));
                    });
                  };

                  for (var i = 1; i < oldPages.length; i++) {
                    _loop(i);
                  }
                })();
              }

        var finalPromise = promise.then(function (pages) {
          return {
            pages: pages,
            pageParams: newPageParams
          };
        });
        var finalPromiseAsAny = finalPromise;

        finalPromiseAsAny.cancel = function () {
          cancelled = true;
          abortController == null ? void 0 : abortController.abort();

          if ((0,_retryer__WEBPACK_IMPORTED_MODULE_1__.isCancelable)(promise)) {
            promise.cancel();
          }
        };

        return finalPromise;
      };
    }
  };
}
function getNextPageParam(options, pages) {
  return options.getNextPageParam == null ? void 0 : options.getNextPageParam(pages[pages.length - 1], pages);
}
function getPreviousPageParam(options, pages) {
  return options.getPreviousPageParam == null ? void 0 : options.getPreviousPageParam(pages[0], pages);
}
/**
 * Checks if there is a next page.
 * Returns `undefined` if it cannot be determined.
 */

function hasNextPage(options, pages) {
  if (options.getNextPageParam && Array.isArray(pages)) {
    var nextPageParam = getNextPageParam(options, pages);
    return typeof nextPageParam !== 'undefined' && nextPageParam !== null && nextPageParam !== false;
  }
}
/**
 * Checks if there is a previous page.
 * Returns `undefined` if it cannot be determined.
 */

function hasPreviousPage(options, pages) {
  if (options.getPreviousPageParam && Array.isArray(pages)) {
    var previousPageParam = getPreviousPageParam(options, pages);
    return typeof previousPageParam !== 'undefined' && previousPageParam !== null && previousPageParam !== false;
  }
}

/***/ }),

/***/ "./node_modules/react-query/es/core/infiniteQueryObserver.js":
/*!*******************************************************************!*\
  !*** ./node_modules/react-query/es/core/infiniteQueryObserver.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InfiniteQueryObserver": function() { return /* binding */ InfiniteQueryObserver; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var _queryObserver__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./queryObserver */ "./node_modules/react-query/es/core/queryObserver.js");
/* harmony import */ var _infiniteQueryBehavior__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./infiniteQueryBehavior */ "./node_modules/react-query/es/core/infiniteQueryBehavior.js");




var InfiniteQueryObserver = /*#__PURE__*/function (_QueryObserver) {
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(InfiniteQueryObserver, _QueryObserver);

  // Type override
  // Type override
  // Type override
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  function InfiniteQueryObserver(client, options) {
    return _QueryObserver.call(this, client, options) || this;
  }

  var _proto = InfiniteQueryObserver.prototype;

  _proto.bindMethods = function bindMethods() {
    _QueryObserver.prototype.bindMethods.call(this);

    this.fetchNextPage = this.fetchNextPage.bind(this);
    this.fetchPreviousPage = this.fetchPreviousPage.bind(this);
  };

  _proto.setOptions = function setOptions(options, notifyOptions) {
    _QueryObserver.prototype.setOptions.call(this, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, options, {
      behavior: (0,_infiniteQueryBehavior__WEBPACK_IMPORTED_MODULE_2__.infiniteQueryBehavior)()
    }), notifyOptions);
  };

  _proto.getOptimisticResult = function getOptimisticResult(options) {
    options.behavior = (0,_infiniteQueryBehavior__WEBPACK_IMPORTED_MODULE_2__.infiniteQueryBehavior)();
    return _QueryObserver.prototype.getOptimisticResult.call(this, options);
  };

  _proto.fetchNextPage = function fetchNextPage(options) {
    var _options$cancelRefetc;

    return this.fetch({
      // TODO consider removing `?? true` in future breaking change, to be consistent with `refetch` API (see https://github.com/tannerlinsley/react-query/issues/2617)
      cancelRefetch: (_options$cancelRefetc = options == null ? void 0 : options.cancelRefetch) != null ? _options$cancelRefetc : true,
      throwOnError: options == null ? void 0 : options.throwOnError,
      meta: {
        fetchMore: {
          direction: 'forward',
          pageParam: options == null ? void 0 : options.pageParam
        }
      }
    });
  };

  _proto.fetchPreviousPage = function fetchPreviousPage(options) {
    var _options$cancelRefetc2;

    return this.fetch({
      // TODO consider removing `?? true` in future breaking change, to be consistent with `refetch` API (see https://github.com/tannerlinsley/react-query/issues/2617)
      cancelRefetch: (_options$cancelRefetc2 = options == null ? void 0 : options.cancelRefetch) != null ? _options$cancelRefetc2 : true,
      throwOnError: options == null ? void 0 : options.throwOnError,
      meta: {
        fetchMore: {
          direction: 'backward',
          pageParam: options == null ? void 0 : options.pageParam
        }
      }
    });
  };

  _proto.createResult = function createResult(query, options) {
    var _state$data, _state$data2, _state$fetchMeta, _state$fetchMeta$fetc, _state$fetchMeta2, _state$fetchMeta2$fet;

    var state = query.state;

    var result = _QueryObserver.prototype.createResult.call(this, query, options);

    return (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, result, {
      fetchNextPage: this.fetchNextPage,
      fetchPreviousPage: this.fetchPreviousPage,
      hasNextPage: (0,_infiniteQueryBehavior__WEBPACK_IMPORTED_MODULE_2__.hasNextPage)(options, (_state$data = state.data) == null ? void 0 : _state$data.pages),
      hasPreviousPage: (0,_infiniteQueryBehavior__WEBPACK_IMPORTED_MODULE_2__.hasPreviousPage)(options, (_state$data2 = state.data) == null ? void 0 : _state$data2.pages),
      isFetchingNextPage: state.isFetching && ((_state$fetchMeta = state.fetchMeta) == null ? void 0 : (_state$fetchMeta$fetc = _state$fetchMeta.fetchMore) == null ? void 0 : _state$fetchMeta$fetc.direction) === 'forward',
      isFetchingPreviousPage: state.isFetching && ((_state$fetchMeta2 = state.fetchMeta) == null ? void 0 : (_state$fetchMeta2$fet = _state$fetchMeta2.fetchMore) == null ? void 0 : _state$fetchMeta2$fet.direction) === 'backward'
    });
  };

  return InfiniteQueryObserver;
}(_queryObserver__WEBPACK_IMPORTED_MODULE_3__.QueryObserver);

/***/ }),

/***/ "./node_modules/react-query/es/core/logger.js":
/*!****************************************************!*\
  !*** ./node_modules/react-query/es/core/logger.js ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getLogger": function() { return /* binding */ getLogger; },
/* harmony export */   "setLogger": function() { return /* binding */ setLogger; }
/* harmony export */ });
// TYPES
// FUNCTIONS
var logger = console;
function getLogger() {
  return logger;
}
function setLogger(newLogger) {
  logger = newLogger;
}

/***/ }),

/***/ "./node_modules/react-query/es/core/mutation.js":
/*!******************************************************!*\
  !*** ./node_modules/react-query/es/core/mutation.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Mutation": function() { return /* binding */ Mutation; },
/* harmony export */   "getDefaultState": function() { return /* binding */ getDefaultState; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./logger */ "./node_modules/react-query/es/core/logger.js");
/* harmony import */ var _notifyManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./notifyManager */ "./node_modules/react-query/es/core/notifyManager.js");
/* harmony import */ var _retryer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./retryer */ "./node_modules/react-query/es/core/retryer.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./node_modules/react-query/es/core/utils.js");




 // TYPES

// CLASS
var Mutation = /*#__PURE__*/function () {
  function Mutation(config) {
    this.options = (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, config.defaultOptions, config.options);
    this.mutationId = config.mutationId;
    this.mutationCache = config.mutationCache;
    this.observers = [];
    this.state = config.state || getDefaultState();
    this.meta = config.meta;
  }

  var _proto = Mutation.prototype;

  _proto.setState = function setState(state) {
    this.dispatch({
      type: 'setState',
      state: state
    });
  };

  _proto.addObserver = function addObserver(observer) {
    if (this.observers.indexOf(observer) === -1) {
      this.observers.push(observer);
    }
  };

  _proto.removeObserver = function removeObserver(observer) {
    this.observers = this.observers.filter(function (x) {
      return x !== observer;
    });
  };

  _proto.cancel = function cancel() {
    if (this.retryer) {
      this.retryer.cancel();
      return this.retryer.promise.then(_utils__WEBPACK_IMPORTED_MODULE_1__.noop).catch(_utils__WEBPACK_IMPORTED_MODULE_1__.noop);
    }

    return Promise.resolve();
  };

  _proto.continue = function _continue() {
    if (this.retryer) {
      this.retryer.continue();
      return this.retryer.promise;
    }

    return this.execute();
  };

  _proto.execute = function execute() {
    var _this = this;

    var data;
    var restored = this.state.status === 'loading';
    var promise = Promise.resolve();

    if (!restored) {
      this.dispatch({
        type: 'loading',
        variables: this.options.variables
      });
      promise = promise.then(function () {
        // Notify cache callback
        _this.mutationCache.config.onMutate == null ? void 0 : _this.mutationCache.config.onMutate(_this.state.variables, _this);
      }).then(function () {
        return _this.options.onMutate == null ? void 0 : _this.options.onMutate(_this.state.variables);
      }).then(function (context) {
        if (context !== _this.state.context) {
          _this.dispatch({
            type: 'loading',
            context: context,
            variables: _this.state.variables
          });
        }
      });
    }

    return promise.then(function () {
      return _this.executeMutation();
    }).then(function (result) {
      data = result; // Notify cache callback

      _this.mutationCache.config.onSuccess == null ? void 0 : _this.mutationCache.config.onSuccess(data, _this.state.variables, _this.state.context, _this);
    }).then(function () {
      return _this.options.onSuccess == null ? void 0 : _this.options.onSuccess(data, _this.state.variables, _this.state.context);
    }).then(function () {
      return _this.options.onSettled == null ? void 0 : _this.options.onSettled(data, null, _this.state.variables, _this.state.context);
    }).then(function () {
      _this.dispatch({
        type: 'success',
        data: data
      });

      return data;
    }).catch(function (error) {
      // Notify cache callback
      _this.mutationCache.config.onError == null ? void 0 : _this.mutationCache.config.onError(error, _this.state.variables, _this.state.context, _this); // Log error

      (0,_logger__WEBPACK_IMPORTED_MODULE_2__.getLogger)().error(error);
      return Promise.resolve().then(function () {
        return _this.options.onError == null ? void 0 : _this.options.onError(error, _this.state.variables, _this.state.context);
      }).then(function () {
        return _this.options.onSettled == null ? void 0 : _this.options.onSettled(undefined, error, _this.state.variables, _this.state.context);
      }).then(function () {
        _this.dispatch({
          type: 'error',
          error: error
        });

        throw error;
      });
    });
  };

  _proto.executeMutation = function executeMutation() {
    var _this2 = this,
        _this$options$retry;

    this.retryer = new _retryer__WEBPACK_IMPORTED_MODULE_3__.Retryer({
      fn: function fn() {
        if (!_this2.options.mutationFn) {
          return Promise.reject('No mutationFn found');
        }

        return _this2.options.mutationFn(_this2.state.variables);
      },
      onFail: function onFail() {
        _this2.dispatch({
          type: 'failed'
        });
      },
      onPause: function onPause() {
        _this2.dispatch({
          type: 'pause'
        });
      },
      onContinue: function onContinue() {
        _this2.dispatch({
          type: 'continue'
        });
      },
      retry: (_this$options$retry = this.options.retry) != null ? _this$options$retry : 0,
      retryDelay: this.options.retryDelay
    });
    return this.retryer.promise;
  };

  _proto.dispatch = function dispatch(action) {
    var _this3 = this;

    this.state = reducer(this.state, action);
    _notifyManager__WEBPACK_IMPORTED_MODULE_4__.notifyManager.batch(function () {
      _this3.observers.forEach(function (observer) {
        observer.onMutationUpdate(action);
      });

      _this3.mutationCache.notify(_this3);
    });
  };

  return Mutation;
}();
function getDefaultState() {
  return {
    context: undefined,
    data: undefined,
    error: null,
    failureCount: 0,
    isPaused: false,
    status: 'idle',
    variables: undefined
  };
}

function reducer(state, action) {
  switch (action.type) {
    case 'failed':
      return (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
        failureCount: state.failureCount + 1
      });

    case 'pause':
      return (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
        isPaused: true
      });

    case 'continue':
      return (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
        isPaused: false
      });

    case 'loading':
      return (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
        context: action.context,
        data: undefined,
        error: null,
        isPaused: false,
        status: 'loading',
        variables: action.variables
      });

    case 'success':
      return (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
        data: action.data,
        error: null,
        status: 'success',
        isPaused: false
      });

    case 'error':
      return (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
        data: undefined,
        error: action.error,
        failureCount: state.failureCount + 1,
        isPaused: false,
        status: 'error'
      });

    case 'setState':
      return (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, action.state);

    default:
      return state;
  }
}

/***/ }),

/***/ "./node_modules/react-query/es/core/mutationCache.js":
/*!***********************************************************!*\
  !*** ./node_modules/react-query/es/core/mutationCache.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MutationCache": function() { return /* binding */ MutationCache; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var _notifyManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./notifyManager */ "./node_modules/react-query/es/core/notifyManager.js");
/* harmony import */ var _mutation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mutation */ "./node_modules/react-query/es/core/mutation.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils */ "./node_modules/react-query/es/core/utils.js");
/* harmony import */ var _subscribable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./subscribable */ "./node_modules/react-query/es/core/subscribable.js");




 // TYPES

// CLASS
var MutationCache = /*#__PURE__*/function (_Subscribable) {
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(MutationCache, _Subscribable);

  function MutationCache(config) {
    var _this;

    _this = _Subscribable.call(this) || this;
    _this.config = config || {};
    _this.mutations = [];
    _this.mutationId = 0;
    return _this;
  }

  var _proto = MutationCache.prototype;

  _proto.build = function build(client, options, state) {
    var mutation = new _mutation__WEBPACK_IMPORTED_MODULE_1__.Mutation({
      mutationCache: this,
      mutationId: ++this.mutationId,
      options: client.defaultMutationOptions(options),
      state: state,
      defaultOptions: options.mutationKey ? client.getMutationDefaults(options.mutationKey) : undefined,
      meta: options.meta
    });
    this.add(mutation);
    return mutation;
  };

  _proto.add = function add(mutation) {
    this.mutations.push(mutation);
    this.notify(mutation);
  };

  _proto.remove = function remove(mutation) {
    this.mutations = this.mutations.filter(function (x) {
      return x !== mutation;
    });
    mutation.cancel();
    this.notify(mutation);
  };

  _proto.clear = function clear() {
    var _this2 = this;

    _notifyManager__WEBPACK_IMPORTED_MODULE_2__.notifyManager.batch(function () {
      _this2.mutations.forEach(function (mutation) {
        _this2.remove(mutation);
      });
    });
  };

  _proto.getAll = function getAll() {
    return this.mutations;
  };

  _proto.find = function find(filters) {
    if (typeof filters.exact === 'undefined') {
      filters.exact = true;
    }

    return this.mutations.find(function (mutation) {
      return (0,_utils__WEBPACK_IMPORTED_MODULE_3__.matchMutation)(filters, mutation);
    });
  };

  _proto.findAll = function findAll(filters) {
    return this.mutations.filter(function (mutation) {
      return (0,_utils__WEBPACK_IMPORTED_MODULE_3__.matchMutation)(filters, mutation);
    });
  };

  _proto.notify = function notify(mutation) {
    var _this3 = this;

    _notifyManager__WEBPACK_IMPORTED_MODULE_2__.notifyManager.batch(function () {
      _this3.listeners.forEach(function (listener) {
        listener(mutation);
      });
    });
  };

  _proto.onFocus = function onFocus() {
    this.resumePausedMutations();
  };

  _proto.onOnline = function onOnline() {
    this.resumePausedMutations();
  };

  _proto.resumePausedMutations = function resumePausedMutations() {
    var pausedMutations = this.mutations.filter(function (x) {
      return x.state.isPaused;
    });
    return _notifyManager__WEBPACK_IMPORTED_MODULE_2__.notifyManager.batch(function () {
      return pausedMutations.reduce(function (promise, mutation) {
        return promise.then(function () {
          return mutation.continue().catch(_utils__WEBPACK_IMPORTED_MODULE_3__.noop);
        });
      }, Promise.resolve());
    });
  };

  return MutationCache;
}(_subscribable__WEBPACK_IMPORTED_MODULE_4__.Subscribable);

/***/ }),

/***/ "./node_modules/react-query/es/core/mutationObserver.js":
/*!**************************************************************!*\
  !*** ./node_modules/react-query/es/core/mutationObserver.js ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MutationObserver": function() { return /* binding */ MutationObserver; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var _mutation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mutation */ "./node_modules/react-query/es/core/mutation.js");
/* harmony import */ var _notifyManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./notifyManager */ "./node_modules/react-query/es/core/notifyManager.js");
/* harmony import */ var _subscribable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./subscribable */ "./node_modules/react-query/es/core/subscribable.js");





// CLASS
var MutationObserver = /*#__PURE__*/function (_Subscribable) {
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(MutationObserver, _Subscribable);

  function MutationObserver(client, options) {
    var _this;

    _this = _Subscribable.call(this) || this;
    _this.client = client;

    _this.setOptions(options);

    _this.bindMethods();

    _this.updateResult();

    return _this;
  }

  var _proto = MutationObserver.prototype;

  _proto.bindMethods = function bindMethods() {
    this.mutate = this.mutate.bind(this);
    this.reset = this.reset.bind(this);
  };

  _proto.setOptions = function setOptions(options) {
    this.options = this.client.defaultMutationOptions(options);
  };

  _proto.onUnsubscribe = function onUnsubscribe() {
    if (!this.listeners.length) {
      var _this$currentMutation;

      (_this$currentMutation = this.currentMutation) == null ? void 0 : _this$currentMutation.removeObserver(this);
    }
  };

  _proto.onMutationUpdate = function onMutationUpdate(action) {
    this.updateResult(); // Determine which callbacks to trigger

    var notifyOptions = {
      listeners: true
    };

    if (action.type === 'success') {
      notifyOptions.onSuccess = true;
    } else if (action.type === 'error') {
      notifyOptions.onError = true;
    }

    this.notify(notifyOptions);
  };

  _proto.getCurrentResult = function getCurrentResult() {
    return this.currentResult;
  };

  _proto.reset = function reset() {
    this.currentMutation = undefined;
    this.updateResult();
    this.notify({
      listeners: true
    });
  };

  _proto.mutate = function mutate(variables, options) {
    this.mutateOptions = options;

    if (this.currentMutation) {
      this.currentMutation.removeObserver(this);
    }

    this.currentMutation = this.client.getMutationCache().build(this.client, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, this.options, {
      variables: typeof variables !== 'undefined' ? variables : this.options.variables
    }));
    this.currentMutation.addObserver(this);
    return this.currentMutation.execute();
  };

  _proto.updateResult = function updateResult() {
    var state = this.currentMutation ? this.currentMutation.state : (0,_mutation__WEBPACK_IMPORTED_MODULE_2__.getDefaultState)();

    var result = (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
      isLoading: state.status === 'loading',
      isSuccess: state.status === 'success',
      isError: state.status === 'error',
      isIdle: state.status === 'idle',
      mutate: this.mutate,
      reset: this.reset
    });

    this.currentResult = result;
  };

  _proto.notify = function notify(options) {
    var _this2 = this;

    _notifyManager__WEBPACK_IMPORTED_MODULE_3__.notifyManager.batch(function () {
      // First trigger the mutate callbacks
      if (_this2.mutateOptions) {
        if (options.onSuccess) {
          _this2.mutateOptions.onSuccess == null ? void 0 : _this2.mutateOptions.onSuccess(_this2.currentResult.data, _this2.currentResult.variables, _this2.currentResult.context);
          _this2.mutateOptions.onSettled == null ? void 0 : _this2.mutateOptions.onSettled(_this2.currentResult.data, null, _this2.currentResult.variables, _this2.currentResult.context);
        } else if (options.onError) {
          _this2.mutateOptions.onError == null ? void 0 : _this2.mutateOptions.onError(_this2.currentResult.error, _this2.currentResult.variables, _this2.currentResult.context);
          _this2.mutateOptions.onSettled == null ? void 0 : _this2.mutateOptions.onSettled(undefined, _this2.currentResult.error, _this2.currentResult.variables, _this2.currentResult.context);
        }
      } // Then trigger the listeners


      if (options.listeners) {
        _this2.listeners.forEach(function (listener) {
          listener(_this2.currentResult);
        });
      }
    });
  };

  return MutationObserver;
}(_subscribable__WEBPACK_IMPORTED_MODULE_4__.Subscribable);

/***/ }),

/***/ "./node_modules/react-query/es/core/notifyManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/react-query/es/core/notifyManager.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NotifyManager": function() { return /* binding */ NotifyManager; },
/* harmony export */   "notifyManager": function() { return /* binding */ notifyManager; }
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./node_modules/react-query/es/core/utils.js");
 // TYPES

// CLASS
var NotifyManager = /*#__PURE__*/function () {
  function NotifyManager() {
    this.queue = [];
    this.transactions = 0;

    this.notifyFn = function (callback) {
      callback();
    };

    this.batchNotifyFn = function (callback) {
      callback();
    };
  }

  var _proto = NotifyManager.prototype;

  _proto.batch = function batch(callback) {
    this.transactions++;
    var result = callback();
    this.transactions--;

    if (!this.transactions) {
      this.flush();
    }

    return result;
  };

  _proto.schedule = function schedule(callback) {
    var _this = this;

    if (this.transactions) {
      this.queue.push(callback);
    } else {
      (0,_utils__WEBPACK_IMPORTED_MODULE_0__.scheduleMicrotask)(function () {
        _this.notifyFn(callback);
      });
    }
  }
  /**
   * All calls to the wrapped function will be batched.
   */
  ;

  _proto.batchCalls = function batchCalls(callback) {
    var _this2 = this;

    return function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this2.schedule(function () {
        callback.apply(void 0, args);
      });
    };
  };

  _proto.flush = function flush() {
    var _this3 = this;

    var queue = this.queue;
    this.queue = [];

    if (queue.length) {
      (0,_utils__WEBPACK_IMPORTED_MODULE_0__.scheduleMicrotask)(function () {
        _this3.batchNotifyFn(function () {
          queue.forEach(function (callback) {
            _this3.notifyFn(callback);
          });
        });
      });
    }
  }
  /**
   * Use this method to set a custom notify function.
   * This can be used to for example wrap notifications with `React.act` while running tests.
   */
  ;

  _proto.setNotifyFunction = function setNotifyFunction(fn) {
    this.notifyFn = fn;
  }
  /**
   * Use this method to set a custom function to batch notifications together into a single tick.
   * By default React Query will use the batch function provided by ReactDOM or React Native.
   */
  ;

  _proto.setBatchNotifyFunction = function setBatchNotifyFunction(fn) {
    this.batchNotifyFn = fn;
  };

  return NotifyManager;
}(); // SINGLETON

var notifyManager = new NotifyManager();

/***/ }),

/***/ "./node_modules/react-query/es/core/onlineManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/react-query/es/core/onlineManager.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OnlineManager": function() { return /* binding */ OnlineManager; },
/* harmony export */   "onlineManager": function() { return /* binding */ onlineManager; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var _subscribable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./subscribable */ "./node_modules/react-query/es/core/subscribable.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./node_modules/react-query/es/core/utils.js");



var OnlineManager = /*#__PURE__*/function (_Subscribable) {
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(OnlineManager, _Subscribable);

  function OnlineManager() {
    var _this;

    _this = _Subscribable.call(this) || this;

    _this.setup = function (onOnline) {
      var _window;

      if (!_utils__WEBPACK_IMPORTED_MODULE_1__.isServer && ((_window = window) == null ? void 0 : _window.addEventListener)) {
        var listener = function listener() {
          return onOnline();
        }; // Listen to online


        window.addEventListener('online', listener, false);
        window.addEventListener('offline', listener, false);
        return function () {
          // Be sure to unsubscribe if a new handler is set
          window.removeEventListener('online', listener);
          window.removeEventListener('offline', listener);
        };
      }
    };

    return _this;
  }

  var _proto = OnlineManager.prototype;

  _proto.onSubscribe = function onSubscribe() {
    if (!this.cleanup) {
      this.setEventListener(this.setup);
    }
  };

  _proto.onUnsubscribe = function onUnsubscribe() {
    if (!this.hasListeners()) {
      var _this$cleanup;

      (_this$cleanup = this.cleanup) == null ? void 0 : _this$cleanup.call(this);
      this.cleanup = undefined;
    }
  };

  _proto.setEventListener = function setEventListener(setup) {
    var _this$cleanup2,
        _this2 = this;

    this.setup = setup;
    (_this$cleanup2 = this.cleanup) == null ? void 0 : _this$cleanup2.call(this);
    this.cleanup = setup(function (online) {
      if (typeof online === 'boolean') {
        _this2.setOnline(online);
      } else {
        _this2.onOnline();
      }
    });
  };

  _proto.setOnline = function setOnline(online) {
    this.online = online;

    if (online) {
      this.onOnline();
    }
  };

  _proto.onOnline = function onOnline() {
    this.listeners.forEach(function (listener) {
      listener();
    });
  };

  _proto.isOnline = function isOnline() {
    if (typeof this.online === 'boolean') {
      return this.online;
    }

    if (typeof navigator === 'undefined' || typeof navigator.onLine === 'undefined') {
      return true;
    }

    return navigator.onLine;
  };

  return OnlineManager;
}(_subscribable__WEBPACK_IMPORTED_MODULE_2__.Subscribable);
var onlineManager = new OnlineManager();

/***/ }),

/***/ "./node_modules/react-query/es/core/queriesObserver.js":
/*!*************************************************************!*\
  !*** ./node_modules/react-query/es/core/queriesObserver.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "QueriesObserver": function() { return /* binding */ QueriesObserver; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils */ "./node_modules/react-query/es/core/utils.js");
/* harmony import */ var _notifyManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./notifyManager */ "./node_modules/react-query/es/core/notifyManager.js");
/* harmony import */ var _queryObserver__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./queryObserver */ "./node_modules/react-query/es/core/queryObserver.js");
/* harmony import */ var _subscribable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./subscribable */ "./node_modules/react-query/es/core/subscribable.js");





var QueriesObserver = /*#__PURE__*/function (_Subscribable) {
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(QueriesObserver, _Subscribable);

  function QueriesObserver(client, queries) {
    var _this;

    _this = _Subscribable.call(this) || this;
    _this.client = client;
    _this.queries = [];
    _this.result = [];
    _this.observers = [];
    _this.observersMap = {};

    if (queries) {
      _this.setQueries(queries);
    }

    return _this;
  }

  var _proto = QueriesObserver.prototype;

  _proto.onSubscribe = function onSubscribe() {
    var _this2 = this;

    if (this.listeners.length === 1) {
      this.observers.forEach(function (observer) {
        observer.subscribe(function (result) {
          _this2.onUpdate(observer, result);
        });
      });
    }
  };

  _proto.onUnsubscribe = function onUnsubscribe() {
    if (!this.listeners.length) {
      this.destroy();
    }
  };

  _proto.destroy = function destroy() {
    this.listeners = [];
    this.observers.forEach(function (observer) {
      observer.destroy();
    });
  };

  _proto.setQueries = function setQueries(queries, notifyOptions) {
    this.queries = queries;
    this.updateObservers(notifyOptions);
  };

  _proto.getCurrentResult = function getCurrentResult() {
    return this.result;
  };

  _proto.getOptimisticResult = function getOptimisticResult(queries) {
    return this.findMatchingObservers(queries).map(function (match) {
      return match.observer.getOptimisticResult(match.defaultedQueryOptions);
    });
  };

  _proto.findMatchingObservers = function findMatchingObservers(queries) {
    var _this3 = this;

    var prevObservers = this.observers;
    var defaultedQueryOptions = queries.map(function (options) {
      return _this3.client.defaultQueryObserverOptions(options);
    });
    var matchingObservers = defaultedQueryOptions.flatMap(function (defaultedOptions) {
      var match = prevObservers.find(function (observer) {
        return observer.options.queryHash === defaultedOptions.queryHash;
      });

      if (match != null) {
        return [{
          defaultedQueryOptions: defaultedOptions,
          observer: match
        }];
      }

      return [];
    });
    var matchedQueryHashes = matchingObservers.map(function (match) {
      return match.defaultedQueryOptions.queryHash;
    });
    var unmatchedQueries = defaultedQueryOptions.filter(function (defaultedOptions) {
      return !matchedQueryHashes.includes(defaultedOptions.queryHash);
    });
    var unmatchedObservers = prevObservers.filter(function (prevObserver) {
      return !matchingObservers.some(function (match) {
        return match.observer === prevObserver;
      });
    });
    var newOrReusedObservers = unmatchedQueries.map(function (options, index) {
      if (options.keepPreviousData) {
        // return previous data from one of the observers that no longer match
        var previouslyUsedObserver = unmatchedObservers[index];

        if (previouslyUsedObserver !== undefined) {
          return {
            defaultedQueryOptions: options,
            observer: previouslyUsedObserver
          };
        }
      }

      return {
        defaultedQueryOptions: options,
        observer: _this3.getObserver(options)
      };
    });

    var sortMatchesByOrderOfQueries = function sortMatchesByOrderOfQueries(a, b) {
      return defaultedQueryOptions.indexOf(a.defaultedQueryOptions) - defaultedQueryOptions.indexOf(b.defaultedQueryOptions);
    };

    return matchingObservers.concat(newOrReusedObservers).sort(sortMatchesByOrderOfQueries);
  };

  _proto.getObserver = function getObserver(options) {
    var defaultedOptions = this.client.defaultQueryObserverOptions(options);
    var currentObserver = this.observersMap[defaultedOptions.queryHash];
    return currentObserver != null ? currentObserver : new _queryObserver__WEBPACK_IMPORTED_MODULE_1__.QueryObserver(this.client, defaultedOptions);
  };

  _proto.updateObservers = function updateObservers(notifyOptions) {
    var _this4 = this;

    _notifyManager__WEBPACK_IMPORTED_MODULE_2__.notifyManager.batch(function () {
      var prevObservers = _this4.observers;

      var newObserverMatches = _this4.findMatchingObservers(_this4.queries); // set options for the new observers to notify of changes


      newObserverMatches.forEach(function (match) {
        return match.observer.setOptions(match.defaultedQueryOptions, notifyOptions);
      });
      var newObservers = newObserverMatches.map(function (match) {
        return match.observer;
      });
      var newObserversMap = Object.fromEntries(newObservers.map(function (observer) {
        return [observer.options.queryHash, observer];
      }));
      var newResult = newObservers.map(function (observer) {
        return observer.getCurrentResult();
      });
      var hasIndexChange = newObservers.some(function (observer, index) {
        return observer !== prevObservers[index];
      });

      if (prevObservers.length === newObservers.length && !hasIndexChange) {
        return;
      }

      _this4.observers = newObservers;
      _this4.observersMap = newObserversMap;
      _this4.result = newResult;

      if (!_this4.hasListeners()) {
        return;
      }

      (0,_utils__WEBPACK_IMPORTED_MODULE_3__.difference)(prevObservers, newObservers).forEach(function (observer) {
        observer.destroy();
      });
      (0,_utils__WEBPACK_IMPORTED_MODULE_3__.difference)(newObservers, prevObservers).forEach(function (observer) {
        observer.subscribe(function (result) {
          _this4.onUpdate(observer, result);
        });
      });

      _this4.notify();
    });
  };

  _proto.onUpdate = function onUpdate(observer, result) {
    var index = this.observers.indexOf(observer);

    if (index !== -1) {
      this.result = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.replaceAt)(this.result, index, result);
      this.notify();
    }
  };

  _proto.notify = function notify() {
    var _this5 = this;

    _notifyManager__WEBPACK_IMPORTED_MODULE_2__.notifyManager.batch(function () {
      _this5.listeners.forEach(function (listener) {
        listener(_this5.result);
      });
    });
  };

  return QueriesObserver;
}(_subscribable__WEBPACK_IMPORTED_MODULE_4__.Subscribable);

/***/ }),

/***/ "./node_modules/react-query/es/core/query.js":
/*!***************************************************!*\
  !*** ./node_modules/react-query/es/core/query.js ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Query": function() { return /* binding */ Query; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./node_modules/react-query/es/core/utils.js");
/* harmony import */ var _notifyManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./notifyManager */ "./node_modules/react-query/es/core/notifyManager.js");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./logger */ "./node_modules/react-query/es/core/logger.js");
/* harmony import */ var _retryer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./retryer */ "./node_modules/react-query/es/core/retryer.js");




 // TYPES

// CLASS
var Query = /*#__PURE__*/function () {
  function Query(config) {
    this.abortSignalConsumed = false;
    this.hadObservers = false;
    this.defaultOptions = config.defaultOptions;
    this.setOptions(config.options);
    this.observers = [];
    this.cache = config.cache;
    this.queryKey = config.queryKey;
    this.queryHash = config.queryHash;
    this.initialState = config.state || this.getDefaultState(this.options);
    this.state = this.initialState;
    this.meta = config.meta;
    this.scheduleGc();
  }

  var _proto = Query.prototype;

  _proto.setOptions = function setOptions(options) {
    var _this$options$cacheTi;

    this.options = (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, this.defaultOptions, options);
    this.meta = options == null ? void 0 : options.meta; // Default to 5 minutes if not cache time is set

    this.cacheTime = Math.max(this.cacheTime || 0, (_this$options$cacheTi = this.options.cacheTime) != null ? _this$options$cacheTi : 5 * 60 * 1000);
  };

  _proto.setDefaultOptions = function setDefaultOptions(options) {
    this.defaultOptions = options;
  };

  _proto.scheduleGc = function scheduleGc() {
    var _this = this;

    this.clearGcTimeout();

    if ((0,_utils__WEBPACK_IMPORTED_MODULE_1__.isValidTimeout)(this.cacheTime)) {
      this.gcTimeout = setTimeout(function () {
        _this.optionalRemove();
      }, this.cacheTime);
    }
  };

  _proto.clearGcTimeout = function clearGcTimeout() {
    clearTimeout(this.gcTimeout);
    this.gcTimeout = undefined;
  };

  _proto.optionalRemove = function optionalRemove() {
    if (!this.observers.length) {
      if (this.state.isFetching) {
        if (this.hadObservers) {
          this.scheduleGc();
        }
      } else {
        this.cache.remove(this);
      }
    }
  };

  _proto.setData = function setData(updater, options) {
    var _this$options$isDataE, _this$options;

    var prevData = this.state.data; // Get the new data

    var data = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.functionalUpdate)(updater, prevData); // Use prev data if an isDataEqual function is defined and returns `true`

    if ((_this$options$isDataE = (_this$options = this.options).isDataEqual) == null ? void 0 : _this$options$isDataE.call(_this$options, prevData, data)) {
      data = prevData;
    } else if (this.options.structuralSharing !== false) {
      // Structurally share data between prev and new data if needed
      data = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.replaceEqualDeep)(prevData, data);
    } // Set data and mark it as cached


    this.dispatch({
      data: data,
      type: 'success',
      dataUpdatedAt: options == null ? void 0 : options.updatedAt
    });
    return data;
  };

  _proto.setState = function setState(state, setStateOptions) {
    this.dispatch({
      type: 'setState',
      state: state,
      setStateOptions: setStateOptions
    });
  };

  _proto.cancel = function cancel(options) {
    var _this$retryer;

    var promise = this.promise;
    (_this$retryer = this.retryer) == null ? void 0 : _this$retryer.cancel(options);
    return promise ? promise.then(_utils__WEBPACK_IMPORTED_MODULE_1__.noop).catch(_utils__WEBPACK_IMPORTED_MODULE_1__.noop) : Promise.resolve();
  };

  _proto.destroy = function destroy() {
    this.clearGcTimeout();
    this.cancel({
      silent: true
    });
  };

  _proto.reset = function reset() {
    this.destroy();
    this.setState(this.initialState);
  };

  _proto.isActive = function isActive() {
    return this.observers.some(function (observer) {
      return observer.options.enabled !== false;
    });
  };

  _proto.isFetching = function isFetching() {
    return this.state.isFetching;
  };

  _proto.isStale = function isStale() {
    return this.state.isInvalidated || !this.state.dataUpdatedAt || this.observers.some(function (observer) {
      return observer.getCurrentResult().isStale;
    });
  };

  _proto.isStaleByTime = function isStaleByTime(staleTime) {
    if (staleTime === void 0) {
      staleTime = 0;
    }

    return this.state.isInvalidated || !this.state.dataUpdatedAt || !(0,_utils__WEBPACK_IMPORTED_MODULE_1__.timeUntilStale)(this.state.dataUpdatedAt, staleTime);
  };

  _proto.onFocus = function onFocus() {
    var _this$retryer2;

    var observer = this.observers.find(function (x) {
      return x.shouldFetchOnWindowFocus();
    });

    if (observer) {
      observer.refetch();
    } // Continue fetch if currently paused


    (_this$retryer2 = this.retryer) == null ? void 0 : _this$retryer2.continue();
  };

  _proto.onOnline = function onOnline() {
    var _this$retryer3;

    var observer = this.observers.find(function (x) {
      return x.shouldFetchOnReconnect();
    });

    if (observer) {
      observer.refetch();
    } // Continue fetch if currently paused


    (_this$retryer3 = this.retryer) == null ? void 0 : _this$retryer3.continue();
  };

  _proto.addObserver = function addObserver(observer) {
    if (this.observers.indexOf(observer) === -1) {
      this.observers.push(observer);
      this.hadObservers = true; // Stop the query from being garbage collected

      this.clearGcTimeout();
      this.cache.notify({
        type: 'observerAdded',
        query: this,
        observer: observer
      });
    }
  };

  _proto.removeObserver = function removeObserver(observer) {
    if (this.observers.indexOf(observer) !== -1) {
      this.observers = this.observers.filter(function (x) {
        return x !== observer;
      });

      if (!this.observers.length) {
        // If the transport layer does not support cancellation
        // we'll let the query continue so the result can be cached
        if (this.retryer) {
          if (this.retryer.isTransportCancelable || this.abortSignalConsumed) {
            this.retryer.cancel({
              revert: true
            });
          } else {
            this.retryer.cancelRetry();
          }
        }

        if (this.cacheTime) {
          this.scheduleGc();
        } else {
          this.cache.remove(this);
        }
      }

      this.cache.notify({
        type: 'observerRemoved',
        query: this,
        observer: observer
      });
    }
  };

  _proto.getObserversCount = function getObserversCount() {
    return this.observers.length;
  };

  _proto.invalidate = function invalidate() {
    if (!this.state.isInvalidated) {
      this.dispatch({
        type: 'invalidate'
      });
    }
  };

  _proto.fetch = function fetch(options, fetchOptions) {
    var _this2 = this,
        _this$options$behavio,
        _context$fetchOptions,
        _abortController$abor;

    if (this.state.isFetching) {
      if (this.state.dataUpdatedAt && (fetchOptions == null ? void 0 : fetchOptions.cancelRefetch)) {
        // Silently cancel current fetch if the user wants to cancel refetches
        this.cancel({
          silent: true
        });
      } else if (this.promise) {
        var _this$retryer4;

        // make sure that retries that were potentially cancelled due to unmounts can continue
        (_this$retryer4 = this.retryer) == null ? void 0 : _this$retryer4.continueRetry(); // Return current promise if we are already fetching

        return this.promise;
      }
    } // Update config if passed, otherwise the config from the last execution is used


    if (options) {
      this.setOptions(options);
    } // Use the options from the first observer with a query function if no function is found.
    // This can happen when the query is hydrated or created with setQueryData.


    if (!this.options.queryFn) {
      var observer = this.observers.find(function (x) {
        return x.options.queryFn;
      });

      if (observer) {
        this.setOptions(observer.options);
      }
    }

    var queryKey = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.ensureQueryKeyArray)(this.queryKey);
    var abortController = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getAbortController)(); // Create query function context

    var queryFnContext = {
      queryKey: queryKey,
      pageParam: undefined,
      meta: this.meta
    };
    Object.defineProperty(queryFnContext, 'signal', {
      enumerable: true,
      get: function get() {
        if (abortController) {
          _this2.abortSignalConsumed = true;
          return abortController.signal;
        }

        return undefined;
      }
    }); // Create fetch function

    var fetchFn = function fetchFn() {
      if (!_this2.options.queryFn) {
        return Promise.reject('Missing queryFn');
      }

      _this2.abortSignalConsumed = false;
      return _this2.options.queryFn(queryFnContext);
    }; // Trigger behavior hook


    var context = {
      fetchOptions: fetchOptions,
      options: this.options,
      queryKey: queryKey,
      state: this.state,
      fetchFn: fetchFn,
      meta: this.meta
    };

    if ((_this$options$behavio = this.options.behavior) == null ? void 0 : _this$options$behavio.onFetch) {
      var _this$options$behavio2;

      (_this$options$behavio2 = this.options.behavior) == null ? void 0 : _this$options$behavio2.onFetch(context);
    } // Store state in case the current fetch needs to be reverted


    this.revertState = this.state; // Set to fetching state if not already in it

    if (!this.state.isFetching || this.state.fetchMeta !== ((_context$fetchOptions = context.fetchOptions) == null ? void 0 : _context$fetchOptions.meta)) {
      var _context$fetchOptions2;

      this.dispatch({
        type: 'fetch',
        meta: (_context$fetchOptions2 = context.fetchOptions) == null ? void 0 : _context$fetchOptions2.meta
      });
    } // Try to fetch the data


    this.retryer = new _retryer__WEBPACK_IMPORTED_MODULE_2__.Retryer({
      fn: context.fetchFn,
      abort: abortController == null ? void 0 : (_abortController$abor = abortController.abort) == null ? void 0 : _abortController$abor.bind(abortController),
      onSuccess: function onSuccess(data) {
        _this2.setData(data); // Notify cache callback


        _this2.cache.config.onSuccess == null ? void 0 : _this2.cache.config.onSuccess(data, _this2); // Remove query after fetching if cache time is 0

        if (_this2.cacheTime === 0) {
          _this2.optionalRemove();
        }
      },
      onError: function onError(error) {
        // Optimistically update state if needed
        if (!((0,_retryer__WEBPACK_IMPORTED_MODULE_2__.isCancelledError)(error) && error.silent)) {
          _this2.dispatch({
            type: 'error',
            error: error
          });
        }

        if (!(0,_retryer__WEBPACK_IMPORTED_MODULE_2__.isCancelledError)(error)) {
          // Notify cache callback
          _this2.cache.config.onError == null ? void 0 : _this2.cache.config.onError(error, _this2); // Log error

          (0,_logger__WEBPACK_IMPORTED_MODULE_3__.getLogger)().error(error);
        } // Remove query after fetching if cache time is 0


        if (_this2.cacheTime === 0) {
          _this2.optionalRemove();
        }
      },
      onFail: function onFail() {
        _this2.dispatch({
          type: 'failed'
        });
      },
      onPause: function onPause() {
        _this2.dispatch({
          type: 'pause'
        });
      },
      onContinue: function onContinue() {
        _this2.dispatch({
          type: 'continue'
        });
      },
      retry: context.options.retry,
      retryDelay: context.options.retryDelay
    });
    this.promise = this.retryer.promise;
    return this.promise;
  };

  _proto.dispatch = function dispatch(action) {
    var _this3 = this;

    this.state = this.reducer(this.state, action);
    _notifyManager__WEBPACK_IMPORTED_MODULE_4__.notifyManager.batch(function () {
      _this3.observers.forEach(function (observer) {
        observer.onQueryUpdate(action);
      });

      _this3.cache.notify({
        query: _this3,
        type: 'queryUpdated',
        action: action
      });
    });
  };

  _proto.getDefaultState = function getDefaultState(options) {
    var data = typeof options.initialData === 'function' ? options.initialData() : options.initialData;
    var hasInitialData = typeof options.initialData !== 'undefined';
    var initialDataUpdatedAt = hasInitialData ? typeof options.initialDataUpdatedAt === 'function' ? options.initialDataUpdatedAt() : options.initialDataUpdatedAt : 0;
    var hasData = typeof data !== 'undefined';
    return {
      data: data,
      dataUpdateCount: 0,
      dataUpdatedAt: hasData ? initialDataUpdatedAt != null ? initialDataUpdatedAt : Date.now() : 0,
      error: null,
      errorUpdateCount: 0,
      errorUpdatedAt: 0,
      fetchFailureCount: 0,
      fetchMeta: null,
      isFetching: false,
      isInvalidated: false,
      isPaused: false,
      status: hasData ? 'success' : 'idle'
    };
  };

  _proto.reducer = function reducer(state, action) {
    var _action$meta, _action$dataUpdatedAt;

    switch (action.type) {
      case 'failed':
        return (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          fetchFailureCount: state.fetchFailureCount + 1
        });

      case 'pause':
        return (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          isPaused: true
        });

      case 'continue':
        return (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          isPaused: false
        });

      case 'fetch':
        return (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          fetchFailureCount: 0,
          fetchMeta: (_action$meta = action.meta) != null ? _action$meta : null,
          isFetching: true,
          isPaused: false
        }, !state.dataUpdatedAt && {
          error: null,
          status: 'loading'
        });

      case 'success':
        return (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          data: action.data,
          dataUpdateCount: state.dataUpdateCount + 1,
          dataUpdatedAt: (_action$dataUpdatedAt = action.dataUpdatedAt) != null ? _action$dataUpdatedAt : Date.now(),
          error: null,
          fetchFailureCount: 0,
          isFetching: false,
          isInvalidated: false,
          isPaused: false,
          status: 'success'
        });

      case 'error':
        var error = action.error;

        if ((0,_retryer__WEBPACK_IMPORTED_MODULE_2__.isCancelledError)(error) && error.revert && this.revertState) {
          return (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, this.revertState);
        }

        return (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          error: error,
          errorUpdateCount: state.errorUpdateCount + 1,
          errorUpdatedAt: Date.now(),
          fetchFailureCount: state.fetchFailureCount + 1,
          isFetching: false,
          isPaused: false,
          status: 'error'
        });

      case 'invalidate':
        return (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          isInvalidated: true
        });

      case 'setState':
        return (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, action.state);

      default:
        return state;
    }
  };

  return Query;
}();

/***/ }),

/***/ "./node_modules/react-query/es/core/queryCache.js":
/*!********************************************************!*\
  !*** ./node_modules/react-query/es/core/queryCache.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "QueryCache": function() { return /* binding */ QueryCache; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./node_modules/react-query/es/core/utils.js");
/* harmony import */ var _query__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./query */ "./node_modules/react-query/es/core/query.js");
/* harmony import */ var _notifyManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./notifyManager */ "./node_modules/react-query/es/core/notifyManager.js");
/* harmony import */ var _subscribable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./subscribable */ "./node_modules/react-query/es/core/subscribable.js");





// CLASS
var QueryCache = /*#__PURE__*/function (_Subscribable) {
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(QueryCache, _Subscribable);

  function QueryCache(config) {
    var _this;

    _this = _Subscribable.call(this) || this;
    _this.config = config || {};
    _this.queries = [];
    _this.queriesMap = {};
    return _this;
  }

  var _proto = QueryCache.prototype;

  _proto.build = function build(client, options, state) {
    var _options$queryHash;

    var queryKey = options.queryKey;
    var queryHash = (_options$queryHash = options.queryHash) != null ? _options$queryHash : (0,_utils__WEBPACK_IMPORTED_MODULE_1__.hashQueryKeyByOptions)(queryKey, options);
    var query = this.get(queryHash);

    if (!query) {
      query = new _query__WEBPACK_IMPORTED_MODULE_2__.Query({
        cache: this,
        queryKey: queryKey,
        queryHash: queryHash,
        options: client.defaultQueryOptions(options),
        state: state,
        defaultOptions: client.getQueryDefaults(queryKey),
        meta: options.meta
      });
      this.add(query);
    }

    return query;
  };

  _proto.add = function add(query) {
    if (!this.queriesMap[query.queryHash]) {
      this.queriesMap[query.queryHash] = query;
      this.queries.push(query);
      this.notify({
        type: 'queryAdded',
        query: query
      });
    }
  };

  _proto.remove = function remove(query) {
    var queryInMap = this.queriesMap[query.queryHash];

    if (queryInMap) {
      query.destroy();
      this.queries = this.queries.filter(function (x) {
        return x !== query;
      });

      if (queryInMap === query) {
        delete this.queriesMap[query.queryHash];
      }

      this.notify({
        type: 'queryRemoved',
        query: query
      });
    }
  };

  _proto.clear = function clear() {
    var _this2 = this;

    _notifyManager__WEBPACK_IMPORTED_MODULE_3__.notifyManager.batch(function () {
      _this2.queries.forEach(function (query) {
        _this2.remove(query);
      });
    });
  };

  _proto.get = function get(queryHash) {
    return this.queriesMap[queryHash];
  };

  _proto.getAll = function getAll() {
    return this.queries;
  };

  _proto.find = function find(arg1, arg2) {
    var _parseFilterArgs = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.parseFilterArgs)(arg1, arg2),
        filters = _parseFilterArgs[0];

    if (typeof filters.exact === 'undefined') {
      filters.exact = true;
    }

    return this.queries.find(function (query) {
      return (0,_utils__WEBPACK_IMPORTED_MODULE_1__.matchQuery)(filters, query);
    });
  };

  _proto.findAll = function findAll(arg1, arg2) {
    var _parseFilterArgs2 = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.parseFilterArgs)(arg1, arg2),
        filters = _parseFilterArgs2[0];

    return Object.keys(filters).length > 0 ? this.queries.filter(function (query) {
      return (0,_utils__WEBPACK_IMPORTED_MODULE_1__.matchQuery)(filters, query);
    }) : this.queries;
  };

  _proto.notify = function notify(event) {
    var _this3 = this;

    _notifyManager__WEBPACK_IMPORTED_MODULE_3__.notifyManager.batch(function () {
      _this3.listeners.forEach(function (listener) {
        listener(event);
      });
    });
  };

  _proto.onFocus = function onFocus() {
    var _this4 = this;

    _notifyManager__WEBPACK_IMPORTED_MODULE_3__.notifyManager.batch(function () {
      _this4.queries.forEach(function (query) {
        query.onFocus();
      });
    });
  };

  _proto.onOnline = function onOnline() {
    var _this5 = this;

    _notifyManager__WEBPACK_IMPORTED_MODULE_3__.notifyManager.batch(function () {
      _this5.queries.forEach(function (query) {
        query.onOnline();
      });
    });
  };

  return QueryCache;
}(_subscribable__WEBPACK_IMPORTED_MODULE_4__.Subscribable);

/***/ }),

/***/ "./node_modules/react-query/es/core/queryClient.js":
/*!*********************************************************!*\
  !*** ./node_modules/react-query/es/core/queryClient.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "QueryClient": function() { return /* binding */ QueryClient; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils */ "./node_modules/react-query/es/core/utils.js");
/* harmony import */ var _queryCache__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./queryCache */ "./node_modules/react-query/es/core/queryCache.js");
/* harmony import */ var _mutationCache__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mutationCache */ "./node_modules/react-query/es/core/mutationCache.js");
/* harmony import */ var _focusManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./focusManager */ "./node_modules/react-query/es/core/focusManager.js");
/* harmony import */ var _onlineManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./onlineManager */ "./node_modules/react-query/es/core/onlineManager.js");
/* harmony import */ var _notifyManager__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./notifyManager */ "./node_modules/react-query/es/core/notifyManager.js");
/* harmony import */ var _infiniteQueryBehavior__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./infiniteQueryBehavior */ "./node_modules/react-query/es/core/infiniteQueryBehavior.js");








// CLASS
var QueryClient = /*#__PURE__*/function () {
  function QueryClient(config) {
    if (config === void 0) {
      config = {};
    }

    this.queryCache = config.queryCache || new _queryCache__WEBPACK_IMPORTED_MODULE_1__.QueryCache();
    this.mutationCache = config.mutationCache || new _mutationCache__WEBPACK_IMPORTED_MODULE_2__.MutationCache();
    this.defaultOptions = config.defaultOptions || {};
    this.queryDefaults = [];
    this.mutationDefaults = [];
  }

  var _proto = QueryClient.prototype;

  _proto.mount = function mount() {
    var _this = this;

    this.unsubscribeFocus = _focusManager__WEBPACK_IMPORTED_MODULE_3__.focusManager.subscribe(function () {
      if (_focusManager__WEBPACK_IMPORTED_MODULE_3__.focusManager.isFocused() && _onlineManager__WEBPACK_IMPORTED_MODULE_4__.onlineManager.isOnline()) {
        _this.mutationCache.onFocus();

        _this.queryCache.onFocus();
      }
    });
    this.unsubscribeOnline = _onlineManager__WEBPACK_IMPORTED_MODULE_4__.onlineManager.subscribe(function () {
      if (_focusManager__WEBPACK_IMPORTED_MODULE_3__.focusManager.isFocused() && _onlineManager__WEBPACK_IMPORTED_MODULE_4__.onlineManager.isOnline()) {
        _this.mutationCache.onOnline();

        _this.queryCache.onOnline();
      }
    });
  };

  _proto.unmount = function unmount() {
    var _this$unsubscribeFocu, _this$unsubscribeOnli;

    (_this$unsubscribeFocu = this.unsubscribeFocus) == null ? void 0 : _this$unsubscribeFocu.call(this);
    (_this$unsubscribeOnli = this.unsubscribeOnline) == null ? void 0 : _this$unsubscribeOnli.call(this);
  };

  _proto.isFetching = function isFetching(arg1, arg2) {
    var _parseFilterArgs = (0,_utils__WEBPACK_IMPORTED_MODULE_5__.parseFilterArgs)(arg1, arg2),
        filters = _parseFilterArgs[0];

    filters.fetching = true;
    return this.queryCache.findAll(filters).length;
  };

  _proto.isMutating = function isMutating(filters) {
    return this.mutationCache.findAll((0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, filters, {
      fetching: true
    })).length;
  };

  _proto.getQueryData = function getQueryData(queryKey, filters) {
    var _this$queryCache$find;

    return (_this$queryCache$find = this.queryCache.find(queryKey, filters)) == null ? void 0 : _this$queryCache$find.state.data;
  };

  _proto.getQueriesData = function getQueriesData(queryKeyOrFilters) {
    return this.getQueryCache().findAll(queryKeyOrFilters).map(function (_ref) {
      var queryKey = _ref.queryKey,
          state = _ref.state;
      var data = state.data;
      return [queryKey, data];
    });
  };

  _proto.setQueryData = function setQueryData(queryKey, updater, options) {
    var parsedOptions = (0,_utils__WEBPACK_IMPORTED_MODULE_5__.parseQueryArgs)(queryKey);
    var defaultedOptions = this.defaultQueryOptions(parsedOptions);
    return this.queryCache.build(this, defaultedOptions).setData(updater, options);
  };

  _proto.setQueriesData = function setQueriesData(queryKeyOrFilters, updater, options) {
    var _this2 = this;

    return _notifyManager__WEBPACK_IMPORTED_MODULE_6__.notifyManager.batch(function () {
      return _this2.getQueryCache().findAll(queryKeyOrFilters).map(function (_ref2) {
        var queryKey = _ref2.queryKey;
        return [queryKey, _this2.setQueryData(queryKey, updater, options)];
      });
    });
  };

  _proto.getQueryState = function getQueryState(queryKey, filters) {
    var _this$queryCache$find2;

    return (_this$queryCache$find2 = this.queryCache.find(queryKey, filters)) == null ? void 0 : _this$queryCache$find2.state;
  };

  _proto.removeQueries = function removeQueries(arg1, arg2) {
    var _parseFilterArgs2 = (0,_utils__WEBPACK_IMPORTED_MODULE_5__.parseFilterArgs)(arg1, arg2),
        filters = _parseFilterArgs2[0];

    var queryCache = this.queryCache;
    _notifyManager__WEBPACK_IMPORTED_MODULE_6__.notifyManager.batch(function () {
      queryCache.findAll(filters).forEach(function (query) {
        queryCache.remove(query);
      });
    });
  };

  _proto.resetQueries = function resetQueries(arg1, arg2, arg3) {
    var _this3 = this;

    var _parseFilterArgs3 = (0,_utils__WEBPACK_IMPORTED_MODULE_5__.parseFilterArgs)(arg1, arg2, arg3),
        filters = _parseFilterArgs3[0],
        options = _parseFilterArgs3[1];

    var queryCache = this.queryCache;

    var refetchFilters = (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, filters, {
      active: true
    });

    return _notifyManager__WEBPACK_IMPORTED_MODULE_6__.notifyManager.batch(function () {
      queryCache.findAll(filters).forEach(function (query) {
        query.reset();
      });
      return _this3.refetchQueries(refetchFilters, options);
    });
  };

  _proto.cancelQueries = function cancelQueries(arg1, arg2, arg3) {
    var _this4 = this;

    var _parseFilterArgs4 = (0,_utils__WEBPACK_IMPORTED_MODULE_5__.parseFilterArgs)(arg1, arg2, arg3),
        filters = _parseFilterArgs4[0],
        _parseFilterArgs4$ = _parseFilterArgs4[1],
        cancelOptions = _parseFilterArgs4$ === void 0 ? {} : _parseFilterArgs4$;

    if (typeof cancelOptions.revert === 'undefined') {
      cancelOptions.revert = true;
    }

    var promises = _notifyManager__WEBPACK_IMPORTED_MODULE_6__.notifyManager.batch(function () {
      return _this4.queryCache.findAll(filters).map(function (query) {
        return query.cancel(cancelOptions);
      });
    });
    return Promise.all(promises).then(_utils__WEBPACK_IMPORTED_MODULE_5__.noop).catch(_utils__WEBPACK_IMPORTED_MODULE_5__.noop);
  };

  _proto.invalidateQueries = function invalidateQueries(arg1, arg2, arg3) {
    var _ref3,
        _filters$refetchActiv,
        _filters$refetchInact,
        _this5 = this;

    var _parseFilterArgs5 = (0,_utils__WEBPACK_IMPORTED_MODULE_5__.parseFilterArgs)(arg1, arg2, arg3),
        filters = _parseFilterArgs5[0],
        options = _parseFilterArgs5[1];

    var refetchFilters = (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, filters, {
      // if filters.refetchActive is not provided and filters.active is explicitly false,
      // e.g. invalidateQueries({ active: false }), we don't want to refetch active queries
      active: (_ref3 = (_filters$refetchActiv = filters.refetchActive) != null ? _filters$refetchActiv : filters.active) != null ? _ref3 : true,
      inactive: (_filters$refetchInact = filters.refetchInactive) != null ? _filters$refetchInact : false
    });

    return _notifyManager__WEBPACK_IMPORTED_MODULE_6__.notifyManager.batch(function () {
      _this5.queryCache.findAll(filters).forEach(function (query) {
        query.invalidate();
      });

      return _this5.refetchQueries(refetchFilters, options);
    });
  };

  _proto.refetchQueries = function refetchQueries(arg1, arg2, arg3) {
    var _this6 = this;

    var _parseFilterArgs6 = (0,_utils__WEBPACK_IMPORTED_MODULE_5__.parseFilterArgs)(arg1, arg2, arg3),
        filters = _parseFilterArgs6[0],
        options = _parseFilterArgs6[1];

    var promises = _notifyManager__WEBPACK_IMPORTED_MODULE_6__.notifyManager.batch(function () {
      return _this6.queryCache.findAll(filters).map(function (query) {
        return query.fetch(undefined, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, options, {
          meta: {
            refetchPage: filters == null ? void 0 : filters.refetchPage
          }
        }));
      });
    });
    var promise = Promise.all(promises).then(_utils__WEBPACK_IMPORTED_MODULE_5__.noop);

    if (!(options == null ? void 0 : options.throwOnError)) {
      promise = promise.catch(_utils__WEBPACK_IMPORTED_MODULE_5__.noop);
    }

    return promise;
  };

  _proto.fetchQuery = function fetchQuery(arg1, arg2, arg3) {
    var parsedOptions = (0,_utils__WEBPACK_IMPORTED_MODULE_5__.parseQueryArgs)(arg1, arg2, arg3);
    var defaultedOptions = this.defaultQueryOptions(parsedOptions); // https://github.com/tannerlinsley/react-query/issues/652

    if (typeof defaultedOptions.retry === 'undefined') {
      defaultedOptions.retry = false;
    }

    var query = this.queryCache.build(this, defaultedOptions);
    return query.isStaleByTime(defaultedOptions.staleTime) ? query.fetch(defaultedOptions) : Promise.resolve(query.state.data);
  };

  _proto.prefetchQuery = function prefetchQuery(arg1, arg2, arg3) {
    return this.fetchQuery(arg1, arg2, arg3).then(_utils__WEBPACK_IMPORTED_MODULE_5__.noop).catch(_utils__WEBPACK_IMPORTED_MODULE_5__.noop);
  };

  _proto.fetchInfiniteQuery = function fetchInfiniteQuery(arg1, arg2, arg3) {
    var parsedOptions = (0,_utils__WEBPACK_IMPORTED_MODULE_5__.parseQueryArgs)(arg1, arg2, arg3);
    parsedOptions.behavior = (0,_infiniteQueryBehavior__WEBPACK_IMPORTED_MODULE_7__.infiniteQueryBehavior)();
    return this.fetchQuery(parsedOptions);
  };

  _proto.prefetchInfiniteQuery = function prefetchInfiniteQuery(arg1, arg2, arg3) {
    return this.fetchInfiniteQuery(arg1, arg2, arg3).then(_utils__WEBPACK_IMPORTED_MODULE_5__.noop).catch(_utils__WEBPACK_IMPORTED_MODULE_5__.noop);
  };

  _proto.cancelMutations = function cancelMutations() {
    var _this7 = this;

    var promises = _notifyManager__WEBPACK_IMPORTED_MODULE_6__.notifyManager.batch(function () {
      return _this7.mutationCache.getAll().map(function (mutation) {
        return mutation.cancel();
      });
    });
    return Promise.all(promises).then(_utils__WEBPACK_IMPORTED_MODULE_5__.noop).catch(_utils__WEBPACK_IMPORTED_MODULE_5__.noop);
  };

  _proto.resumePausedMutations = function resumePausedMutations() {
    return this.getMutationCache().resumePausedMutations();
  };

  _proto.executeMutation = function executeMutation(options) {
    return this.mutationCache.build(this, options).execute();
  };

  _proto.getQueryCache = function getQueryCache() {
    return this.queryCache;
  };

  _proto.getMutationCache = function getMutationCache() {
    return this.mutationCache;
  };

  _proto.getDefaultOptions = function getDefaultOptions() {
    return this.defaultOptions;
  };

  _proto.setDefaultOptions = function setDefaultOptions(options) {
    this.defaultOptions = options;
  };

  _proto.setQueryDefaults = function setQueryDefaults(queryKey, options) {
    var result = this.queryDefaults.find(function (x) {
      return (0,_utils__WEBPACK_IMPORTED_MODULE_5__.hashQueryKey)(queryKey) === (0,_utils__WEBPACK_IMPORTED_MODULE_5__.hashQueryKey)(x.queryKey);
    });

    if (result) {
      result.defaultOptions = options;
    } else {
      this.queryDefaults.push({
        queryKey: queryKey,
        defaultOptions: options
      });
    }
  };

  _proto.getQueryDefaults = function getQueryDefaults(queryKey) {
    var _this$queryDefaults$f;

    return queryKey ? (_this$queryDefaults$f = this.queryDefaults.find(function (x) {
      return (0,_utils__WEBPACK_IMPORTED_MODULE_5__.partialMatchKey)(queryKey, x.queryKey);
    })) == null ? void 0 : _this$queryDefaults$f.defaultOptions : undefined;
  };

  _proto.setMutationDefaults = function setMutationDefaults(mutationKey, options) {
    var result = this.mutationDefaults.find(function (x) {
      return (0,_utils__WEBPACK_IMPORTED_MODULE_5__.hashQueryKey)(mutationKey) === (0,_utils__WEBPACK_IMPORTED_MODULE_5__.hashQueryKey)(x.mutationKey);
    });

    if (result) {
      result.defaultOptions = options;
    } else {
      this.mutationDefaults.push({
        mutationKey: mutationKey,
        defaultOptions: options
      });
    }
  };

  _proto.getMutationDefaults = function getMutationDefaults(mutationKey) {
    var _this$mutationDefault;

    return mutationKey ? (_this$mutationDefault = this.mutationDefaults.find(function (x) {
      return (0,_utils__WEBPACK_IMPORTED_MODULE_5__.partialMatchKey)(mutationKey, x.mutationKey);
    })) == null ? void 0 : _this$mutationDefault.defaultOptions : undefined;
  };

  _proto.defaultQueryOptions = function defaultQueryOptions(options) {
    if (options == null ? void 0 : options._defaulted) {
      return options;
    }

    var defaultedOptions = (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, this.defaultOptions.queries, this.getQueryDefaults(options == null ? void 0 : options.queryKey), options, {
      _defaulted: true
    });

    if (!defaultedOptions.queryHash && defaultedOptions.queryKey) {
      defaultedOptions.queryHash = (0,_utils__WEBPACK_IMPORTED_MODULE_5__.hashQueryKeyByOptions)(defaultedOptions.queryKey, defaultedOptions);
    }

    return defaultedOptions;
  };

  _proto.defaultQueryObserverOptions = function defaultQueryObserverOptions(options) {
    return this.defaultQueryOptions(options);
  };

  _proto.defaultMutationOptions = function defaultMutationOptions(options) {
    if (options == null ? void 0 : options._defaulted) {
      return options;
    }

    return (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, this.defaultOptions.mutations, this.getMutationDefaults(options == null ? void 0 : options.mutationKey), options, {
      _defaulted: true
    });
  };

  _proto.clear = function clear() {
    this.queryCache.clear();
    this.mutationCache.clear();
  };

  return QueryClient;
}();

/***/ }),

/***/ "./node_modules/react-query/es/core/queryObserver.js":
/*!***********************************************************!*\
  !*** ./node_modules/react-query/es/core/queryObserver.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "QueryObserver": function() { return /* binding */ QueryObserver; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./node_modules/react-query/es/core/utils.js");
/* harmony import */ var _notifyManager__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./notifyManager */ "./node_modules/react-query/es/core/notifyManager.js");
/* harmony import */ var _focusManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./focusManager */ "./node_modules/react-query/es/core/focusManager.js");
/* harmony import */ var _subscribable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./subscribable */ "./node_modules/react-query/es/core/subscribable.js");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./logger */ "./node_modules/react-query/es/core/logger.js");
/* harmony import */ var _retryer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./retryer */ "./node_modules/react-query/es/core/retryer.js");








var QueryObserver = /*#__PURE__*/function (_Subscribable) {
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(QueryObserver, _Subscribable);

  function QueryObserver(client, options) {
    var _this;

    _this = _Subscribable.call(this) || this;
    _this.client = client;
    _this.options = options;
    _this.trackedProps = [];
    _this.previousSelectError = null;

    _this.bindMethods();

    _this.setOptions(options);

    return _this;
  }

  var _proto = QueryObserver.prototype;

  _proto.bindMethods = function bindMethods() {
    this.remove = this.remove.bind(this);
    this.refetch = this.refetch.bind(this);
  };

  _proto.onSubscribe = function onSubscribe() {
    if (this.listeners.length === 1) {
      this.currentQuery.addObserver(this);

      if (shouldFetchOnMount(this.currentQuery, this.options)) {
        this.executeFetch();
      }

      this.updateTimers();
    }
  };

  _proto.onUnsubscribe = function onUnsubscribe() {
    if (!this.listeners.length) {
      this.destroy();
    }
  };

  _proto.shouldFetchOnReconnect = function shouldFetchOnReconnect() {
    return _shouldFetchOnReconnect(this.currentQuery, this.options);
  };

  _proto.shouldFetchOnWindowFocus = function shouldFetchOnWindowFocus() {
    return _shouldFetchOnWindowFocus(this.currentQuery, this.options);
  };

  _proto.destroy = function destroy() {
    this.listeners = [];
    this.clearTimers();
    this.currentQuery.removeObserver(this);
  };

  _proto.setOptions = function setOptions(options, notifyOptions) {
    var prevOptions = this.options;
    var prevQuery = this.currentQuery;
    this.options = this.client.defaultQueryObserverOptions(options);

    if (typeof this.options.enabled !== 'undefined' && typeof this.options.enabled !== 'boolean') {
      throw new Error('Expected enabled to be a boolean');
    } // Keep previous query key if the user does not supply one


    if (!this.options.queryKey) {
      this.options.queryKey = prevOptions.queryKey;
    }

    this.updateQuery();
    var mounted = this.hasListeners(); // Fetch if there are subscribers

    if (mounted && shouldFetchOptionally(this.currentQuery, prevQuery, this.options, prevOptions)) {
      this.executeFetch();
    } // Update result


    this.updateResult(notifyOptions); // Update stale interval if needed

    if (mounted && (this.currentQuery !== prevQuery || this.options.enabled !== prevOptions.enabled || this.options.staleTime !== prevOptions.staleTime)) {
      this.updateStaleTimeout();
    }

    var nextRefetchInterval = this.computeRefetchInterval(); // Update refetch interval if needed

    if (mounted && (this.currentQuery !== prevQuery || this.options.enabled !== prevOptions.enabled || nextRefetchInterval !== this.currentRefetchInterval)) {
      this.updateRefetchInterval(nextRefetchInterval);
    }
  };

  _proto.getOptimisticResult = function getOptimisticResult(options) {
    var defaultedOptions = this.client.defaultQueryObserverOptions(options);
    var query = this.client.getQueryCache().build(this.client, defaultedOptions);
    return this.createResult(query, defaultedOptions);
  };

  _proto.getCurrentResult = function getCurrentResult() {
    return this.currentResult;
  };

  _proto.trackResult = function trackResult(result, defaultedOptions) {
    var _this2 = this;

    var trackedResult = {};

    var trackProp = function trackProp(key) {
      if (!_this2.trackedProps.includes(key)) {
        _this2.trackedProps.push(key);
      }
    };

    Object.keys(result).forEach(function (key) {
      Object.defineProperty(trackedResult, key, {
        configurable: false,
        enumerable: true,
        get: function get() {
          trackProp(key);
          return result[key];
        }
      });
    });

    if (defaultedOptions.useErrorBoundary || defaultedOptions.suspense) {
      trackProp('error');
    }

    return trackedResult;
  };

  _proto.getNextResult = function getNextResult(options) {
    var _this3 = this;

    return new Promise(function (resolve, reject) {
      var unsubscribe = _this3.subscribe(function (result) {
        if (!result.isFetching) {
          unsubscribe();

          if (result.isError && (options == null ? void 0 : options.throwOnError)) {
            reject(result.error);
          } else {
            resolve(result);
          }
        }
      });
    });
  };

  _proto.getCurrentQuery = function getCurrentQuery() {
    return this.currentQuery;
  };

  _proto.remove = function remove() {
    this.client.getQueryCache().remove(this.currentQuery);
  };

  _proto.refetch = function refetch(options) {
    return this.fetch((0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, options, {
      meta: {
        refetchPage: options == null ? void 0 : options.refetchPage
      }
    }));
  };

  _proto.fetchOptimistic = function fetchOptimistic(options) {
    var _this4 = this;

    var defaultedOptions = this.client.defaultQueryObserverOptions(options);
    var query = this.client.getQueryCache().build(this.client, defaultedOptions);
    return query.fetch().then(function () {
      return _this4.createResult(query, defaultedOptions);
    });
  };

  _proto.fetch = function fetch(fetchOptions) {
    var _this5 = this;

    return this.executeFetch(fetchOptions).then(function () {
      _this5.updateResult();

      return _this5.currentResult;
    });
  };

  _proto.executeFetch = function executeFetch(fetchOptions) {
    // Make sure we reference the latest query as the current one might have been removed
    this.updateQuery(); // Fetch

    var promise = this.currentQuery.fetch(this.options, fetchOptions);

    if (!(fetchOptions == null ? void 0 : fetchOptions.throwOnError)) {
      promise = promise.catch(_utils__WEBPACK_IMPORTED_MODULE_2__.noop);
    }

    return promise;
  };

  _proto.updateStaleTimeout = function updateStaleTimeout() {
    var _this6 = this;

    this.clearStaleTimeout();

    if (_utils__WEBPACK_IMPORTED_MODULE_2__.isServer || this.currentResult.isStale || !(0,_utils__WEBPACK_IMPORTED_MODULE_2__.isValidTimeout)(this.options.staleTime)) {
      return;
    }

    var time = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.timeUntilStale)(this.currentResult.dataUpdatedAt, this.options.staleTime); // The timeout is sometimes triggered 1 ms before the stale time expiration.
    // To mitigate this issue we always add 1 ms to the timeout.

    var timeout = time + 1;
    this.staleTimeoutId = setTimeout(function () {
      if (!_this6.currentResult.isStale) {
        _this6.updateResult();
      }
    }, timeout);
  };

  _proto.computeRefetchInterval = function computeRefetchInterval() {
    var _this$options$refetch;

    return typeof this.options.refetchInterval === 'function' ? this.options.refetchInterval(this.currentResult.data, this.currentQuery) : (_this$options$refetch = this.options.refetchInterval) != null ? _this$options$refetch : false;
  };

  _proto.updateRefetchInterval = function updateRefetchInterval(nextInterval) {
    var _this7 = this;

    this.clearRefetchInterval();
    this.currentRefetchInterval = nextInterval;

    if (_utils__WEBPACK_IMPORTED_MODULE_2__.isServer || this.options.enabled === false || !(0,_utils__WEBPACK_IMPORTED_MODULE_2__.isValidTimeout)(this.currentRefetchInterval) || this.currentRefetchInterval === 0) {
      return;
    }

    this.refetchIntervalId = setInterval(function () {
      if (_this7.options.refetchIntervalInBackground || _focusManager__WEBPACK_IMPORTED_MODULE_3__.focusManager.isFocused()) {
        _this7.executeFetch();
      }
    }, this.currentRefetchInterval);
  };

  _proto.updateTimers = function updateTimers() {
    this.updateStaleTimeout();
    this.updateRefetchInterval(this.computeRefetchInterval());
  };

  _proto.clearTimers = function clearTimers() {
    this.clearStaleTimeout();
    this.clearRefetchInterval();
  };

  _proto.clearStaleTimeout = function clearStaleTimeout() {
    clearTimeout(this.staleTimeoutId);
    this.staleTimeoutId = undefined;
  };

  _proto.clearRefetchInterval = function clearRefetchInterval() {
    clearInterval(this.refetchIntervalId);
    this.refetchIntervalId = undefined;
  };

  _proto.createResult = function createResult(query, options) {
    var prevQuery = this.currentQuery;
    var prevOptions = this.options;
    var prevResult = this.currentResult;
    var prevResultState = this.currentResultState;
    var prevResultOptions = this.currentResultOptions;
    var queryChange = query !== prevQuery;
    var queryInitialState = queryChange ? query.state : this.currentQueryInitialState;
    var prevQueryResult = queryChange ? this.currentResult : this.previousQueryResult;
    var state = query.state;
    var dataUpdatedAt = state.dataUpdatedAt,
        error = state.error,
        errorUpdatedAt = state.errorUpdatedAt,
        isFetching = state.isFetching,
        status = state.status;
    var isPreviousData = false;
    var isPlaceholderData = false;
    var data; // Optimistically set result in fetching state if needed

    if (options.optimisticResults) {
      var mounted = this.hasListeners();
      var fetchOnMount = !mounted && shouldFetchOnMount(query, options);
      var fetchOptionally = mounted && shouldFetchOptionally(query, prevQuery, options, prevOptions);

      if (fetchOnMount || fetchOptionally) {
        isFetching = true;

        if (!dataUpdatedAt) {
          status = 'loading';
        }
      }
    } // Keep previous data if needed


    if (options.keepPreviousData && !state.dataUpdateCount && (prevQueryResult == null ? void 0 : prevQueryResult.isSuccess) && status !== 'error') {
      data = prevQueryResult.data;
      dataUpdatedAt = prevQueryResult.dataUpdatedAt;
      status = prevQueryResult.status;
      isPreviousData = true;
    } // Select data if needed
    else if (options.select && typeof state.data !== 'undefined') {
        var _this$previousSelect;

        // Memoize select result
        if (prevResult && state.data === (prevResultState == null ? void 0 : prevResultState.data) && options.select === ((_this$previousSelect = this.previousSelect) == null ? void 0 : _this$previousSelect.fn) && !this.previousSelectError) {
          data = this.previousSelect.result;
        } else {
          try {
            data = options.select(state.data);
            this.previousSelect = {
              fn: options.select,
              result: data
            };

            if (options.structuralSharing !== false) {
              data = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.replaceEqualDeep)(prevResult == null ? void 0 : prevResult.data, data);
            }

            this.previousSelectError = null;
          } catch (selectError) {
            (0,_logger__WEBPACK_IMPORTED_MODULE_4__.getLogger)().error(selectError);
            error = selectError;
            this.previousSelectError = selectError;
            errorUpdatedAt = Date.now();
            status = 'error';
          }
        }
      } // Use query data
      else {
          data = state.data;
        } // Show placeholder data if needed


    if (typeof options.placeholderData !== 'undefined' && typeof data === 'undefined' && (status === 'loading' || status === 'idle')) {
      var placeholderData; // Memoize placeholder data

      if ((prevResult == null ? void 0 : prevResult.isPlaceholderData) && options.placeholderData === (prevResultOptions == null ? void 0 : prevResultOptions.placeholderData)) {
        placeholderData = prevResult.data;
      } else {
        placeholderData = typeof options.placeholderData === 'function' ? options.placeholderData() : options.placeholderData;

        if (options.select && typeof placeholderData !== 'undefined') {
          try {
            placeholderData = options.select(placeholderData);

            if (options.structuralSharing !== false) {
              placeholderData = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.replaceEqualDeep)(prevResult == null ? void 0 : prevResult.data, placeholderData);
            }

            this.previousSelectError = null;
          } catch (selectError) {
            (0,_logger__WEBPACK_IMPORTED_MODULE_4__.getLogger)().error(selectError);
            error = selectError;
            this.previousSelectError = selectError;
            errorUpdatedAt = Date.now();
            status = 'error';
          }
        }
      }

      if (typeof placeholderData !== 'undefined') {
        status = 'success';
        data = placeholderData;
        isPlaceholderData = true;
      }
    }

    var result = {
      status: status,
      isLoading: status === 'loading',
      isSuccess: status === 'success',
      isError: status === 'error',
      isIdle: status === 'idle',
      data: data,
      dataUpdatedAt: dataUpdatedAt,
      error: error,
      errorUpdatedAt: errorUpdatedAt,
      failureCount: state.fetchFailureCount,
      isFetched: state.dataUpdateCount > 0 || state.errorUpdateCount > 0,
      isFetchedAfterMount: state.dataUpdateCount > queryInitialState.dataUpdateCount || state.errorUpdateCount > queryInitialState.errorUpdateCount,
      isFetching: isFetching,
      isRefetching: isFetching && status !== 'loading',
      isLoadingError: status === 'error' && state.dataUpdatedAt === 0,
      isPlaceholderData: isPlaceholderData,
      isPreviousData: isPreviousData,
      isRefetchError: status === 'error' && state.dataUpdatedAt !== 0,
      isStale: isStale(query, options),
      refetch: this.refetch,
      remove: this.remove
    };
    return result;
  };

  _proto.shouldNotifyListeners = function shouldNotifyListeners(result, prevResult) {
    if (!prevResult) {
      return true;
    }

    var _this$options = this.options,
        notifyOnChangeProps = _this$options.notifyOnChangeProps,
        notifyOnChangePropsExclusions = _this$options.notifyOnChangePropsExclusions;

    if (!notifyOnChangeProps && !notifyOnChangePropsExclusions) {
      return true;
    }

    if (notifyOnChangeProps === 'tracked' && !this.trackedProps.length) {
      return true;
    }

    var includedProps = notifyOnChangeProps === 'tracked' ? this.trackedProps : notifyOnChangeProps;
    return Object.keys(result).some(function (key) {
      var typedKey = key;
      var changed = result[typedKey] !== prevResult[typedKey];
      var isIncluded = includedProps == null ? void 0 : includedProps.some(function (x) {
        return x === key;
      });
      var isExcluded = notifyOnChangePropsExclusions == null ? void 0 : notifyOnChangePropsExclusions.some(function (x) {
        return x === key;
      });
      return changed && !isExcluded && (!includedProps || isIncluded);
    });
  };

  _proto.updateResult = function updateResult(notifyOptions) {
    var prevResult = this.currentResult;
    this.currentResult = this.createResult(this.currentQuery, this.options);
    this.currentResultState = this.currentQuery.state;
    this.currentResultOptions = this.options; // Only notify if something has changed

    if ((0,_utils__WEBPACK_IMPORTED_MODULE_2__.shallowEqualObjects)(this.currentResult, prevResult)) {
      return;
    } // Determine which callbacks to trigger


    var defaultNotifyOptions = {
      cache: true
    };

    if ((notifyOptions == null ? void 0 : notifyOptions.listeners) !== false && this.shouldNotifyListeners(this.currentResult, prevResult)) {
      defaultNotifyOptions.listeners = true;
    }

    this.notify((0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, defaultNotifyOptions, notifyOptions));
  };

  _proto.updateQuery = function updateQuery() {
    var query = this.client.getQueryCache().build(this.client, this.options);

    if (query === this.currentQuery) {
      return;
    }

    var prevQuery = this.currentQuery;
    this.currentQuery = query;
    this.currentQueryInitialState = query.state;
    this.previousQueryResult = this.currentResult;

    if (this.hasListeners()) {
      prevQuery == null ? void 0 : prevQuery.removeObserver(this);
      query.addObserver(this);
    }
  };

  _proto.onQueryUpdate = function onQueryUpdate(action) {
    var notifyOptions = {};

    if (action.type === 'success') {
      notifyOptions.onSuccess = true;
    } else if (action.type === 'error' && !(0,_retryer__WEBPACK_IMPORTED_MODULE_5__.isCancelledError)(action.error)) {
      notifyOptions.onError = true;
    }

    this.updateResult(notifyOptions);

    if (this.hasListeners()) {
      this.updateTimers();
    }
  };

  _proto.notify = function notify(notifyOptions) {
    var _this8 = this;

    _notifyManager__WEBPACK_IMPORTED_MODULE_6__.notifyManager.batch(function () {
      // First trigger the configuration callbacks
      if (notifyOptions.onSuccess) {
        _this8.options.onSuccess == null ? void 0 : _this8.options.onSuccess(_this8.currentResult.data);
        _this8.options.onSettled == null ? void 0 : _this8.options.onSettled(_this8.currentResult.data, null);
      } else if (notifyOptions.onError) {
        _this8.options.onError == null ? void 0 : _this8.options.onError(_this8.currentResult.error);
        _this8.options.onSettled == null ? void 0 : _this8.options.onSettled(undefined, _this8.currentResult.error);
      } // Then trigger the listeners


      if (notifyOptions.listeners) {
        _this8.listeners.forEach(function (listener) {
          listener(_this8.currentResult);
        });
      } // Then the cache listeners


      if (notifyOptions.cache) {
        _this8.client.getQueryCache().notify({
          query: _this8.currentQuery,
          type: 'observerResultsUpdated'
        });
      }
    });
  };

  return QueryObserver;
}(_subscribable__WEBPACK_IMPORTED_MODULE_7__.Subscribable);

function shouldLoadOnMount(query, options) {
  return options.enabled !== false && !query.state.dataUpdatedAt && !(query.state.status === 'error' && options.retryOnMount === false);
}

function shouldRefetchOnMount(query, options) {
  return options.enabled !== false && query.state.dataUpdatedAt > 0 && (options.refetchOnMount === 'always' || options.refetchOnMount !== false && isStale(query, options));
}

function shouldFetchOnMount(query, options) {
  return shouldLoadOnMount(query, options) || shouldRefetchOnMount(query, options);
}

function _shouldFetchOnReconnect(query, options) {
  return options.enabled !== false && (options.refetchOnReconnect === 'always' || options.refetchOnReconnect !== false && isStale(query, options));
}

function _shouldFetchOnWindowFocus(query, options) {
  return options.enabled !== false && (options.refetchOnWindowFocus === 'always' || options.refetchOnWindowFocus !== false && isStale(query, options));
}

function shouldFetchOptionally(query, prevQuery, options, prevOptions) {
  return options.enabled !== false && (query !== prevQuery || prevOptions.enabled === false) && (!options.suspense || query.state.status !== 'error') && isStale(query, options);
}

function isStale(query, options) {
  return query.isStaleByTime(options.staleTime);
}

/***/ }),

/***/ "./node_modules/react-query/es/core/retryer.js":
/*!*****************************************************!*\
  !*** ./node_modules/react-query/es/core/retryer.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isCancelable": function() { return /* binding */ isCancelable; },
/* harmony export */   "CancelledError": function() { return /* binding */ CancelledError; },
/* harmony export */   "isCancelledError": function() { return /* binding */ isCancelledError; },
/* harmony export */   "Retryer": function() { return /* binding */ Retryer; }
/* harmony export */ });
/* harmony import */ var _focusManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./focusManager */ "./node_modules/react-query/es/core/focusManager.js");
/* harmony import */ var _onlineManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./onlineManager */ "./node_modules/react-query/es/core/onlineManager.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./node_modules/react-query/es/core/utils.js");




function defaultRetryDelay(failureCount) {
  return Math.min(1000 * Math.pow(2, failureCount), 30000);
}

function isCancelable(value) {
  return typeof (value == null ? void 0 : value.cancel) === 'function';
}
var CancelledError = function CancelledError(options) {
  this.revert = options == null ? void 0 : options.revert;
  this.silent = options == null ? void 0 : options.silent;
};
function isCancelledError(value) {
  return value instanceof CancelledError;
} // CLASS

var Retryer = function Retryer(config) {
  var _this = this;

  var cancelRetry = false;
  var cancelFn;
  var continueFn;
  var promiseResolve;
  var promiseReject;
  this.abort = config.abort;

  this.cancel = function (cancelOptions) {
    return cancelFn == null ? void 0 : cancelFn(cancelOptions);
  };

  this.cancelRetry = function () {
    cancelRetry = true;
  };

  this.continueRetry = function () {
    cancelRetry = false;
  };

  this.continue = function () {
    return continueFn == null ? void 0 : continueFn();
  };

  this.failureCount = 0;
  this.isPaused = false;
  this.isResolved = false;
  this.isTransportCancelable = false;
  this.promise = new Promise(function (outerResolve, outerReject) {
    promiseResolve = outerResolve;
    promiseReject = outerReject;
  });

  var resolve = function resolve(value) {
    if (!_this.isResolved) {
      _this.isResolved = true;
      config.onSuccess == null ? void 0 : config.onSuccess(value);
      continueFn == null ? void 0 : continueFn();
      promiseResolve(value);
    }
  };

  var reject = function reject(value) {
    if (!_this.isResolved) {
      _this.isResolved = true;
      config.onError == null ? void 0 : config.onError(value);
      continueFn == null ? void 0 : continueFn();
      promiseReject(value);
    }
  };

  var pause = function pause() {
    return new Promise(function (continueResolve) {
      continueFn = continueResolve;
      _this.isPaused = true;
      config.onPause == null ? void 0 : config.onPause();
    }).then(function () {
      continueFn = undefined;
      _this.isPaused = false;
      config.onContinue == null ? void 0 : config.onContinue();
    });
  }; // Create loop function


  var run = function run() {
    // Do nothing if already resolved
    if (_this.isResolved) {
      return;
    }

    var promiseOrValue; // Execute query

    try {
      promiseOrValue = config.fn();
    } catch (error) {
      promiseOrValue = Promise.reject(error);
    } // Create callback to cancel this fetch


    cancelFn = function cancelFn(cancelOptions) {
      if (!_this.isResolved) {
        reject(new CancelledError(cancelOptions));
        _this.abort == null ? void 0 : _this.abort(); // Cancel transport if supported

        if (isCancelable(promiseOrValue)) {
          try {
            promiseOrValue.cancel();
          } catch (_unused) {}
        }
      }
    }; // Check if the transport layer support cancellation


    _this.isTransportCancelable = isCancelable(promiseOrValue);
    Promise.resolve(promiseOrValue).then(resolve).catch(function (error) {
      var _config$retry, _config$retryDelay;

      // Stop if the fetch is already resolved
      if (_this.isResolved) {
        return;
      } // Do we need to retry the request?


      var retry = (_config$retry = config.retry) != null ? _config$retry : 3;
      var retryDelay = (_config$retryDelay = config.retryDelay) != null ? _config$retryDelay : defaultRetryDelay;
      var delay = typeof retryDelay === 'function' ? retryDelay(_this.failureCount, error) : retryDelay;
      var shouldRetry = retry === true || typeof retry === 'number' && _this.failureCount < retry || typeof retry === 'function' && retry(_this.failureCount, error);

      if (cancelRetry || !shouldRetry) {
        // We are done if the query does not need to be retried
        reject(error);
        return;
      }

      _this.failureCount++; // Notify on fail

      config.onFail == null ? void 0 : config.onFail(_this.failureCount, error); // Delay

      (0,_utils__WEBPACK_IMPORTED_MODULE_0__.sleep)(delay) // Pause if the document is not visible or when the device is offline
      .then(function () {
        if (!_focusManager__WEBPACK_IMPORTED_MODULE_1__.focusManager.isFocused() || !_onlineManager__WEBPACK_IMPORTED_MODULE_2__.onlineManager.isOnline()) {
          return pause();
        }
      }).then(function () {
        if (cancelRetry) {
          reject(error);
        } else {
          run();
        }
      });
    });
  }; // Start loop


  run();
};

/***/ }),

/***/ "./node_modules/react-query/es/core/subscribable.js":
/*!**********************************************************!*\
  !*** ./node_modules/react-query/es/core/subscribable.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Subscribable": function() { return /* binding */ Subscribable; }
/* harmony export */ });
var Subscribable = /*#__PURE__*/function () {
  function Subscribable() {
    this.listeners = [];
  }

  var _proto = Subscribable.prototype;

  _proto.subscribe = function subscribe(listener) {
    var _this = this;

    var callback = listener || function () {
      return undefined;
    };

    this.listeners.push(callback);
    this.onSubscribe();
    return function () {
      _this.listeners = _this.listeners.filter(function (x) {
        return x !== callback;
      });

      _this.onUnsubscribe();
    };
  };

  _proto.hasListeners = function hasListeners() {
    return this.listeners.length > 0;
  };

  _proto.onSubscribe = function onSubscribe() {// Do nothing
  };

  _proto.onUnsubscribe = function onUnsubscribe() {// Do nothing
  };

  return Subscribable;
}();

/***/ }),

/***/ "./node_modules/react-query/es/core/types.js":
/*!***************************************************!*\
  !*** ./node_modules/react-query/es/core/types.js ***!
  \***************************************************/
/***/ (function() {



/***/ }),

/***/ "./node_modules/react-query/es/core/utils.js":
/*!***************************************************!*\
  !*** ./node_modules/react-query/es/core/utils.js ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isServer": function() { return /* binding */ isServer; },
/* harmony export */   "noop": function() { return /* binding */ noop; },
/* harmony export */   "functionalUpdate": function() { return /* binding */ functionalUpdate; },
/* harmony export */   "isValidTimeout": function() { return /* binding */ isValidTimeout; },
/* harmony export */   "ensureQueryKeyArray": function() { return /* binding */ ensureQueryKeyArray; },
/* harmony export */   "difference": function() { return /* binding */ difference; },
/* harmony export */   "replaceAt": function() { return /* binding */ replaceAt; },
/* harmony export */   "timeUntilStale": function() { return /* binding */ timeUntilStale; },
/* harmony export */   "parseQueryArgs": function() { return /* binding */ parseQueryArgs; },
/* harmony export */   "parseMutationArgs": function() { return /* binding */ parseMutationArgs; },
/* harmony export */   "parseFilterArgs": function() { return /* binding */ parseFilterArgs; },
/* harmony export */   "parseMutationFilterArgs": function() { return /* binding */ parseMutationFilterArgs; },
/* harmony export */   "mapQueryStatusFilter": function() { return /* binding */ mapQueryStatusFilter; },
/* harmony export */   "matchQuery": function() { return /* binding */ matchQuery; },
/* harmony export */   "matchMutation": function() { return /* binding */ matchMutation; },
/* harmony export */   "hashQueryKeyByOptions": function() { return /* binding */ hashQueryKeyByOptions; },
/* harmony export */   "hashQueryKey": function() { return /* binding */ hashQueryKey; },
/* harmony export */   "stableValueHash": function() { return /* binding */ stableValueHash; },
/* harmony export */   "partialMatchKey": function() { return /* binding */ partialMatchKey; },
/* harmony export */   "partialDeepEqual": function() { return /* binding */ partialDeepEqual; },
/* harmony export */   "replaceEqualDeep": function() { return /* binding */ replaceEqualDeep; },
/* harmony export */   "shallowEqualObjects": function() { return /* binding */ shallowEqualObjects; },
/* harmony export */   "isPlainObject": function() { return /* binding */ isPlainObject; },
/* harmony export */   "isQueryKey": function() { return /* binding */ isQueryKey; },
/* harmony export */   "isError": function() { return /* binding */ isError; },
/* harmony export */   "sleep": function() { return /* binding */ sleep; },
/* harmony export */   "scheduleMicrotask": function() { return /* binding */ scheduleMicrotask; },
/* harmony export */   "getAbortController": function() { return /* binding */ getAbortController; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");

// TYPES
// UTILS
var isServer = typeof window === 'undefined';
function noop() {
  return undefined;
}
function functionalUpdate(updater, input) {
  return typeof updater === 'function' ? updater(input) : updater;
}
function isValidTimeout(value) {
  return typeof value === 'number' && value >= 0 && value !== Infinity;
}
function ensureQueryKeyArray(value) {
  return Array.isArray(value) ? value : [value];
}
function difference(array1, array2) {
  return array1.filter(function (x) {
    return array2.indexOf(x) === -1;
  });
}
function replaceAt(array, index, value) {
  var copy = array.slice(0);
  copy[index] = value;
  return copy;
}
function timeUntilStale(updatedAt, staleTime) {
  return Math.max(updatedAt + (staleTime || 0) - Date.now(), 0);
}
function parseQueryArgs(arg1, arg2, arg3) {
  if (!isQueryKey(arg1)) {
    return arg1;
  }

  if (typeof arg2 === 'function') {
    return (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, arg3, {
      queryKey: arg1,
      queryFn: arg2
    });
  }

  return (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, arg2, {
    queryKey: arg1
  });
}
function parseMutationArgs(arg1, arg2, arg3) {
  if (isQueryKey(arg1)) {
    if (typeof arg2 === 'function') {
      return (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, arg3, {
        mutationKey: arg1,
        mutationFn: arg2
      });
    }

    return (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, arg2, {
      mutationKey: arg1
    });
  }

  if (typeof arg1 === 'function') {
    return (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, arg2, {
      mutationFn: arg1
    });
  }

  return (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, arg1);
}
function parseFilterArgs(arg1, arg2, arg3) {
  return isQueryKey(arg1) ? [(0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, arg2, {
    queryKey: arg1
  }), arg3] : [arg1 || {}, arg2];
}
function parseMutationFilterArgs(arg1, arg2) {
  return isQueryKey(arg1) ? (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, arg2, {
    mutationKey: arg1
  }) : arg1;
}
function mapQueryStatusFilter(active, inactive) {
  if (active === true && inactive === true || active == null && inactive == null) {
    return 'all';
  } else if (active === false && inactive === false) {
    return 'none';
  } else {
    // At this point, active|inactive can only be true|false or false|true
    // so, when only one value is provided, the missing one has to be the negated value
    var isActive = active != null ? active : !inactive;
    return isActive ? 'active' : 'inactive';
  }
}
function matchQuery(filters, query) {
  var active = filters.active,
      exact = filters.exact,
      fetching = filters.fetching,
      inactive = filters.inactive,
      predicate = filters.predicate,
      queryKey = filters.queryKey,
      stale = filters.stale;

  if (isQueryKey(queryKey)) {
    if (exact) {
      if (query.queryHash !== hashQueryKeyByOptions(queryKey, query.options)) {
        return false;
      }
    } else if (!partialMatchKey(query.queryKey, queryKey)) {
      return false;
    }
  }

  var queryStatusFilter = mapQueryStatusFilter(active, inactive);

  if (queryStatusFilter === 'none') {
    return false;
  } else if (queryStatusFilter !== 'all') {
    var isActive = query.isActive();

    if (queryStatusFilter === 'active' && !isActive) {
      return false;
    }

    if (queryStatusFilter === 'inactive' && isActive) {
      return false;
    }
  }

  if (typeof stale === 'boolean' && query.isStale() !== stale) {
    return false;
  }

  if (typeof fetching === 'boolean' && query.isFetching() !== fetching) {
    return false;
  }

  if (predicate && !predicate(query)) {
    return false;
  }

  return true;
}
function matchMutation(filters, mutation) {
  var exact = filters.exact,
      fetching = filters.fetching,
      predicate = filters.predicate,
      mutationKey = filters.mutationKey;

  if (isQueryKey(mutationKey)) {
    if (!mutation.options.mutationKey) {
      return false;
    }

    if (exact) {
      if (hashQueryKey(mutation.options.mutationKey) !== hashQueryKey(mutationKey)) {
        return false;
      }
    } else if (!partialMatchKey(mutation.options.mutationKey, mutationKey)) {
      return false;
    }
  }

  if (typeof fetching === 'boolean' && mutation.state.status === 'loading' !== fetching) {
    return false;
  }

  if (predicate && !predicate(mutation)) {
    return false;
  }

  return true;
}
function hashQueryKeyByOptions(queryKey, options) {
  var hashFn = (options == null ? void 0 : options.queryKeyHashFn) || hashQueryKey;
  return hashFn(queryKey);
}
/**
 * Default query keys hash function.
 */

function hashQueryKey(queryKey) {
  var asArray = ensureQueryKeyArray(queryKey);
  return stableValueHash(asArray);
}
/**
 * Hashes the value into a stable hash.
 */

function stableValueHash(value) {
  return JSON.stringify(value, function (_, val) {
    return isPlainObject(val) ? Object.keys(val).sort().reduce(function (result, key) {
      result[key] = val[key];
      return result;
    }, {}) : val;
  });
}
/**
 * Checks if key `b` partially matches with key `a`.
 */

function partialMatchKey(a, b) {
  return partialDeepEqual(ensureQueryKeyArray(a), ensureQueryKeyArray(b));
}
/**
 * Checks if `b` partially matches with `a`.
 */

function partialDeepEqual(a, b) {
  if (a === b) {
    return true;
  }

  if (typeof a !== typeof b) {
    return false;
  }

  if (a && b && typeof a === 'object' && typeof b === 'object') {
    return !Object.keys(b).some(function (key) {
      return !partialDeepEqual(a[key], b[key]);
    });
  }

  return false;
}
/**
 * This function returns `a` if `b` is deeply equal.
 * If not, it will replace any deeply equal children of `b` with those of `a`.
 * This can be used for structural sharing between JSON values for example.
 */

function replaceEqualDeep(a, b) {
  if (a === b) {
    return a;
  }

  var array = Array.isArray(a) && Array.isArray(b);

  if (array || isPlainObject(a) && isPlainObject(b)) {
    var aSize = array ? a.length : Object.keys(a).length;
    var bItems = array ? b : Object.keys(b);
    var bSize = bItems.length;
    var copy = array ? [] : {};
    var equalItems = 0;

    for (var i = 0; i < bSize; i++) {
      var key = array ? i : bItems[i];
      copy[key] = replaceEqualDeep(a[key], b[key]);

      if (copy[key] === a[key]) {
        equalItems++;
      }
    }

    return aSize === bSize && equalItems === aSize ? a : copy;
  }

  return b;
}
/**
 * Shallow compare objects. Only works with objects that always have the same properties.
 */

function shallowEqualObjects(a, b) {
  if (a && !b || b && !a) {
    return false;
  }

  for (var key in a) {
    if (a[key] !== b[key]) {
      return false;
    }
  }

  return true;
} // Copied from: https://github.com/jonschlinkert/is-plain-object

function isPlainObject(o) {
  if (!hasObjectPrototype(o)) {
    return false;
  } // If has modified constructor


  var ctor = o.constructor;

  if (typeof ctor === 'undefined') {
    return true;
  } // If has modified prototype


  var prot = ctor.prototype;

  if (!hasObjectPrototype(prot)) {
    return false;
  } // If constructor does not have an Object-specific method


  if (!prot.hasOwnProperty('isPrototypeOf')) {
    return false;
  } // Most likely a plain Object


  return true;
}

function hasObjectPrototype(o) {
  return Object.prototype.toString.call(o) === '[object Object]';
}

function isQueryKey(value) {
  return typeof value === 'string' || Array.isArray(value);
}
function isError(value) {
  return value instanceof Error;
}
function sleep(timeout) {
  return new Promise(function (resolve) {
    setTimeout(resolve, timeout);
  });
}
/**
 * Schedules a microtask.
 * This can be useful to schedule state updates after rendering.
 */

function scheduleMicrotask(callback) {
  Promise.resolve().then(callback).catch(function (error) {
    return setTimeout(function () {
      throw error;
    });
  });
}
function getAbortController() {
  if (typeof AbortController === 'function') {
    return new AbortController();
  }
}

/***/ }),

/***/ "./node_modules/react-query/es/index.js":
/*!**********************************************!*\
  !*** ./node_modules/react-query/es/index.js ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core */ "./node_modules/react-query/es/core/index.js");
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _core__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = function(key) { return _core__WEBPACK_IMPORTED_MODULE_0__[key]; }.bind(0, __WEBPACK_IMPORT_KEY__)
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* harmony import */ var _react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./react */ "./node_modules/react-query/es/react/index.js");
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _react__WEBPACK_IMPORTED_MODULE_1__) if(["default","CancelledError","QueryCache","QueryClient","QueryObserver","QueriesObserver","InfiniteQueryObserver","MutationCache","MutationObserver","setLogger","notifyManager","focusManager","onlineManager","hashQueryKey","isError","isCancelledError","dehydrate","hydrate"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = function(key) { return _react__WEBPACK_IMPORTED_MODULE_1__[key]; }.bind(0, __WEBPACK_IMPORT_KEY__)
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);



/***/ }),

/***/ "./node_modules/react-query/es/react/Hydrate.js":
/*!******************************************************!*\
  !*** ./node_modules/react-query/es/react/Hydrate.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useHydrate": function() { return /* binding */ useHydrate; },
/* harmony export */   "Hydrate": function() { return /* binding */ Hydrate; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core */ "./node_modules/react-query/es/core/hydration.js");
/* harmony import */ var _QueryClientProvider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./QueryClientProvider */ "./node_modules/react-query/es/react/QueryClientProvider.js");



function useHydrate(state, options) {
  var queryClient = (0,_QueryClientProvider__WEBPACK_IMPORTED_MODULE_1__.useQueryClient)();
  var optionsRef = react__WEBPACK_IMPORTED_MODULE_0___default().useRef(options);
  optionsRef.current = options; // Running hydrate again with the same queries is safe,
  // it wont overwrite or initialize existing queries,
  // relying on useMemo here is only a performance optimization.
  // hydrate can and should be run *during* render here for SSR to work properly

  react__WEBPACK_IMPORTED_MODULE_0___default().useMemo(function () {
    if (state) {
      (0,_core__WEBPACK_IMPORTED_MODULE_2__.hydrate)(queryClient, state, optionsRef.current);
    }
  }, [queryClient, state]);
}
var Hydrate = function Hydrate(_ref) {
  var children = _ref.children,
      options = _ref.options,
      state = _ref.state;
  useHydrate(state, options);
  return children;
};

/***/ }),

/***/ "./node_modules/react-query/es/react/QueryClientProvider.js":
/*!******************************************************************!*\
  !*** ./node_modules/react-query/es/react/QueryClientProvider.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useQueryClient": function() { return /* binding */ useQueryClient; },
/* harmony export */   "QueryClientProvider": function() { return /* binding */ QueryClientProvider; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

var defaultContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createContext(undefined);
var QueryClientSharingContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createContext(false); // if contextSharing is on, we share the first and at least one
// instance of the context across the window
// to ensure that if React Query is used across
// different bundles or microfrontends they will
// all use the same **instance** of context, regardless
// of module scoping.

function getQueryClientContext(contextSharing) {
  if (contextSharing && typeof window !== 'undefined') {
    if (!window.ReactQueryClientContext) {
      window.ReactQueryClientContext = defaultContext;
    }

    return window.ReactQueryClientContext;
  }

  return defaultContext;
}

var useQueryClient = function useQueryClient() {
  var queryClient = react__WEBPACK_IMPORTED_MODULE_0___default().useContext(getQueryClientContext(react__WEBPACK_IMPORTED_MODULE_0___default().useContext(QueryClientSharingContext)));

  if (!queryClient) {
    throw new Error('No QueryClient set, use QueryClientProvider to set one');
  }

  return queryClient;
};
var QueryClientProvider = function QueryClientProvider(_ref) {
  var client = _ref.client,
      _ref$contextSharing = _ref.contextSharing,
      contextSharing = _ref$contextSharing === void 0 ? false : _ref$contextSharing,
      children = _ref.children;
  react__WEBPACK_IMPORTED_MODULE_0___default().useEffect(function () {
    client.mount();
    return function () {
      client.unmount();
    };
  }, [client]);
  var Context = getQueryClientContext(contextSharing);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(QueryClientSharingContext.Provider, {
    value: contextSharing
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Context.Provider, {
    value: client
  }, children));
};

/***/ }),

/***/ "./node_modules/react-query/es/react/QueryErrorResetBoundary.js":
/*!**********************************************************************!*\
  !*** ./node_modules/react-query/es/react/QueryErrorResetBoundary.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useQueryErrorResetBoundary": function() { return /* binding */ useQueryErrorResetBoundary; },
/* harmony export */   "QueryErrorResetBoundary": function() { return /* binding */ QueryErrorResetBoundary; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
 // CONTEXT

function createValue() {
  var _isReset = false;
  return {
    clearReset: function clearReset() {
      _isReset = false;
    },
    reset: function reset() {
      _isReset = true;
    },
    isReset: function isReset() {
      return _isReset;
    }
  };
}

var QueryErrorResetBoundaryContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createContext(createValue()); // HOOK

var useQueryErrorResetBoundary = function useQueryErrorResetBoundary() {
  return react__WEBPACK_IMPORTED_MODULE_0___default().useContext(QueryErrorResetBoundaryContext);
}; // COMPONENT

var QueryErrorResetBoundary = function QueryErrorResetBoundary(_ref) {
  var children = _ref.children;
  var value = react__WEBPACK_IMPORTED_MODULE_0___default().useMemo(function () {
    return createValue();
  }, []);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(QueryErrorResetBoundaryContext.Provider, {
    value: value
  }, typeof children === 'function' ? children(value) : children);
};

/***/ }),

/***/ "./node_modules/react-query/es/react/index.js":
/*!****************************************************!*\
  !*** ./node_modules/react-query/es/react/index.js ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "QueryClientProvider": function() { return /* reexport safe */ _QueryClientProvider__WEBPACK_IMPORTED_MODULE_2__.QueryClientProvider; },
/* harmony export */   "useQueryClient": function() { return /* reexport safe */ _QueryClientProvider__WEBPACK_IMPORTED_MODULE_2__.useQueryClient; },
/* harmony export */   "QueryErrorResetBoundary": function() { return /* reexport safe */ _QueryErrorResetBoundary__WEBPACK_IMPORTED_MODULE_3__.QueryErrorResetBoundary; },
/* harmony export */   "useQueryErrorResetBoundary": function() { return /* reexport safe */ _QueryErrorResetBoundary__WEBPACK_IMPORTED_MODULE_3__.useQueryErrorResetBoundary; },
/* harmony export */   "useIsFetching": function() { return /* reexport safe */ _useIsFetching__WEBPACK_IMPORTED_MODULE_4__.useIsFetching; },
/* harmony export */   "useIsMutating": function() { return /* reexport safe */ _useIsMutating__WEBPACK_IMPORTED_MODULE_5__.useIsMutating; },
/* harmony export */   "useMutation": function() { return /* reexport safe */ _useMutation__WEBPACK_IMPORTED_MODULE_6__.useMutation; },
/* harmony export */   "useQuery": function() { return /* reexport safe */ _useQuery__WEBPACK_IMPORTED_MODULE_7__.useQuery; },
/* harmony export */   "useQueries": function() { return /* reexport safe */ _useQueries__WEBPACK_IMPORTED_MODULE_8__.useQueries; },
/* harmony export */   "useInfiniteQuery": function() { return /* reexport safe */ _useInfiniteQuery__WEBPACK_IMPORTED_MODULE_9__.useInfiniteQuery; },
/* harmony export */   "useHydrate": function() { return /* reexport safe */ _Hydrate__WEBPACK_IMPORTED_MODULE_10__.useHydrate; },
/* harmony export */   "Hydrate": function() { return /* reexport safe */ _Hydrate__WEBPACK_IMPORTED_MODULE_10__.Hydrate; }
/* harmony export */ });
/* harmony import */ var _setBatchUpdatesFn__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setBatchUpdatesFn */ "./node_modules/react-query/es/react/setBatchUpdatesFn.js");
/* harmony import */ var _setLogger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./setLogger */ "./node_modules/react-query/es/react/setLogger.js");
/* harmony import */ var _QueryClientProvider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./QueryClientProvider */ "./node_modules/react-query/es/react/QueryClientProvider.js");
/* harmony import */ var _QueryErrorResetBoundary__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./QueryErrorResetBoundary */ "./node_modules/react-query/es/react/QueryErrorResetBoundary.js");
/* harmony import */ var _useIsFetching__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./useIsFetching */ "./node_modules/react-query/es/react/useIsFetching.js");
/* harmony import */ var _useIsMutating__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./useIsMutating */ "./node_modules/react-query/es/react/useIsMutating.js");
/* harmony import */ var _useMutation__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./useMutation */ "./node_modules/react-query/es/react/useMutation.js");
/* harmony import */ var _useQuery__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./useQuery */ "./node_modules/react-query/es/react/useQuery.js");
/* harmony import */ var _useQueries__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./useQueries */ "./node_modules/react-query/es/react/useQueries.js");
/* harmony import */ var _useInfiniteQuery__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./useInfiniteQuery */ "./node_modules/react-query/es/react/useInfiniteQuery.js");
/* harmony import */ var _Hydrate__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Hydrate */ "./node_modules/react-query/es/react/Hydrate.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./types */ "./node_modules/react-query/es/react/types.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_types__WEBPACK_IMPORTED_MODULE_11__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _types__WEBPACK_IMPORTED_MODULE_11__) if(["default","QueryClientProvider","useQueryClient","QueryErrorResetBoundary","useQueryErrorResetBoundary","useIsFetching","useIsMutating","useMutation","useQuery","useQueries","useInfiniteQuery","useHydrate","Hydrate"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = function(key) { return _types__WEBPACK_IMPORTED_MODULE_11__[key]; }.bind(0, __WEBPACK_IMPORT_KEY__)
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
// Side effects










 // Types



/***/ }),

/***/ "./node_modules/react-query/es/react/logger.js":
/*!*****************************************************!*\
  !*** ./node_modules/react-query/es/react/logger.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "logger": function() { return /* binding */ logger; }
/* harmony export */ });
var logger = console;

/***/ }),

/***/ "./node_modules/react-query/es/react/reactBatchedUpdates.js":
/*!******************************************************************!*\
  !*** ./node_modules/react-query/es/react/reactBatchedUpdates.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "unstable_batchedUpdates": function() { return /* binding */ unstable_batchedUpdates; }
/* harmony export */ });
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-dom */ "react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_0__);

var unstable_batchedUpdates = (react_dom__WEBPACK_IMPORTED_MODULE_0___default().unstable_batchedUpdates);

/***/ }),

/***/ "./node_modules/react-query/es/react/setBatchUpdatesFn.js":
/*!****************************************************************!*\
  !*** ./node_modules/react-query/es/react/setBatchUpdatesFn.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core */ "./node_modules/react-query/es/core/notifyManager.js");
/* harmony import */ var _reactBatchedUpdates__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reactBatchedUpdates */ "./node_modules/react-query/es/react/reactBatchedUpdates.js");


_core__WEBPACK_IMPORTED_MODULE_0__.notifyManager.setBatchNotifyFunction(_reactBatchedUpdates__WEBPACK_IMPORTED_MODULE_1__.unstable_batchedUpdates);

/***/ }),

/***/ "./node_modules/react-query/es/react/setLogger.js":
/*!********************************************************!*\
  !*** ./node_modules/react-query/es/react/setLogger.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core */ "./node_modules/react-query/es/core/logger.js");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./logger */ "./node_modules/react-query/es/react/logger.js");


(0,_core__WEBPACK_IMPORTED_MODULE_0__.setLogger)(_logger__WEBPACK_IMPORTED_MODULE_1__.logger);

/***/ }),

/***/ "./node_modules/react-query/es/react/types.js":
/*!****************************************************!*\
  !*** ./node_modules/react-query/es/react/types.js ***!
  \****************************************************/
/***/ (function() {



/***/ }),

/***/ "./node_modules/react-query/es/react/useBaseQuery.js":
/*!***********************************************************!*\
  !*** ./node_modules/react-query/es/react/useBaseQuery.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useBaseQuery": function() { return /* binding */ useBaseQuery; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_notifyManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/notifyManager */ "./node_modules/react-query/es/core/notifyManager.js");
/* harmony import */ var _QueryErrorResetBoundary__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./QueryErrorResetBoundary */ "./node_modules/react-query/es/react/QueryErrorResetBoundary.js");
/* harmony import */ var _QueryClientProvider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./QueryClientProvider */ "./node_modules/react-query/es/react/QueryClientProvider.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils */ "./node_modules/react-query/es/react/utils.js");





function useBaseQuery(options, Observer) {
  var mountedRef = react__WEBPACK_IMPORTED_MODULE_0___default().useRef(false);

  var _React$useState = react__WEBPACK_IMPORTED_MODULE_0___default().useState(0),
      forceUpdate = _React$useState[1];

  var queryClient = (0,_QueryClientProvider__WEBPACK_IMPORTED_MODULE_1__.useQueryClient)();
  var errorResetBoundary = (0,_QueryErrorResetBoundary__WEBPACK_IMPORTED_MODULE_2__.useQueryErrorResetBoundary)();
  var defaultedOptions = queryClient.defaultQueryObserverOptions(options); // Make sure results are optimistically set in fetching state before subscribing or updating options

  defaultedOptions.optimisticResults = true; // Include callbacks in batch renders

  if (defaultedOptions.onError) {
    defaultedOptions.onError = _core_notifyManager__WEBPACK_IMPORTED_MODULE_3__.notifyManager.batchCalls(defaultedOptions.onError);
  }

  if (defaultedOptions.onSuccess) {
    defaultedOptions.onSuccess = _core_notifyManager__WEBPACK_IMPORTED_MODULE_3__.notifyManager.batchCalls(defaultedOptions.onSuccess);
  }

  if (defaultedOptions.onSettled) {
    defaultedOptions.onSettled = _core_notifyManager__WEBPACK_IMPORTED_MODULE_3__.notifyManager.batchCalls(defaultedOptions.onSettled);
  }

  if (defaultedOptions.suspense) {
    // Always set stale time when using suspense to prevent
    // fetching again when directly mounting after suspending
    if (typeof defaultedOptions.staleTime !== 'number') {
      defaultedOptions.staleTime = 1000;
    } // Set cache time to 1 if the option has been set to 0
    // when using suspense to prevent infinite loop of fetches


    if (defaultedOptions.cacheTime === 0) {
      defaultedOptions.cacheTime = 1;
    }
  }

  if (defaultedOptions.suspense || defaultedOptions.useErrorBoundary) {
    // Prevent retrying failed query if the error boundary has not been reset yet
    if (!errorResetBoundary.isReset()) {
      defaultedOptions.retryOnMount = false;
    }
  }

  var _React$useState2 = react__WEBPACK_IMPORTED_MODULE_0___default().useState(function () {
    return new Observer(queryClient, defaultedOptions);
  }),
      observer = _React$useState2[0];

  var result = observer.getOptimisticResult(defaultedOptions);
  react__WEBPACK_IMPORTED_MODULE_0___default().useEffect(function () {
    mountedRef.current = true;
    errorResetBoundary.clearReset();
    var unsubscribe = observer.subscribe(_core_notifyManager__WEBPACK_IMPORTED_MODULE_3__.notifyManager.batchCalls(function () {
      if (mountedRef.current) {
        forceUpdate(function (x) {
          return x + 1;
        });
      }
    })); // Update result to make sure we did not miss any query updates
    // between creating the observer and subscribing to it.

    observer.updateResult();
    return function () {
      mountedRef.current = false;
      unsubscribe();
    };
  }, [errorResetBoundary, observer]);
  react__WEBPACK_IMPORTED_MODULE_0___default().useEffect(function () {
    // Do not notify on updates because of changes in the options because
    // these changes should already be reflected in the optimistic result.
    observer.setOptions(defaultedOptions, {
      listeners: false
    });
  }, [defaultedOptions, observer]); // Handle suspense

  if (defaultedOptions.suspense && result.isLoading) {
    throw observer.fetchOptimistic(defaultedOptions).then(function (_ref) {
      var data = _ref.data;
      defaultedOptions.onSuccess == null ? void 0 : defaultedOptions.onSuccess(data);
      defaultedOptions.onSettled == null ? void 0 : defaultedOptions.onSettled(data, null);
    }).catch(function (error) {
      errorResetBoundary.clearReset();
      defaultedOptions.onError == null ? void 0 : defaultedOptions.onError(error);
      defaultedOptions.onSettled == null ? void 0 : defaultedOptions.onSettled(undefined, error);
    });
  } // Handle error boundary


  if (result.isError && !errorResetBoundary.isReset() && !result.isFetching && (0,_utils__WEBPACK_IMPORTED_MODULE_4__.shouldThrowError)(defaultedOptions.suspense, defaultedOptions.useErrorBoundary, result.error)) {
    throw result.error;
  } // Handle result property usage tracking


  if (defaultedOptions.notifyOnChangeProps === 'tracked') {
    result = observer.trackResult(result, defaultedOptions);
  }

  return result;
}

/***/ }),

/***/ "./node_modules/react-query/es/react/useInfiniteQuery.js":
/*!***************************************************************!*\
  !*** ./node_modules/react-query/es/react/useInfiniteQuery.js ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useInfiniteQuery": function() { return /* binding */ useInfiniteQuery; }
/* harmony export */ });
/* harmony import */ var _core_infiniteQueryObserver__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/infiniteQueryObserver */ "./node_modules/react-query/es/core/infiniteQueryObserver.js");
/* harmony import */ var _core_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/utils */ "./node_modules/react-query/es/core/utils.js");
/* harmony import */ var _useBaseQuery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./useBaseQuery */ "./node_modules/react-query/es/react/useBaseQuery.js");


 // HOOK

function useInfiniteQuery(arg1, arg2, arg3) {
  var options = (0,_core_utils__WEBPACK_IMPORTED_MODULE_0__.parseQueryArgs)(arg1, arg2, arg3);
  return (0,_useBaseQuery__WEBPACK_IMPORTED_MODULE_1__.useBaseQuery)(options, _core_infiniteQueryObserver__WEBPACK_IMPORTED_MODULE_2__.InfiniteQueryObserver);
}

/***/ }),

/***/ "./node_modules/react-query/es/react/useIsFetching.js":
/*!************************************************************!*\
  !*** ./node_modules/react-query/es/react/useIsFetching.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useIsFetching": function() { return /* binding */ useIsFetching; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_notifyManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/notifyManager */ "./node_modules/react-query/es/core/notifyManager.js");
/* harmony import */ var _core_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/utils */ "./node_modules/react-query/es/core/utils.js");
/* harmony import */ var _QueryClientProvider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./QueryClientProvider */ "./node_modules/react-query/es/react/QueryClientProvider.js");




function useIsFetching(arg1, arg2) {
  var mountedRef = react__WEBPACK_IMPORTED_MODULE_0___default().useRef(false);
  var queryClient = (0,_QueryClientProvider__WEBPACK_IMPORTED_MODULE_1__.useQueryClient)();

  var _parseFilterArgs = (0,_core_utils__WEBPACK_IMPORTED_MODULE_2__.parseFilterArgs)(arg1, arg2),
      filters = _parseFilterArgs[0];

  var _React$useState = react__WEBPACK_IMPORTED_MODULE_0___default().useState(queryClient.isFetching(filters)),
      isFetching = _React$useState[0],
      setIsFetching = _React$useState[1];

  var filtersRef = react__WEBPACK_IMPORTED_MODULE_0___default().useRef(filters);
  filtersRef.current = filters;
  var isFetchingRef = react__WEBPACK_IMPORTED_MODULE_0___default().useRef(isFetching);
  isFetchingRef.current = isFetching;
  react__WEBPACK_IMPORTED_MODULE_0___default().useEffect(function () {
    mountedRef.current = true;
    var unsubscribe = queryClient.getQueryCache().subscribe(_core_notifyManager__WEBPACK_IMPORTED_MODULE_3__.notifyManager.batchCalls(function () {
      if (mountedRef.current) {
        var newIsFetching = queryClient.isFetching(filtersRef.current);

        if (isFetchingRef.current !== newIsFetching) {
          setIsFetching(newIsFetching);
        }
      }
    }));
    return function () {
      mountedRef.current = false;
      unsubscribe();
    };
  }, [queryClient]);
  return isFetching;
}

/***/ }),

/***/ "./node_modules/react-query/es/react/useIsMutating.js":
/*!************************************************************!*\
  !*** ./node_modules/react-query/es/react/useIsMutating.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useIsMutating": function() { return /* binding */ useIsMutating; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_notifyManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/notifyManager */ "./node_modules/react-query/es/core/notifyManager.js");
/* harmony import */ var _core_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/utils */ "./node_modules/react-query/es/core/utils.js");
/* harmony import */ var _QueryClientProvider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./QueryClientProvider */ "./node_modules/react-query/es/react/QueryClientProvider.js");




function useIsMutating(arg1, arg2) {
  var mountedRef = react__WEBPACK_IMPORTED_MODULE_0___default().useRef(false);
  var filters = (0,_core_utils__WEBPACK_IMPORTED_MODULE_1__.parseMutationFilterArgs)(arg1, arg2);
  var queryClient = (0,_QueryClientProvider__WEBPACK_IMPORTED_MODULE_2__.useQueryClient)();

  var _React$useState = react__WEBPACK_IMPORTED_MODULE_0___default().useState(queryClient.isMutating(filters)),
      isMutating = _React$useState[0],
      setIsMutating = _React$useState[1];

  var filtersRef = react__WEBPACK_IMPORTED_MODULE_0___default().useRef(filters);
  filtersRef.current = filters;
  var isMutatingRef = react__WEBPACK_IMPORTED_MODULE_0___default().useRef(isMutating);
  isMutatingRef.current = isMutating;
  react__WEBPACK_IMPORTED_MODULE_0___default().useEffect(function () {
    mountedRef.current = true;
    var unsubscribe = queryClient.getMutationCache().subscribe(_core_notifyManager__WEBPACK_IMPORTED_MODULE_3__.notifyManager.batchCalls(function () {
      if (mountedRef.current) {
        var newIsMutating = queryClient.isMutating(filtersRef.current);

        if (isMutatingRef.current !== newIsMutating) {
          setIsMutating(newIsMutating);
        }
      }
    }));
    return function () {
      mountedRef.current = false;
      unsubscribe();
    };
  }, [queryClient]);
  return isMutating;
}

/***/ }),

/***/ "./node_modules/react-query/es/react/useMutation.js":
/*!**********************************************************!*\
  !*** ./node_modules/react-query/es/react/useMutation.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useMutation": function() { return /* binding */ useMutation; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _core_notifyManager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../core/notifyManager */ "./node_modules/react-query/es/core/notifyManager.js");
/* harmony import */ var _core_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/utils */ "./node_modules/react-query/es/core/utils.js");
/* harmony import */ var _core_mutationObserver__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/mutationObserver */ "./node_modules/react-query/es/core/mutationObserver.js");
/* harmony import */ var _QueryClientProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./QueryClientProvider */ "./node_modules/react-query/es/react/QueryClientProvider.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils */ "./node_modules/react-query/es/react/utils.js");






 // HOOK

function useMutation(arg1, arg2, arg3) {
  var mountedRef = react__WEBPACK_IMPORTED_MODULE_1___default().useRef(false);

  var _React$useState = react__WEBPACK_IMPORTED_MODULE_1___default().useState(0),
      forceUpdate = _React$useState[1];

  var options = (0,_core_utils__WEBPACK_IMPORTED_MODULE_2__.parseMutationArgs)(arg1, arg2, arg3);
  var queryClient = (0,_QueryClientProvider__WEBPACK_IMPORTED_MODULE_3__.useQueryClient)();
  var obsRef = react__WEBPACK_IMPORTED_MODULE_1___default().useRef();

  if (!obsRef.current) {
    obsRef.current = new _core_mutationObserver__WEBPACK_IMPORTED_MODULE_4__.MutationObserver(queryClient, options);
  } else {
    obsRef.current.setOptions(options);
  }

  var currentResult = obsRef.current.getCurrentResult();
  react__WEBPACK_IMPORTED_MODULE_1___default().useEffect(function () {
    mountedRef.current = true;
    var unsubscribe = obsRef.current.subscribe(_core_notifyManager__WEBPACK_IMPORTED_MODULE_5__.notifyManager.batchCalls(function () {
      if (mountedRef.current) {
        forceUpdate(function (x) {
          return x + 1;
        });
      }
    }));
    return function () {
      mountedRef.current = false;
      unsubscribe();
    };
  }, []);
  var mutate = react__WEBPACK_IMPORTED_MODULE_1___default().useCallback(function (variables, mutateOptions) {
    obsRef.current.mutate(variables, mutateOptions).catch(_core_utils__WEBPACK_IMPORTED_MODULE_2__.noop);
  }, []);

  if (currentResult.error && (0,_utils__WEBPACK_IMPORTED_MODULE_6__.shouldThrowError)(undefined, obsRef.current.options.useErrorBoundary, currentResult.error)) {
    throw currentResult.error;
  }

  return (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, currentResult, {
    mutate: mutate,
    mutateAsync: currentResult.mutate
  });
}

/***/ }),

/***/ "./node_modules/react-query/es/react/useQueries.js":
/*!*********************************************************!*\
  !*** ./node_modules/react-query/es/react/useQueries.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useQueries": function() { return /* binding */ useQueries; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_notifyManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/notifyManager */ "./node_modules/react-query/es/core/notifyManager.js");
/* harmony import */ var _core_queriesObserver__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/queriesObserver */ "./node_modules/react-query/es/core/queriesObserver.js");
/* harmony import */ var _QueryClientProvider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./QueryClientProvider */ "./node_modules/react-query/es/react/QueryClientProvider.js");




function useQueries(queries) {
  var mountedRef = react__WEBPACK_IMPORTED_MODULE_0___default().useRef(false);

  var _React$useState = react__WEBPACK_IMPORTED_MODULE_0___default().useState(0),
      forceUpdate = _React$useState[1];

  var queryClient = (0,_QueryClientProvider__WEBPACK_IMPORTED_MODULE_1__.useQueryClient)();
  var defaultedQueries = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    return queries.map(function (options) {
      var defaultedOptions = queryClient.defaultQueryObserverOptions(options); // Make sure the results are already in fetching state before subscribing or updating options

      defaultedOptions.optimisticResults = true;
      return defaultedOptions;
    });
  }, [queries, queryClient]);

  var _React$useState2 = react__WEBPACK_IMPORTED_MODULE_0___default().useState(function () {
    return new _core_queriesObserver__WEBPACK_IMPORTED_MODULE_2__.QueriesObserver(queryClient, defaultedQueries);
  }),
      observer = _React$useState2[0];

  var result = observer.getOptimisticResult(defaultedQueries);
  react__WEBPACK_IMPORTED_MODULE_0___default().useEffect(function () {
    mountedRef.current = true;
    var unsubscribe = observer.subscribe(_core_notifyManager__WEBPACK_IMPORTED_MODULE_3__.notifyManager.batchCalls(function () {
      if (mountedRef.current) {
        forceUpdate(function (x) {
          return x + 1;
        });
      }
    }));
    return function () {
      mountedRef.current = false;
      unsubscribe();
    };
  }, [observer]);
  react__WEBPACK_IMPORTED_MODULE_0___default().useEffect(function () {
    // Do not notify on updates because of changes in the options because
    // these changes should already be reflected in the optimistic result.
    observer.setQueries(defaultedQueries, {
      listeners: false
    });
  }, [defaultedQueries, observer]);
  return result;
}

/***/ }),

/***/ "./node_modules/react-query/es/react/useQuery.js":
/*!*******************************************************!*\
  !*** ./node_modules/react-query/es/react/useQuery.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useQuery": function() { return /* binding */ useQuery; }
/* harmony export */ });
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core */ "./node_modules/react-query/es/core/queryObserver.js");
/* harmony import */ var _core_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/utils */ "./node_modules/react-query/es/core/utils.js");
/* harmony import */ var _useBaseQuery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./useBaseQuery */ "./node_modules/react-query/es/react/useBaseQuery.js");


 // HOOK

function useQuery(arg1, arg2, arg3) {
  var parsedOptions = (0,_core_utils__WEBPACK_IMPORTED_MODULE_0__.parseQueryArgs)(arg1, arg2, arg3);
  return (0,_useBaseQuery__WEBPACK_IMPORTED_MODULE_1__.useBaseQuery)(parsedOptions, _core__WEBPACK_IMPORTED_MODULE_2__.QueryObserver);
}

/***/ }),

/***/ "./node_modules/react-query/es/react/utils.js":
/*!****************************************************!*\
  !*** ./node_modules/react-query/es/react/utils.js ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "shouldThrowError": function() { return /* binding */ shouldThrowError; }
/* harmony export */ });
function shouldThrowError(suspense, _useErrorBoundary, error) {
  // Allow useErrorBoundary function to override throwing behavior on a per-error basis
  if (typeof _useErrorBoundary === 'function') {
    return _useErrorBoundary(error);
  } // Allow useErrorBoundary to override suspense's throwing behavior


  if (typeof _useErrorBoundary === 'boolean') return _useErrorBoundary; // If suspense is enabled default to throwing errors

  return !!suspense;
}

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/regex.js":
/*!*****************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/regex.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/rng.js":
/*!***************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/rng.js ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ rng; }
/* harmony export */ });
// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
    // find the complete implementation of crypto (msCrypto) on IE11.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== 'undefined' && typeof msCrypto.getRandomValues === 'function' && msCrypto.getRandomValues.bind(msCrypto);

    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }

  return getRandomValues(rnds8);
}

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/stringify.js":
/*!*********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/stringify.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate.js */ "./node_modules/uuid/dist/esm-browser/validate.js");

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

var byteToHex = [];

for (var i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).substr(1));
}

function stringify(arr) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!(0,_validate_js__WEBPACK_IMPORTED_MODULE_0__["default"])(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

/* harmony default export */ __webpack_exports__["default"] = (stringify);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/v4.js":
/*!**************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/v4.js ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rng.js */ "./node_modules/uuid/dist/esm-browser/rng.js");
/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stringify.js */ "./node_modules/uuid/dist/esm-browser/stringify.js");



function v4(options, buf, offset) {
  options = options || {};
  var rnds = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_0__["default"])(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (var i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return (0,_stringify_js__WEBPACK_IMPORTED_MODULE_1__["default"])(rnds);
}

/* harmony default export */ __webpack_exports__["default"] = (v4);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/validate.js":
/*!********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/validate.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./regex.js */ "./node_modules/uuid/dist/esm-browser/regex.js");


function validate(uuid) {
  return typeof uuid === 'string' && _regex_js__WEBPACK_IMPORTED_MODULE_0__["default"].test(uuid);
}

/* harmony default export */ __webpack_exports__["default"] = (validate);

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ (function(module) {

"use strict";
module.exports = window["React"];

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/***/ (function(module) {

"use strict";
module.exports = window["ReactDOM"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["element"];

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/extends.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/extends.js ***!
  \************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _extends; }
/* harmony export */ });
function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _inheritsLoose; }
/* harmony export */ });
/* harmony import */ var _setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setPrototypeOf.js */ "./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js");

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  (0,_setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__["default"])(subClass, superClass);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _setPrototypeOf; }
/* harmony export */ });
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
/*!************************!*\
  !*** ./src/rewards.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_query__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-query */ "./node_modules/react-query/es/index.js");
/* harmony import */ var _admin_RewardsList__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./admin/RewardsList */ "./src/admin/RewardsList.js");
/* harmony import */ var _sass_admin_rewards_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./sass/admin-rewards.scss */ "./src/sass/admin-rewards.scss");




 // Create a client

const queryClient = new react_query__WEBPACK_IMPORTED_MODULE_1__.QueryClient();
(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.render)((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_query__WEBPACK_IMPORTED_MODULE_1__.QueryClientProvider, {
  client: queryClient
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_admin_RewardsList__WEBPACK_IMPORTED_MODULE_2__["default"], null)), document.getElementById("rewards-screen"));
}();
/******/ })()
;
//# sourceMappingURL=rewards.js.map