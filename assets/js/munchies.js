var ingredients = [];

function clearResults() {
    $("#results-view").empty();
}

function addIngredients(ingredient) {

    $("#ingredients-view").empty();

    ingredients.push(ingredient);

    for (var i = 0; i < ingredients.length; i++) {
        var ingredientContainer = $("<div>");
        ingredientContainer
            .text(ingredients[i]);
        $("#ingredients-view").append(ingredientContainer);
    }

}


//  Search by ingredient
function searchSpoonacular(array) {
  //  Variables for the API call
  var apiKey = "NaJ8IatR4umshJBKw1RZRU7m6EnQp1QfWPajsnjxYr5FbYb8Gv";
  var url =
    "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients";
  var queryString = "";

  //  Query string separated by commas
  for (var i = 0; i < ingredients.length; i++) {
    queryString += ingredients[i] + ",";
  }
  url +=
    "?" +
    $.param({
      fillIngredients: "true", //Add information about the used and missing ingredients in each recipe.
      limitLicense: "false", //Whether to only show recipes with an attribution license.
      number: "20", // The maximum number of recipes to return (default = 5).
      ranking: "1", //Whether to maximize used ingredients (1) or minimize missing ingredients (2) first.
      ingredients: queryString //A comma-separated list of ingredients that the recipes should contain.
    });

  //  Ajax call
  $.ajax({
    url: url,
    method: "GET",
    headers: {
      "X-Mashape-Key": apiKey
    }
  }).then(function (response) {
    showResponse(response);
  });
}

function showResponse(arr) {
  clearResults();
  for (var i = 0; i < arr.length; i++) {
    var recipe = arr[i];
    var
      id = recipe.id,
      image = recipe.image,
      title = recipe.title,
      likes = recipe.likes,
      missedIngredientsArray = recipe.missedIngredients, //uses name
      unusedIngredientsArray = recipe.unusedIngredients, // uses name
      usedIngredientsArray = recipe.usedIngredients, //uses name

      resultDiv = $("<div>"),

      idDiv = $("<div>"),
      idHeader = $("<h3>"),
      titleDiv = $("<div>"),
      titleHeader = $("<h3>"),
      imageDiv = $("<div>"),
      imageLink = $("<a>"),
      imageTag = $("<img>"),
      likesDiv = $("<div>"),
      likesHeader = $("<h4>"),
      missingDiv = $("<div>"),
      missingHeader = $("<h3>"),
      missingUl = $("<ul>"),
      unusedDiv = $("<div>"),
      unusedHeader = $("<h3>"),
      unusedUl = $("<ul>"),
      usedDiv = $("<div>"),
      usedHeader = $("<h3>"),
      usedUl = $("<ul>"),
      imageTag = $("<img>");

    idHeader.text(id);
    idDiv.append(idHeader);

    titleHeader.text(title);
    titleDiv.append(titleHeader);

    imageTag
      .addClass("recipe-image")
      .attr("src", image)
      .attr("alt", "Recipe Image");
    //imageLink.text(imageTag);
    imageDiv.append(imageTag);

    likesHeader.text(likes);
    likesDiv.append(likesHeader);

    missingHeader.text("Missing Ingredients:");
    missingDiv.append(missingHeader);
    for (var j = 0; j < missedIngredientsArray.length; j++) {
      missingLi = $("<li>");
      missingLi.text(missedIngredientsArray[j].name);
      missingUl.append(missingLi);
    }
    missingDiv.append(missingUl);

    unusedHeader.text("Unused Ingredients:");
    unusedDiv.append(unusedHeader);
    for (var j = 0; j < unusedIngredientsArray.length; j++) {
      unusedLi = $("<li>");
      unusedLi.text(unusedIngredientsArray[j].name);
      unusedUl.append(unusedLi);
    }
    unusedDiv.append(unusedUl);

    usedHeader.text("Used Ingredients:");
    usedDiv.append(usedHeader);
    for (var j = 0; j < usedIngredientsArray.length; j++) {
      usedLi = $("<li>");
      usedLi.text(usedIngredientsArray[j].name);
      usedUl.append(usedLi);
    }
    usedDiv.append(usedUl);


    resultDiv
    .attr("id", id)
    .addClass("result");

    resultDiv.append(idDiv, titleDiv, imageDiv, likesDiv, missingDiv, unusedDiv, usedDiv);
    $("#results-view").append(resultDiv);

  }
}

