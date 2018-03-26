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
        userId = firebaseUser.uid;
        email = firebaseUser.email;
        //Listen for fav being added to the database.  
        database.ref(userId).on("value", function (childSnapshot) {
            console.log(childSnapshot.val()); 
            var snapshotArr = childSnapshot.val();
            console.log(typeof snapshotArr);
            //take the snapshot and write to the DOM
            var arrTest=[];
            for (var key in snapshotArr) {
                arrTest.push(snapshotArr[key])
            }
            console.log(arrTest);
            bulkIdSearch(arrTest);
        })
    } else {
        console.log('not logged in')
        userId = "";
    }
})

//listen for clicks on the 'heart' button to save the recipe in favorites
$(document).on("click", ".favorite", function () {

    event.preventDefault();
    //get the recipe id of the liked item and push it to the database
    recipeId = $(this).attr("recipe-id");
    console.log($(this).attr("recipe-id"));
    database.ref(userId).push(
        recipeId
    );
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
        displayFavorites(response);     
    });
}

//function to populate the items in database to the fav page
function displayFavorites(arrTest) {
    console.log(arrTest)
    console.log(arrTest.length);
    for (var i = 0; i < arrTest.length; i++) {
        console.log('hi')
        var favDiv = $("<div>");
        var titleDiv = $("<div>");
        var header = $("<h4>");
        var imgDiv = $("<div>")
        var imageTag = $("<img>");

        var title = arrTest[i].title;
        header.text(title);
        titleDiv.append(header);

        var image = arrTest[i].image;
        imageTag.attr("src", image).attr("alt", title).addClass("recipe-image");
        imgDiv.append(imageTag);

        favDiv.attr("id", arrTest[i].id)
            .addClass("result");

        favDiv.append(
            titleDiv,
            imgDiv);

            console.log(1);

        $("#favorites-view").append(favDiv);
    }

}
