//IIFE containing main tasks of page
(function(){
  'use strict';

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

  //function that will delegate other tasks to helper functions to manipulate and display data recieved from API on page
  function app(response) {
    var keywords = response.params.keywords;
    var results = response.results;

    displayTitle(keywords);
    displayListings(response, results, keywords);
    displaySidebarCategories(response);
    displaySidebarItemType(keywords);
    displayPriceRangeURL(keywords);
    displayColorFilter(keywords);
  }

  //displays keyword inside default Etsy title
  function displayTitle(keywords) {
    var $title = document.querySelector("title");
    var source = document.querySelector("#title-template").textContent;
    var template = Handlebars.compile(source);
    var context = {keywords: keywords};
    $title.textContent = template(context);
  }

  //displays search result listings in grid on page
  function displayListings (response, results, keywords) {
    var sourceGeneral = document.querySelector("#search-listings-general").innerHTML;
    var sourceIndividual = document.querySelector("#search-listings-results").innerHTML;
    var templateGeneral = Handlebars.compile(sourceGeneral);
    var templateIndividual = Handlebars.compile(sourceIndividual);
    var searchResultContext;
    var topRowContext;
    var $searchResultList;
    var $searchListings = document.querySelector(".search-listings");

    topRowContext = {
      searchkeywordurl: "https://www.etsy.com/search?q=" + keywords,
      keywords: keywords,
      count: response.count,
    };

    $searchListings.insertAdjacentHTML('beforeend',templateGeneral(topRowContext));

    $searchResultList = document.querySelector(".search-listing-result-list");

    results.forEach(function(result){
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

  //Returns sort_on parameter to display in top row
  // function getSortingOption(sortOn, sortOrder) {
  // var sortBy = {
  //   "created": "Most Recent",
  //   "price": "Highest Price",
  //   "score": "Relevancy"
  // };
  //
  // if (sortOrder === "down") {
  //   sortBy.price = "Lowest Price";
  // }
  //
  // return sortBy[sortOn];
  // }

  function displaySidebarCategories(response) {
    var keywords = response.params.keywords;
    var source = document.querySelector("#sidebar-categories-list").innerHTML;
    var template = Handlebars.compile(source);
    var context;

    var $categoryList = document.querySelector(".category-list");
    var topLevelCategories = ["Jewelry", "Craft Supplies & Tools", "Home & Living", "Art & Collectibles", "Accessories", "Clothing", "Paper & Party Supplies", "Bath & Beauty", "Bags & Purses", "Weddings", "Toys & Games", "Books, Movies & Music", "Electronics & Accessories", "Pet Supplies", "Shoes"];
    var elementURL; // dynamically generated URL for search category URL
    var elementURLFormat;

    topLevelCategories.forEach(function(element){
      //Replace the commas, ampersand and spaces with dashes in element URL values
      elementURLFormat = element.replace(/,+/g, "");
      elementURLFormat = elementURLFormat.replace(/&+/g, "and");
      elementURLFormat = elementURLFormat.replace(/\s+/g, "-").toLowerCase();

      //Concatenate correct element URL
      elementURL = "https://www.etsy.com/search/" + elementURLFormat + "?q=" + keywords;

      context = {
        category: element,
        categoryurl: elementURL
      };

      $categoryList.insertAdjacentHTML('beforeend',template(context));
    });
  }

  function displaySidebarItemType(keywords) {
    var $itemTypeForm = document.querySelector(".item-type-form");
    var source = document.querySelector("#search-refine-type").innerHTML;
    var template = Handlebars.compile(source);
    var context;

    context = {
      allitemsurl: "https://www.etsy.com/search/?q=" + keywords,
      handmadeurl: "https://www.etsy.com/search/handmade/?q=" + keywords,
      vintageurl: "https://www.etsy.com/search/vintage/?q=" + keywords
    };

    $itemTypeForm.insertAdjacentHTML('beforeend', template(context));
  }

  function displayPriceRangeURL(keywords) {
    var $priceRange = document.querySelector(".price-range");
    var source = document.querySelector("#price-range-filter").innerHTML;
    var template = Handlebars.compile(source);
    var context;

    context = {
      priceurl: "https://www.etsy.com/search?q=" + keywords + "&min=5&max=100"
    };

    $priceRange.insertAdjacentHTML('beforeend', template(context));
  }

  function displayColorFilter(keywords) {
    var $colorFilter = document.querySelector(".color-filter");
    var source = document.querySelector("#filter-by-color").innerHTML;
    var template = Handlebars.compile(source);
    var context;

    context = {
      color:[
       {name: "red", url: "https://www.etsy.com/search?q=" + keywords + "&color=f400b32"},
       {name: "orange", url: "https://www.etsy.com/search?q=" + keywords + "&color=ff7f00"},
       {name: "yellow", url: "https://www.etsy.com/search?q=" + keywords + "&color=f3cc0c"},
       {name: "green", url: "https://www.etsy.com/search?q=" + keywords + "&color=0ac20a"},
       {name: "cyan", url: "https://www.etsy.com/search?q=" + keywords + "&color=0cccf3"},
       {name: "purple", url: "https://www.etsy.com/search?q=" + keywords + "&color=a60cf3"},
       {name: "black", url: "https://www.etsy.com/search?q=" + keywords + "&color=000000"},
       {name: "white", url: "https://www.etsy.com/search?q=" + keywords + "&color=ffffff"}
      ]
    };

    $colorFilter.insertAdjacentHTML('beforeend', template(context));

  }

})();
