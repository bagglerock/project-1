var cuisine = ["african", "chinese", "japanese", "korean", "vietnamese", "thai", "indian", "british", "irish", "french", "italian", "mexican", "middle eastern",
    "jewish", "american", "cajun", "indian", "greek", "german", "nordic", "eastern european", "caribbean", "latin american"];

$("#cuisine-button").on("click", function () {
    var text = ""
    //  empty out the content to remake
    $("#cuisine-content").empty();
    // go through the array to make each button
    for (var i = 0; i < cuisine.length; i++) {
        var button = $("<button>");
        button
            // class to make the buttons look a certain way
            .addClass("btn btn-danger cuisine-button")
            .text(cuisine[i]);
        //  append to the cuisine modal
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
        button
            // class to make the buttons look a certain way
            .addClass("btn btn-danger diet-button")
            .text(diet[i]);
        //  append to the cuisine modal
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
        button
            // class to make the buttons look a certain way
            .addClass("btn btn-danger intolerance-button")
            .text(intolerance[i]);
        //  append to the cuisine modal
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