function getRecipeById(id) {
  //  take in the id and return the recipe
  var apiKey = "NaJ8IatR4umshJBKw1RZRU7m6EnQp1QfWPajsnjxYr5FbYb8Gv";
  var url = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/";
  url +=
    id + "/information?" +
    $.param({
      includeNutrition: "true", //Include nutrition data to the recipe information. Nutrition data is per serving. If you want the nutrition data for the entire recipe, just multiply by the number of servings.
    });

    $.ajax({
      url: url,
      method: "GET",
      headers: {
        "X-Mashape-Key": apiKey
      }
    }).then(function (response) {
      console.log(response);
      //showRecipe(response);
    });

}

function showRecipe(obj){


}



/**
 * This function searches for videos that are associated with a particular Freebase
 * topic, logging their video IDs and titles to the Apps Script log. This example uses
 * the topic ID for Google Apps Script.
 *
 * Note that this sample limits the results to 25. To return more results, pass
 * additional parameters as documented here:
 *   https://developers.google.com/youtube/v3/docs/search/list
 */
function searchByTopic() {
    var mid = '/m/0gjf126';
    var results = YouTube.Search.list('id,snippet', {
        topicId: mid,
        maxResults: 25
    });
    for (var i in results.items) {
        var item = results.items[i];
        Logger.log('[%s] Title: %s', item.id.videoId, item.snippet.title);
    }

    var queryURL = "https://developers.google.com/youtube/v3/code_samples/apps-script#search_by_keyword"


    $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function (response) {
            clearResults();
            var results = response.hits;
            for (var i = 0; i < results.length; i++) {
                var recipe = results[i].recipe;
                var
                    link = YouTube.url,
                    image = YouTube.image,
                    title = YouTube.label,
                    div = $("<div>"),
                    br = $("<br>"),
                    linkTag = $("<a>"),
                    titleTag = $("<h3>");


                linkTag
                    .attr("href", image)
                    .text("image-link");

                titleTag
                    .text(title);

                div
                    .addClass("search-result");

                div.append(br, linkTag, titleTag);
                $("#results-view").append(div);

            }



        });

/**
 * This function searches for videos that are associated with a particular Freebase
 * topic, logging their video IDs and titles to the Apps Script log. This example uses
 * the topic ID for Google Apps Script.
 *
 * Note that this sample limits the results to 25. To return more results, pass
 * additional parameters as documented here:
 *   https://developers.google.com/youtube/v3/docs/search/list
 */
