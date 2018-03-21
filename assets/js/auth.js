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
    var email = txtEmail.val().trim();
    var pass = password.val().trim();
    var auth = firebase.auth();

    $("#txtEmail").val("");
    $("#password").val("");

    //signin with e-mail and password
    var promise = auth.signInWithEmailAndPassword(email, pass);
    console.log(email, pass)
    promise.catch(e => console.log('error.message'))

})

$("#btnSignUp").on("click", e => {
    var email = txtEmail.val();
    var pass = password.val();
    var auth = firebase.auth();

    $("#txtEmail").val("");
    $("#password").val("");

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

})

