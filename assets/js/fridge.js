var cuisine = ["african", "chinese", "japanese", "korean", "vietnamese", "thai", "indian", "british", "irish", "french", "italian", "mexican", "middle eastern",
    "jewish", "american", "cajun", "indian", "greek", "german", "nordic", "eastern european", "caribbean", "latin american"];

$("#cuisine-button").on("click", function () {
    var text = ""
    //  empty out the content to remake
    $("#cuisine-content").empty();
    // go through the array to make each button
    for (var i = 0; i < cuisine.length; i++) {
        var button = $("<button>");
        if (cuisines.indexOf(cuisine[i]) === -1){
            button
                // class to make the buttons look a certain way
                .addClass("btn btn-danger cuisine-button")
                .text(cuisine[i]);
        } else {
            button
                // class to make the buttons look a certain way
                .addClass("btn btn-warning cuisine-button")
                .text(cuisine[i]);  
        }
        $("#cuisine-content").append(button);
    }
    //show the cuisine modal
    $("#cuisine-modal").show();
});

var diet = ["pescetarian", "lacto vegetarian", "ovo vegetarian", "vegan", "paleo, primal", "and vegetarian"];

$("#diet-button").on("click", function () {
    var text = ""
    //  empty out the content to remake
    $("#diet-content").empty();
    // go through the array to make each button
    for (var i = 0; i < diet.length; i++) {
        var button = $("<button>");
        if (diets.indexOf(diet[i]) === -1){
            button
                // class to make the buttons look a certain way
                .addClass("btn btn-danger diet-button")
                .text(diet[i]);
        } else {
            button
                // class to make the buttons look a certain way
                .addClass("btn btn-warning diet-button")
                .text(diet[i]);  
        }
        $("#diet-content").append(button);
    }
    //show the diet modal
    $("#diet-modal").show();
});


var intolerance = ["dairy", "egg", "gluten", "peanut", "sesame", "seafood", "shellfish", "soy", "sulfite", "tree nut", "wheat"];

$("#intolerance-button").on("click", function () {
    var text = ""
    //  empty out the content to remake
    $("#intolerance-content").empty();
    // go through the array to make each button
    for (var i = 0; i < intolerance.length; i++) {
        var button = $("<button>");
        if (intolerances.indexOf(intolerance[i]) === -1){
            button
                // class to make the buttons look a certain way
                .addClass("btn btn-danger intolerance-button")
                .text(intolerance[i]);
        } else {
            button
                // class to make the buttons look a certain way
                .addClass("btn btn-warning intolerance-button")
                .text(intolerance[i]);  
        }
        $("#intolerance-content").append(button);
    }
    //show the cuisine modal
    $("#intolerance-modal").show();
});





$(".close").on("click", function () {
    $(".filter-modal").hide();
})

$(".close").on("click", function () {
    $(".login-modal").hide();
})

// login
$("#login-button").on("click", function() {
    $(".login-modal").show();
})