(function(window) {
  "use-strict";

  var $ = window.jQuery;

  var PAYMENT_SELECTOR = "[data-payment=\"form\"]";
  var App = window.App;
  var FormHandler = App.FormHandler;
  var paymentHandler = new FormHandler(PAYMENT_SELECTOR);

  paymentHandler.addSubmissionHandler(function(data) {
    var name = data.title + " " + data.username;
    $("#thanks").append(name).modal();
  });
  //console.log(paymentHandler);
})(window);
