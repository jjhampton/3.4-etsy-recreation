//IIFE containing main tasks of page
(function(){
  'use strict';

  var url = "https://api.etsy.com/v2/listings/active.js?api_key=l3usap5o1yhtiz130c55s1fq&keywords=ninjas&includes=Images,Shop&sort_on=score&limit=48";
  fetchJSONP(url, app);

  //Fetches JSONP data from Etsy API
  function fetchJSONP(url, callback) {
    var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    var script = document.createElement('script');

    window[callbackName] = function(data) {
        delete window[callbackName];
        document.body.removeChild(script);
        callback(data);
    };

    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.body.appendChild(script);
  }

  //function that will delegate other tasks to helper functions to manipulate data recieved from API
  function app(response) {
    var results = response.results;
    console.log(results);
  }

})();