function searchByTopic() {
    var mid = '/m/0gjf126';
    var results = YouTube.Search.list('id,snippet', {
        topicId: mid,
        maxResults: 25
    });
    for (var i in results.items) {
        var item = results.items[i];
        Logger.log('[%s] Title: %s', item.id.videoId, item.snippet.title);
    }


    // Sample js code for search.list

    // See full sample for buildApiRequest() code, which is not 
    // specific to a particular API or API method.

    buildApiRequest('GET',
        '/youtube/v3/search', {
            'maxResults': '25',
            'part': 'snippet',
            'q': 'surfing',
            'type': ''
        });




        $("#search-button").on("click", function () {
          event.preventDefault();
          var searchValue = $("#keyword")
            .val()
            .trim();
          if (searchValue !== "") {
            searchEdamam(searchValue);
          } else {
            console.log(
              "You didn't add any ingredients to search for nor did you put any search term."
            );
          }
          searchValue = $("#keyword").val("");
        });
        
        $("#add-ingredient").on("click", function () {
          event.preventDefault();
          var searchValue = $("#ingredient")
            .val()
            .trim();
          if (searchValue !== "") {
            addIngredients(searchValue);
          }
          searchValue = $("#ingredient").val("");
        });
        
        $("#search-by-ingredient").on("click", function () {
          event.preventDefault();
          if (ingredients.length > 0) {
            searchSpoonacular(ingredients);
          } else {
            console.log("array is empty");
          }
        
          $(document).on("click", "#results-view .result", function() {
            id = $(this).attr("id");
            getRecipeById(id);
          })
        });
        

    var queryURL = "https://developers.google.com/youtube/v3/code_samples/apps-script#search_by_keyword"


    $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function (response) {
            clearResults();
            var results = response.hits;
            for (var i = 0; i < results.length; i++) {
                var recipe = results[i].recipe;
                var
                    link = YouTube.url,
                    image = YouTube.image,
                    title = YouTube.label,
                    div = $("<div>"),
                    br = $("<br>"),
                    linkTag = $("<a>"),
                    titleTag = $("<h3>");


                linkTag
                    .attr("href", image)
                    .text("image-link");

                titleTag
                    .text(title);

                div
                    .addClass("search-result");

                div.append(br, linkTag, titleTag);
                $("#results-view").append(div);

            }



        });


    // Sample js code for search.list

    // See full sample for buildApiRequest() code, which is not 
    // specific to a particular API or API method.

    buildApiRequest('GET',
        '/youtube/v3/search', {
            'maxResults': '25',
            'part': 'snippet',
            'q': 'surfing',
            'type': ''
        });



    $("#search-button").on("click", function () {

        event.preventDefault();
        var searchValue = $("#keyword").val().trim();
        if (searchValue !== "") {
            searchEdamam(searchValue);
        } else {
            console.log("You didn't add any ingredients to search for nor did you put any search term.")
        }
        searchValue = $("#keyword").val("");

    });

    $("#add-ingredient").on("click", function () {
        event.preventDefault();
        var searchValue = $("#ingredient").val().trim();
        if (searchValue !== "") {
            addIngredients(searchValue);
        }
        searchValue = $("#ingredient").val("");
    })


    $("#search-by-ingredient").on("click", function () {
        event.preventDefault();
        if (ingredients.length > 0) {
            searchF2f(ingredients);
        } else {
            console.log("array is empty");
        }
    })
}


// firebase for the app muchies

var config = {
    apiKey: "AIzaSyAdaHZQH82uO9oxLw82nbPcpwnZxdD50Fg",
    authDomain: "munchies-ff8b4.firebaseapp.com",
    databaseURL: "https://munchies-ff8b4.firebaseio.com",
    projectId: "munchies-ff8b4",
    storageBucket: "",
    messagingSenderId: "443385289339"
};
firebase.initializeApp(config);

var database = firebase.database();

var userId = "";
var txtEmail = $("#txtEmail");
var password = $("#password");
var btnLogin = $("#btnLogin");
var btnSignUp = $("#btnSignUp");
var btnLogOut = $("#btnLogOut");


//Add Log in Event
$("#btnLogin").on("click", function () {
    var email = txtEmail.val();
    var pass = password.val();
    var auth = firebase.auth();

    //signin with e-mail and password
    var promise = auth.signInWithEmailAndPassword(email, pass);
    console.log(email, pass)
    promise.catch(e => console.log('error.message'))

})

$("#btnSignUp").on("click", e => {
    var email = txtEmail.val();
    var pass = password.val();
    var auth = firebase.auth();

    var promise = auth.createUserWithEmailAndPassword(email, pass);
    console.log(email, pass);


    promise.catch(e => console.log(e.message));


})

$("#btnLogOut").on("click", e => {
    firebase.auth().signOut();
})

firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        console.log(firebaseUser);
        userId = firebaseUser.uid;

    } else {
        console.log('not logged in')
        userId = "";
    }

})