(function (window) {
  "use-strict";

  var App = window.App || {};
  var $ = window.jQuery;

  function RemoteDataStore(url) {
    if (!url) {
      throw new Error("No remote URL supplied.");
    }

    this.serverUrl = url;
  }

  RemoteDataStore.prototype.add = function(key, val) {
    console.log(val)
    /*$.get(this.serverUrl + "?emailAddress=" + val.emailAddress, function (serverResponse){
      if (!serverResponse)  {
        $.post(this.serverUrl, val, function(serverPostResponse) {
          //console.log(val);
          console.log("Server nil");
          console.log(serverPostResponse);
        });
      } else {
        $.post(this.serverUrl + '/' + serverResponse[0].id, val, function (serverPostResponse) {
          console.log("server not nil");
          console.log(serverPostResponse);
        });
      }
    });*/
    $.post(this.serverUrl, val, function(serverResponse) {
      console.log(val);
      console.log(serverResponse);
    });
  };

  RemoteDataStore.prototype.getAll = function(cb) {
    $.get(this.serverUrl, function (serverResponse) {
      console.log(serverResponse);
      cb(serverResponse);
    });
  };

  RemoteDataStore.prototype.get = function(key, cb) {
    $.get(this.serverUrl + '/' + key, function (serverResponse) {
      console.log(serverResponse);
      cb(serverResponse);
    });
  };

  RemoteDataStore.prototype.remove = function(key) {
      console.log("Entered remotedatastore remove. key: " + key);
    $.get(this.serverUrl + '?emailAddress=' + key, function (serverResponse) {
      console.log("ID of " + serverResponse[0].id);
      console.log(this);
      $.ajax(this.serverUrl + '/' + serverResponse[0].id, {
        type: 'DELETE'
      });
    }.bind(this));
  };

  App.RemoteDataStore = RemoteDataStore;
  window.App = App;

})(window);
