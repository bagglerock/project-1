var ingredients = [];
var cuisines = [];
var intolerances = [];
var diets = [];

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
    ingredientLabel = $("<div>"),
    closeButton = $("<i>");

    ingredientLabel
    .addClass("ingredient")
    .text(ingredients[i]);

    closeButton.addClass("fas fa-trash close-button");

    ingredientLabel.append(closeButton);

    ingredientContainer.append(ingredientLabel);
    $("#ingredients-view").append(ingredientContainer);
  }
}

function showFilters() {
  $("#filters-view").empty();

  if (cuisines.length > 0){
    for (var i = 0; i < cuisines.length; i++){
      var 
      filterContainer = $("<div>"),
      filterLabel = $("<div>"),
      closeButton = $("<i>");

      filterLabel
      .addClass("filter")
      .text(cuisines[i]);
      closeButton.addClass("fas fa-trash subtract-cuisine");
      filterLabel.append(closeButton);
      filterContainer.append(filterLabel);
      $("#filters-view").append(filterContainer);
    }
  } 
  if (diets.length > 0){
    for (var i = 0; i < diets.length; i++){
      var 
      filterContainer = $("<div>"),
      filterLabel = $("<label>"),
      closeButton = $("<i>");

      filterLabel
      .addClass("filter")
      .text(diets[i]);
      closeButton.addClass("fas fa-trash subtract-diet");
      filterLabel.append(closeButton);
      filterContainer.append(filterLabel);
      $("#filters-view").append(filterContainer);
    }
  }
  if (intolerances.length > 0){
    for (var i = 0; i < intolerances.length; i++){
      var 
      filterContainer = $("<div>"),
      filterLabel = $("<label>"),
      closeButton = $("<i>");

      filterLabel
      .addClass("filter")
      .text(intolerances[i]);
      closeButton.addClass("fas fa-trash subtract-intolerance");
      filterLabel.append(closeButton);
      filterContainer.append(filterLabel);
      $("#filters-view").append(filterContainer);
    }
  }
}

