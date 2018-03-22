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

    saveData();

    promise.catch(e => console.log(e.message));

})

$("#btnLogOut").on("click", e => {
    event.preventDefault();
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

function saveData() {
    if (userId) {
        database.ref(userId).push({
            email: email
        })
    } else {
        console.log("You need to be logged in");
    }
}