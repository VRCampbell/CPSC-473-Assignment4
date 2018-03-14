(function(window) {
  "use-strict";
  var FORM_SELECTOR = "[data-coffee-order=\"form\"]";
  var CHECKLIST_SELECTOR = "[data-coffee-order=\"checklist\"]";
  var SERVER_URL = "http://coffeerun-v2-rest-api.herokuapp.com/api/coffeeorders";
  var App = window.App;
  var Truck = App.Truck;
  var DataStore = App.DataStore;
  var RemoteDataStore = App.RemoteDataStore;
  var FormHandler = App.FormHandler;
  var Validation = App.Validation;
  var CheckList = App.CheckList;
  var remoteDS = new RemoteDataStore(SERVER_URL);
  var myTruck = new Truck("ncc-1701", remoteDS);
  window.myTruck = myTruck;
  var formHandler = new FormHandler(FORM_SELECTOR);
  var checkList = new CheckList(CHECKLIST_SELECTOR);

  checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));

  //formHandler.addSubmissionHandler(myTruck.createOrder.bind(myTruck));
  //updated to:
  formHandler.addSubmissionHandler(function(data) {
    myTruck.createOrder.call(myTruck, data);
    checkList.addRow.call(checkList, data);
  });
  /*Above is a single submit handler to handle both createOrder and addRow*/

  formHandler.addInputHandler(Validation.isCompanyEmail);

  console.log(formHandler);
})(window);
