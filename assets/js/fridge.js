var cuisine = ["african", "chinese", "japanese", "korean", "vietnamese", "thai", "indian", "british", "irish", "french", "italian", "mexican", "middle eastern", 
"jewish", "american", "cajun", "indian", "greek", "german", "nordic", "eastern european", "caribbean",  "latin american"];

$("#cuisine-button").on("click", function() {
    var text="";
    $("#test").empty();
    for (var i = 0; i < cuisine.length; i++) {
        var button = $("<button>");
        button
        .addClass("btn btn-danger cuisine-button")
        .text(cuisine[i]);
        $("#test").append(button);
    }
    console.log("#test")
});
/*</!-- Make an array for all of the cuisine and loop through it-->*/

var diet = ["pescetarian", "lacto vegetarian", "ovo vegetarian", "vegan", "paleo, primal", "and vegetarian"];

$("#diet-button").on("click", function() {
    var text="";
    $("#test2").empty();
    for (var i = 0; i < diet.length; i++) {
        var button = $("<button>");
        button
        .addClass("btn btn-danger diet-button")
        .text(diet[i]);
        $("#test2").append(button);
    }
    console.log("#test2")
});

var Intolerance = ["dairy", "egg", "gluten", "peanut", "sesame", "seafood", "shellfish", "soy", "sulfite", "tree nut", "wheat"];
$("#intolerance-button").on("click", function() {
    var text="";
    $("#test3").empty();
    for (var i = 0; i < intolerance.length; i++) {
        var button = $("<button>");
        button
        .addClass("btn btn-danger intolerence-button")
        .text(diet[i]);
        $("#test3").append(button);
    }
    console.log("test3")
});