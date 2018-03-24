var ingredients = [];
//filter arrays
var cuisines = [];
var intolerances = [];
var diet = [];

function clearResults() {
  $("#results-view").empty();
}

function addIngredients(ingredient) {
  $("#ingredients-view").empty();
  ingredients.push(ingredient);
  showIngredients();
}

function showIngredients() {
  for (var i = 0; i < ingredients.length; i++) {
    var 
    ingredientContainer = $("<div>"),
    ingredientLabel = $("<label>"),
    closeButton = $("<i>");

    ingredientLabel
    .addClass("ingredient")
    .text(ingredients[i]);

    closeButton.addClass("fas fa-minus close-button");

    ingredientLabel.append(closeButton);

    ingredientContainer.append(ingredientLabel);
    $("#ingredients-view").append(ingredientContainer);
  }
}

//  Search by ingredient
function searchByIngredient(array) {
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
  }).then(function(response) {
    listRecipesFromIngredients(response);
  });
}

function listRecipesFromIngredients(arr) {
  clearResults();
  for (var i = 0; i < arr.length; i++) {
    var recipe = arr[i];
    var id = recipe.id,
      image = recipe.image,
      title = recipe.title,
      likes = recipe.likes,
      missedIngredientsArray = recipe.missedIngredients, //uses name
      unusedIngredientsArray = recipe.unusedIngredients, // uses name
      usedIngredientsArray = recipe.usedIngredients, //uses name
      resultDiv = $("<div>"),
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
      imageTag = $("<img>"),
      favoritesDiv = $("<div>"),
      favorites = $("<i>");

    favorites.addClass("fas fa-heart favorite");
    favoritesDiv.append(favorites);

    titleHeader.text(title);
    titleDiv.append(titleHeader);

    imageTag
      .addClass("recipe-image")
      .attr("src", image)
      .attr("alt", "Recipe Image");
    //imageLink.text(imageTag);
    imageDiv.append(imageTag);

    likesHeader.text("Likes: " + likes);
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

    resultDiv.attr("id", id).addClass("result");

    resultDiv.append(
      titleDiv,
      imageDiv,
      likesDiv,
      missingDiv,
      unusedDiv,
      usedDiv,
      favoritesDiv
    );
    $("#results-view").append(resultDiv);
  }
}

function searchByKeyword(keyword) {
  var apiKey = "NaJ8IatR4umshJBKw1RZRU7m6EnQp1QfWPajsnjxYr5FbYb8Gv";
  var url =
    "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search";
  var queryString = "";
  url +=
    "?" +
    $.param({
      //diet: "", //The diet to which the recipes must be compliant. Possible values are: pescetarian, lacto vegetarian, ovo vegetarian, vegan, and vegetarian.
      //excludeIngredients: "", //An comma-separated list of ingredients or ingredient types that must not be contained in the recipes.
      //instructionsRequired: "true", // Whether the recipes must have instructions.
      //intolerances: "", //A comma-separated list of intolerances. All found recipes must not have ingredients that could cause problems for people with one of the given tolerances. Possible values are: dairy, egg, gluten, peanut, sesame, seafood, shellfish, soy, sulfite, tree nut, and wheat.
      limitLicense: "false", //Whether the recipes should have an open license that allows for displaying with proper attribution.
      number: "20", //The number of results to return (between 0 and 100).
      //offset: "", //The number of results to skip (between 0 and 900).
      //type: "", //The type of the recipes. One of the following: main course, side dish, dessert, appetizer, salad, bread, breakfast, soup, beverage, sauce, or drink.
      query: keyword //The (natural language) recipe search query.
    });

  //  Ajax call
  $.ajax({
    url: url,
    method: "GET",
    headers: {
      "X-Mashape-Key": apiKey
    }
  }).then(function(response) {
    listRecipesFromKeyword(response);
  });
}

function listRecipesFromKeyword(arr) {
  clearResults();
  results = arr.results;
  for (var i = 0; i < results.length; i++) {
    var recipe = results[i];
    var id = recipe.id,
      title = recipe.title,
      image = recipe.image,
      resultDiv = $("<div>"),
      titleDiv = $("<div>"),
      titleHeader = $("<h3>"),
      imageDiv = $("<div>"),
      imageTag = $("<img>");

    resultDiv.attr("id", id);

    titleHeader.text(title);
    titleDiv.append(titleHeader);

    imageTag
      .addClass("recipe-image")
      .attr("src", "https://spoonacular.com/recipeImages/" + image)
      .attr("alt", title);
    imageDiv.append(imageTag);

    resultDiv
      .addClass("result")
      .append(titleDiv, imageDiv);
    $("#results-view").append(resultDiv);

  }
}

function getRecipeById(id) {
  //  take in the id and return the recipe
  var apiKey = "NaJ8IatR4umshJBKw1RZRU7m6EnQp1QfWPajsnjxYr5FbYb8Gv";
  var url =
    "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/";
  url +=
    id +
    "/information?" +
    $.param({
      includeNutrition: "true" //Include nutrition data to the recipe information. Nutrition data is per serving. If you want the nutrition data for the entire recipe, just multiply by the number of servings.
    });

  $.ajax({
    url: url,
    method: "GET",
    headers: {
      "X-Mashape-Key": apiKey
    }
  }).then(function(response) {
    showRecipeInModal(response);
  });
}

