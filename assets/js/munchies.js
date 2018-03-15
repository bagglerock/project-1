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



function searchF2f(array) {
    var apiKey = "041c5ecc290bbd100cb6e5c786e614b0";
    var url = "https://food2fork.com/api/search.jsonp";
    var queryString = ""
    for (var i = 0; i < ingredients.length; i++) {
        queryString += ingredients[i] + ","
    }
    url += "?" + $.param({
        "key": apiKey,
        "q": queryString

    });

    $.ajax({
            url: url,
            method: "GET"
        })
        .then(function (response) {
            response = JSON.parse(response);
            var results = response.recipes
            for (var i = 0; i < results.length; i++) {
                var
                    link = results[i].f2f_url,
                    image = results[i].image_url,
                    title = results[i].title,
                    div = $("<div>"),
                    br = $("<br>"),
                    imageTag = $("<img>"),
                    linkTag = $("<a>"),
                    titleTag = $("<h3>");

                imageTag
                    .addClass("recipe-image")
                    .attr("src", image)
                    .attr("alt", "Recipe Image");

                linkTag
                    .attr("href", image)
                    .text("image-link");

                titleTag
                    .text(title);

                div
                    .addClass("recipe-result");

                div.append(imageTag, br, linkTag, titleTag);
                $("#results-view").append(div);


            }
        })

}


function searchEdamam(query) {
    var appID = "4ec507ba";
    var appKey = "0d8ac99d68001bbf83dd4977921bfef9";
    var queryURL = "https://api.edamam.com/search?" + "&app_id=" + appID + "&app_key=" + appKey + "&q=" + query;

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
                    link = recipe.url,
                    image = recipe.image,
                    title = recipe.label,
                    div = $("<div>"),
                    br = $("<br>"),
                    imageTag = $("<img>"),
                    linkTag = $("<a>"),
                    titleTag = $("<h3>");

                imageTag
                    .addClass("recipe-image")
                    .attr("src", image)
                    .attr("alt", "Recipe Image");

                linkTag
                    .attr("href", image)
                    .text("image-link");

                titleTag
                    .text(title);

                div
                    .addClass("recipe-result");

                div.append(imageTag, br, linkTag, titleTag);
                $("#results-view").append(div);

            }
        });
}



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
