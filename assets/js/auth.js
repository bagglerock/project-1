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

//DOM references
var txtEmail = $("#txtEmail");
var password = $("#password");
var btnLogin = $("#btnLogin");
var btnSignUp = $("#btnSignUp");
var btnLogOut = $("#btnLogOut");

//Add Log in Event
$("#btnLogin").on("click", e => {

    event.preventDefault();

    email = txtEmail.val().trim();
    pass = password.val().trim();

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
        $(".favorite").on("click", function () {

            //get the recipe id of the liked item and push it to the database
            recipeId: this.attr(recipe-Id);
            database.ref(userId).push(
                recipeId
            );
        })
    } else {
        console.log('not logged in')
        userId = "";
    }
})

//Listen for fav being added to the database.  
database.ref(userId).on("child_added", function(childSnapshot){
    //take the snapshot and write to the DOM
    console.log(childSnapshot.val());

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
})