function searchComplex(query, ingredients, cuisinesFilter, dietsFilter, intolerancesFilter){
  var apiKey = "NaJ8IatR4umshJBKw1RZRU7m6EnQp1QfWPajsnjxYr5FbYb8Gv";
  var url =
    "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/searchComplex";
  var cuisinesString = "";
  var dietsString = "";
  var intolerancesString = "";
  var ingredientsString = "";

  if (ingredients.length > 0){
    for (var i = 0; i < ingredients.length; i++) {
      ingredientsString += ingredients[i] + ",";
    }
  }

  if (cuisines.length > 0){
    for (var i = 0; i < cuisines.length; i++) {
      cuisinesString += cuisines[i] + ",";
    }
  }
  if (diets.length > 0){
    for (var i = 0; i < diets.length; i++) {
      dietsString += diets[i] + ",";
    }
  }
  if (intolerances.length > 0){
    for (var i = 0; i < intolerances.length; i++) {
      intolerancesString += intolerances[i] + ",";
    }
  }

  url +=
    "?" +
    $.param({
      addRecipeInformation: "true",
      includeIngredients: ingredientsString, //for ingredients
      cuisines: cuisinesString, //Cuisines filter
      diet: dietsString, //The diet to which the recipes must be compliant. Possible values are: pescetarian, lacto vegetarian, ovo vegetarian, vegan, and vegetarian.
      //excludeIngredients: "", //An comma-separated list of ingredients or ingredient types that must not be contained in the recipes.
      //instructionsRequired: "true", // Whether the recipes must have instructions.
      intolerances: intolerancesString, //A comma-separated list of intolerances. All found recipes must not have ingredients that could cause problems for people with one of the given tolerances. Possible values are: dairy, egg, gluten, peanut, sesame, seafood, shellfish, soy, sulfite, tree nut, and wheat.
      limitLicense: "false", //Whether the recipes should have an open license that allows for displaying with proper attribution.
      number: "20", //The number of results to return (between 0 and 100).
      offset: "0", //The number of results to skip (between 0 and 900).
      ranking: "1",
      fillIngredients: "true",
      //type: "", //The type of the recipes. One of the following: main course, side dish, dessert, appetizer, salad, bread, breakfast, soup, beverage, sauce, or drink.
      query: query //The (natural language) recipe search query.
    });

  //  Ajax call
  $.ajax({
    url: url,
    method: "GET",
    headers: {
      "X-Mashape-Key": apiKey
    }
  }).then(function(response) {
    
    response = response.results;
    listRecipesFromIngredients(response);
  });


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
  console.log(arr);
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

    favorites
    .attr("id", id)
    .addClass("fas fa-heart favorite");
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

function searchByKeyword(query, cuisinesFilter, dietsFilter, intolerancesFilter) {
  var apiKey = "NaJ8IatR4umshJBKw1RZRU7m6EnQp1QfWPajsnjxYr5FbYb8Gv";
  var url =
    "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search";
  var cuisinesString = "";
  var dietsString = "";
  var intolerancesString = "";

  if (cuisines.length > 0){
    for (var i = 0; i < cuisines.length; i++) {
      cuisinesString += cuisines[i] + ",";
    }
  }
  if (diets.length > 0){
    for (var i = 0; i < diets.length; i++) {
      dietsString += diets[i] + ",";
    }
  }
  if (intolerances.length > 0){
    for (var i = 0; i < intolerances.length; i++) {
      intolerancesString += intolerances[i] + ",";
    }
  }

  var queryString = "";
  url +=
    "?" +
    $.param({
      cuisines: cuisinesString, //Cuisines filter
      diet: dietsString, //The diet to which the recipes must be compliant. Possible values are: pescetarian, lacto vegetarian, ovo vegetarian, vegan, and vegetarian.
      //excludeIngredients: "", //An comma-separated list of ingredients or ingredient types that must not be contained in the recipes.
      //instructionsRequired: "true", // Whether the recipes must have instructions.
      intolerances: intolerancesString, //A comma-separated list of intolerances. All found recipes must not have ingredients that could cause problems for people with one of the given tolerances. Possible values are: dairy, egg, gluten, peanut, sesame, seafood, shellfish, soy, sulfite, tree nut, and wheat.
      limitLicense: "false", //Whether the recipes should have an open license that allows for displaying with proper attribution.
      number: "20", //The number of results to return (between 0 and 100).
      //offset: "", //The number of results to skip (between 0 and 900).
      //type: "", //The type of the recipes. One of the following: main course, side dish, dessert, appetizer, salad, bread, breakfast, soup, beverage, sauce, or drink.
      query: query //The (natural language) recipe search query.
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
      favoritesDiv = $("<div>"),
      favorites = $("<i>"),
      resultDiv = $("<div>"),
      titleDiv = $("<div>"),
      titleHeader = $("<h3>"),
      imageDiv = $("<div>"),
      imageTag = $("<img>");

    resultDiv.attr("id", id);

    favorites
    .attr("recipe-id", id)
    .addClass("fas fa-heart favorite");
    favoritesDiv.append(favorites);

    titleHeader.text(title);
    titleDiv.append(titleHeader);

    imageTag
      .addClass("recipe-image")
      .attr("src", "https://spoonacular.com/recipeImages/" + image)
      .attr("alt", title);
    imageDiv.append(imageTag);

    resultDiv
      .addClass("result")
      .append(titleDiv, favoritesDiv, imageDiv);
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
    favoritesDiv = $("<div>"),
    favorites = $("<i>"),
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

  favorites
  .attr("recipe-id", id)
  .addClass("fas fa-heart favorite");
  favoritesDiv.append(favorites);

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
  recipeDiv.append(favoritesDiv, titleDiv, imageDiv, mainContentDiv, wineDiv);
  $("#recipe-view").append(recipeDiv);

  pairBeer(ingredients[0].name);
  

}

function pairBeer(food) {
  var food = food.split(" ");
  var url = "https://api.punkapi.com/v2/beers";
  url +=
    "?" + 
    $.param({
      food: food[0] //Include nutrition data to the recipe information. Nutrition data is per serving. If you want the nutrition data for the entire recipe, just multiply by the number of servings.
    });

    console.log(url);

  $.ajax({
    url: url,
    method: "GET"
  }).then(function(response) {
    var beerDiv = $("<div>");
    var header = $("<h4>");
    header.text("Here are some beers that could go with your meal:");
    beerDiv.append(header);

    for (var i = 0; i < response.length; i++ ){
      var beerName = $("<p>");
      var name = response[i].name;
      beerName.text(name);
      beerDiv.append(beerName);
    }

    $("#recipe-view").append(beerDiv);
  });
}


//general search function
$("#search-button").on("click", function() {
  event.preventDefault();
  var query = $("#query").val().trim();
  if (ingredients.length > 0){
    if ((cuisines.length > 0) || (diets.length > 0) || (intolerances.length > 0)){
      searchComplex(query, cuisines, diets, intolerances);
    } else {
      searchByIngredient(ingredients);
    }
  } else {
    searchByKeyword(query);
  }
  $("#query").val("");

})

//  add ingredient button - this will need a check on the value and get prefilled
$("#add-ingredient").on("click", function() {
  event.preventDefault();
  var searchValue = $("#query")
    .val()
    .trim();
  if (searchValue !== "") {
    addIngredients(searchValue);
  }
  searchValue = $("#query").val("");
});

//gets the recipe when the div is clicked and shows it in a modal
$(document).on("click", "#results-view .result", function() {
  id = $(this).attr("id");
  getRecipeById(id);
  $("#recipe").show();
  $(".recipe-modal").css("display", "block");
});

//closes the recipe modal if the x is clicked
$(".close").on("click", function() {
  $("#recipe").hide();
  showFilters();
})

//closes the recipe modal if anything outside the modal is clicked
$(document).on("click", function(event){
  if ( event.target == document.getElementById("recipe")){
    $("#recipe").hide();
  }
  
});

//deletes ingredients
$(document).on("click", ".close-button", function() {
  event.preventDefault();
  var label = $(this).parent().text();
  var index = ingredients.indexOf(label);
  ingredients.splice(index, 1);
  $("#ingredients-view").empty();
  showIngredients();
});

// adds cuisine filters
$(document).on("click", ".cuisine-button", function(){
  var value = $(this).text();
  if ($(this).hasClass("btn-danger")){
    $(this).removeClass("btn-danger").addClass("btn-warning");
    cuisines.push(value);
  } else {
    $(this).removeClass("btn-warning").addClass("btn-danger");
    var filterIndex = cuisines.indexOf(value);
    cuisines.splice(filterIndex, 1);
  }

})

// adds diet filters
$(document).on("click", ".diet-button", function(){
  var value = $(this).text();
  if ($(this).hasClass("btn-danger")){
    $(this).removeClass("btn-danger").addClass("btn-warning");
    diets.push(value);
  } else {
    $(this).removeClass("btn-warning").addClass("btn-danger");
    var filterIndex = diets.indexOf(value);
    diets.splice(filterIndex, 1);
  }

})

//  adds intolorance filters
$(document).on("click", ".intolerance-button", function(){
  var value = $(this).text();
  if ($(this).hasClass("btn-danger")){
    $(this).removeClass("btn-danger").addClass("btn-warning");
    intolerances.push(value);
  } else {
    $(this).removeClass("btn-warning").addClass("btn-danger");
    var filterIndex = intolerances.indexOf(value);
    intolerances.splice(filterIndex, 1);
  }

})

$(document).on("click", function(event){
  if ( event.target == document.getElementById("cuisine-modal")){
    $("#cuisine-modal").hide();
    showFilters();
  }
  
});

$(document).on("click", function(event){
  if ( event.target == document.getElementById("diet-modal")){
    $("#diet-modal").hide();
    showFilters();
  }
  
});

$(document).on("click", function(event){
  if ( event.target == document.getElementById("intolerance-modal")){
    $("#intolerance-modal").hide();
    showFilters();
  }
  
});

$(document).on("click", ".subtract-cuisine", function() {
  event.preventDefault();
  var label = $(this).parent().text();
  var index = cuisines.indexOf(label);
  cuisines.splice(index, 1);
  $("#filters-view").empty();
  showFilters();
});

$(document).on("click", ".subtract-diet", function() {
  event.preventDefault();
  var label = $(this).parent().text();
  var index = diets.indexOf(label);
  diets.splice(index, 1);
  $("#filters-view").empty();
  showFilters();
});

$(document).on("click", ".subtract-intolerance", function() {
  event.preventDefault();
  var label = $(this).parent().text();
  var index = intolerances.indexOf(label);
  intolerances.splice(index, 1);
  $("#filters-view").empty();
  showFilters();
});




/*

what to fix:


get recipe information bulk = used multiple ids



have to deliver a response for searching by name of a dish
if missing ingredients is empty then say you have all the ingredients
make the autocomplete jquery thing for the search so it can find recipes more accurately








  */
