/******/ (function() { // webpackBootstrap
var __webpack_exports__ = {};
/*!*********************************!*\
  !*** ./src/ajax-add-to-cart.js ***!
  \*********************************/
jQuery(function ($) {
  /* global wc_add_to_cart_params */
  if (typeof wc_add_to_cart_params === "undefined") {
    return false;
  }

  $(document).on("submit", "form.cart", function (e) {
    e.preventDefault();
    var form = $(this),
        button = form.find('button[type="submit"]'),
        product_data = form.serializeArray(),
        has_product_id = false;
    $.each(product_data, function (key, form_item) {
      if (form_item.name === "product_id" || form_item.name === "add-to-cart") {
        if (form_item.value) {
          var has_product_id = true;
          return false;
        }
      }
    }); //If no product id found , look for the form action URL

    if (!has_product_id) {
      var is_url = form.attr("action").match(/add-to-cart=([0-9]+)/);
      var product_id = is_url ? is_url[1] : false;
    }

    if (button.attr("name") && button.attr("name") == "add-to-cart" && button.attr("value")) {
      var product_id = button.attr("value");
    }

    if (product_id) {
      product_data.push({
        name: "add-to-cart",
        value: product_id
      });
    }

    product_data.push({
      name: "action",
      value: "growcart_add_to_cart"
    });
    form.block({
      message: null,
      overlayCSS: {
        background: "#ffffff",
        opacity: 0.6
      }
    });
    $(document.body).trigger("adding_to_cart", [button, product_data]);
    $.ajax({
      type: "POST",
      url: woocommerce_grow_cart.ajaxURL,
      data: $.param(product_data),
      success: function (response) {
        if (response.fragments) {
          $(document.body).trigger("added_to_cart", [response.fragments, response.cart_hash, button]);
        } else if (response.error && response.product_url) {
          window.location = response.product_url;
        } else {
          console.log(response);
        }
      },
      complete: function () {
        form.unblock();
      }
    });
    return false;
  });
});
/******/ })()
;
//# sourceMappingURL=ajax-add-to-cart.js.map