firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        
    } else {
        window.location = "login.html";
    }
});

function signOut() {
    firebase.auth().signOut();
}