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
      searchkeywordurl: "https://www.etsy.com/search?q=" + response.params.keywords,
      keywords: response.params.keywords,
      count: response.count,
      sorton: getSortingOption(response.params.sort_on, response.params.sort_order)
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
  }

  function displaySidebar(response) {
    // var sourceGeneral = document.querySelector("sidebar-categories").innerHTML;
    var sourceIndividual = document.querySelector("#sidebar-categories-list").innerHTML;
    // var templateGeneral = Handlebars.compile(sourceGeneral);
    var templateIndividual = Handlebars.compile(sourceIndividual);
    // var categoryListContext;
    var categoryListItemContext;

    var $categoryList = document.querySelector(".category-list");
    var topLevelCategories = ["Jewelry", "Craft Supplies & Tools", "Home & Living", "Art & Collectibles", "Accessories", "Clothing", "Paper & Party Supplies", "Bath & Beauty", "Bags & Purses", "Weddings", "Toys & Games", "Books, Movies & Music", "Electronics & Accessories", "Pet Supplies", "Shoes"];
    var elementURL; // dynamically generated URL for search category URL
    var keywords = response.params.keywords;
    var elementURLFormat;

    topLevelCategories.forEach(function(element){
      elementURLFormat = element.replace(/&+/g, "and");
      elementURLFormat = elementURLFormat.replace(/\s+/g, "-").toLowerCase();

      elementURL = "https://www.etsy.com/search/" + elementURLFormat + "?q=" + keywords;

      categoryListItemContext = {
        category: element,
        categoryurl: elementURL
      };
      $categoryList.insertAdjacentHTML('beforeend',templateIndividual(categoryListItemContext));
    });

  displayColorFilter
}

  function getSortingOption(sortOn, sortOrder) {
    var sortBy = {
      "created": "Most Recent",
      "price": "Highest Price",
      "score": "Relevancy"
    };

    if (sortOrder === "down") {
      sortBy.price = "Lowest Price";
    }

    return sortBy[sortOn];
  }




})();
