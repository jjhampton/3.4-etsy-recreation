//IIFE containing main tasks of page
(function(){
  'use strict';

  //variables assigned to DOM elements
  var $title = document.querySelector("title");
  var $searchListings = document.querySelector(".search-listings");
  var $categoryList = document.querySelector(".side-column")

  //variable representing the URL where the JSONP lives
  // var url = "https://api.etsy.com/v2/listings/active.js?api_key=l3usap5o1yhtiz130c55s1fq&keywords=ninjas&includes=Images,Shop&sort_on=score&limit=24";
  //
  // fetchJSONP(url, app);
  //
  // //Fetches JSONP data from Etsy API
  // function fetchJSONP(url, callback) {
  //   var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
  //   var script = document.createElement('script');
  //
  //   window[callbackName] = function(data) {
  //       delete window[callbackName];
  //       document.body.removeChild(script);
  //       callback(data);
  //   };
  //
  //   script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
  //   document.body.appendChild(script);
  // }

  app(data);

  //function that will delegate other tasks to helper functions to manipulate data recieved from API
  function app(response) {
    var keywords = response.params.keywords;
    var results = response.results;
    // var sortOn = response.params.sort_on;
    var categoryImage; //image for each of the top categories
    var topCategories; //top 5 categories
    var categoryAmount; //# of listings of each top category


    console.log(results);
    displayTitle(keywords);
    displayListings(response);
    displaySidebar(response);
  }

  function displayTitle(keywords) {
    var source = document.querySelector("#title-keyword-template").textContent;
    var template = Handlebars.compile(source);
    var context = {keywords: keywords};
    $title.textContent = template(context);
  }

  function displayListings (response) {
    var sourceGeneral = document.querySelector("#search-listings-general").innerHTML;
    var sourceIndividual = document.querySelector("#search-listings-results").innerHTML;
    var searchResults = response.results;
    var templateGeneral = Handlebars.compile(sourceGeneral);
    var templateIndividual = Handlebars.compile(sourceIndividual);
    var searchResultContext;
    var topRowContext;
    var $searchResultList;

    topRowContext = {
      keywords: response.params.keywords,
      count: response.count,
      sorton: response.params.sort_on
    };

    $searchListings.insertAdjacentHTML('beforeend',templateGeneral(topRowContext));

    $searchResultList = document.querySelector(".search-listing-result-list");

    searchResults.forEach(function(result){
      searchResultContext = {
        itemurl: result.url,
        imageurl: result.Images[0].url_fullxfull,
        itemtitle: result.title,
        shopurl: result.Shop.url,
        shopname: result.Shop.shop_name,
        price: result.price,
        shopcurrencycode: result.Shop.currency_code,
      };
      $searchResultList.insertAdjacentHTML('beforeend',templateIndividual(searchResultContext));
    });

    function displaySidebar(response) {
      var sourceGeneral = document.querySelector("sidebar-categories").innerHTML;
      var sourceIndividual =    document.querySelector("#sidebar-categories-list").innerHTML;
      var templateGeneral = Handlebars.compile(sourceGeneral);
      var templateIndividual = Handlebars.compile(sourceIndividual)
      var categoryListContext;
      var categoryListItemContext;
      var $categoryList;
      var searchCategories;

      var searchCategories = []


    }



    // searchResults.forEach(function(resultListing) {
    //   searchResultContexts = template(resultListing);
    //   $searchListings.insertAdjacentHTML('beforeend',searchResultContext);
    // });
  }

})();