function showRecipeInModal(obj) {
  $("#recipe-view").empty();
  console.log(obj);
  var recipe = obj,
    id = recipe.id,
    title = recipe.title,
    image = recipe.image,
    analyzedInstructions = recipe.analyzedInstructions[0].steps, //array
    instructions = recipe.instructions,
    ingredients = recipe.nutrition.ingredients, // Array
    nutrients = recipe.nutrition.nutrients, // Array, contains the calories
    prepTime =  recipe.preparationMinutes,
    readyTime = recipe.readyInMinutes,
    servings = recipe.servings,
    sourceName = recipe.sourceName,
    sourceUrl = recipe.sourceUrl,
    score = recipe.spoonacularScore,
    pairedWines = recipe.winePairing.pairedWines, //Array
    pairingText = recipe.winePairing.pairingText,
    recipeDiv = $("<div>"), //main div to hold everything
    titleDiv = $("<div>"),
    titleHead = $("<h3>"),
    imageDiv = $("<div>"),
    imageTag = $("<img>"),
    mainContentDiv = $("<div>"),
    infoUl = $("<ul>"),
    prepLi = $("<li>"),
    readyLi = $("<li>"),
    servingsLi = $("<li>"),
    scoreLi = $("<li>"),
    ingredientsDiv = $("<div>"),
    ingredientsHeader = $("<h4>"),
    ingredientsUl = $("<ul>"),
    instructionsPara = $("<p>"),
    sourcePara = $("<p>"),
    wineDiv = $("<div>"),
    pairingTextPara = $("<p>"),
    pairedWinesUl =$("<ul>");

  titleHead.text(title);
  titleDiv.append(titleHead);

  imageTag
  .addClass("recipe-image-lg")
  .attr("src", image);
  imageDiv.append(imageTag);

  prepLi.text("Preparation time: " + prepTime);
  readyLi.text("Ready in: " + readyTime);
  servingsLi.text("Serves: " + servings);
  scoreLi.text("Spoonacular score of: " + score);

  infoUl.append(prepLi, readyLi, servingsLi, scoreLi);
  mainContentDiv.append(infoUl);

  for (var i = 0; i < ingredients.length; i++){
    var li = $("<li>");
    li.text(ingredients[i].name);
    ingredientsUl.append(li);

  }

  ingredientsHeader.text("Ingredients:");
  ingredientsDiv.append(ingredientsHeader, ingredientsUl);
  mainContentDiv.append(ingredientsDiv);

  for( var i = 0; i < analyzedInstructions.length; i++ ){
    var p = $("<p>");
    p.text(analyzedInstructions[i].step);
    mainContentDiv.append(p);
  }

  sourcePara.text("Source: " + sourceName + "(" + sourceUrl + ")");
  mainContentDiv.append(sourcePara);

  for (var i = 0; i < pairedWines.length; i++){
    var li = $("<li>");
    li.text(pairedWines[i]);
    pairedWinesUl.append(li);

  }

  pairingTextPara.text(pairingText);
  wineDiv.append(pairedWines, pairingTextPara);

  recipeDiv.attr("id", id);
  recipeDiv.append(titleDiv, imageDiv, mainContentDiv, wineDiv);
  $("#recipe-view").append(recipeDiv);
  

}

$("#search-button").on("click", function() {
  event.preventDefault();
  var searchValue = $("#keyword")
    .val()
    .trim();
  if (searchValue !== "") {
    searchByKeyword(searchValue);
  } else {
    console.log(
      "You didn't add any ingredients to search for nor did you put any search term."
    );
  }
  searchValue = $("#keyword").val("");
});

$("#add-ingredient").on("click", function() {
  event.preventDefault();
  var searchValue = $("#ingredient")
    .val()
    .trim();
  if (searchValue !== "") {
    addIngredients(searchValue);
  }
  searchValue = $("#ingredient").val("");
});

$("#search-by-ingredient").on("click", function() {
  event.preventDefault();
  if (ingredients.length > 0) {
    searchByIngredient(ingredients);
  } else {
    console.log("array is empty");
  }
});

$(document).on("click", "#results-view .result", function() {
  id = $(this).attr("id");
  getRecipeById(id);
  $("#recipe").show();
  $(".recipe-modal").css("display", "block");
});

$(".close").on("click", function() {
  $("#recipe").hide();
})

$(document).on("click", function(event){
  if ( event.target == document.getElementById("recipe")){
    $("#recipe").hide();
  }
  
});

$(document).on("click", ".close-button", function() {
  event.preventDefault();
  var label = $(this)
    .contents()
    .get(0).nodeValue; //gets only the parent, not the children
  var index = ingredients.indexOf(label);

  ingredients.splice(index, 1);
  $("#ingredients-view").empty();
  showIngredients();
});




/*

what to fix:

have to deliver a response for searching by name of a dish
if missing ingredients is empty then say you have all the ingredients
make the autocomplete jquery thing for the search so it can find recipes more accurately








  */
