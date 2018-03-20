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