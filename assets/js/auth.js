// Initialize Firebase
var config = {
    apiKey: "AIzaSyAdaHZQH82uO9oxLw82nbPcpwnZxdD50Fg",
    authDomain: "munchies-ff8b4.firebaseapp.com",
    databaseURL: "https://munchies-ff8b4.firebaseio.com",
    projectId: "munchies-ff8b4",
    storageBucket: "munchies-ff8b4.appspot.com",
    messagingSenderId: "443385289339"
};
firebase.initializeApp(config);

//reference for database and auth
var database = firebase.database();
var auth = firebase.auth();

//variables
var userId = "";
var email = "";
var pass = "";
var favoritesArray = [];

//DOM references
var txtEmail = $("#txtEmail");
var password = $("#password");
var btnLogin = $("#btnLogin");
var btnSignUp = $("#btnSignUp");
var btnLogOut = $("#btnLogOut");

//Add Log in Event
$("#btnLogIn").on("click", e => {

    event.preventDefault();

    email = txtEmail.val();
    pass = password.val();

    $("#txtEmail").val("");
    $("#password").val("");

    //signin with e-mail and password
    var promise = auth.signInWithEmailAndPassword(email, pass);
    console.log(email, pass)
    promise.catch(e => console.log('error.message'))

})

//New user sign up
$("#btnSignUp").on("click", e => {
    event.preventDefault();

    email = txtEmail.val();
    pass = password.val();

    $("#txtEmail").val("");
    $("#password").val("");

    var promise = auth.createUserWithEmailAndPassword(email, pass);
    console.log(email, pass);

    promise.catch(e => console.log(e.message));

})

//Logout function
$("#btnLogOut").on("click", e => {
    event.preventDefault();
    firebase.auth().signOut();
})

//When a user logs in/signup gather the unique user id.
firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        console.log(firebaseUser);
        userId = firebaseUser.uid;

        //listen for clicks on the 'heart' button to save the recipe in favorites
        $(document).on("click", ".favorite", function () {

            //get the recipe id of the liked item and push it to the database
            recipeId = $(this).attr("recipe-id");
            console.log($(this).attr("recipe-id"));
            database.ref(userId).push(
                recipeId
            );
        })
        //Listen for fav being added to the database.  
        database.ref(userId).on("child_added", function (childSnapshot) {

            //take the snapshot and write to the DOM
            console.log(childSnapshot.val());
            bulkIdSearch(favoritesArray);
        })
    } else {
        console.log('not logged in')
        userId = "";
    }
})

//api call to populate the recipes that are saved in database
function bulkIdSearch(arr) {
    //  take in the id and return the recipe
    var apiKey = "NaJ8IatR4umshJBKw1RZRU7m6EnQp1QfWPajsnjxYr5FbYb8Gv";

    var url =
        "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/informationBulk";

    var recipeIds = "";

    if (arr.length > 0) {
        for (var i = 0; i < arr.length; i++) {
            recipeIds += arr[i] + ",";
        }
    } else {
        return false;
    }
    url +=
        "?" +
        $.param({
            ids: recipeIds,
            includeNutrition: true
        });

    $.ajax({
        url: url,
        method: "GET",
        headers: {
            "X-Mashape-Key": apiKey
        }
    }).then(function (response) {
        console.log(response);
        displayFavorites(arr);
    });
}

//function to populate the items in database to the fav page
function displayFavorites(arr) {

    for (var i = 0; i < arr.length; i++) {
        var favDiv = $("<div>");
        var titleDiv = $("<div>");
        var header = $("<h4>");
        var imgDiv = $("<div>")
        var imageTag = $("<img>");

        var title = arr[i].title;
        header.text(title);
        titleDiv.append(header);

        var image = arr[i].image;
        imageTag.attr("src", image).attr("alt", title);

        favDiv.attr("id", id)
            .addClass(result);

        favDiv.append(
            titleDiv,
            imageDiv
        )

        $("#results-view").append(favDiv);
    }

}