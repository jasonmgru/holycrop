$(document).ready(() => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            window.location = "makeproposal.html";
        }
    });

    document.getElementById('signin').onsubmit = (event) => {
        let password = document.getElementById("passwordOne").value;
        let email = document.getElementById("emailAddress").value;
        let errorAlert = document.getElementById("errorAlert");
        firebase.auth().signInWithEmailAndPassword(email, password).catch((error) => {
            // Error
            errorAlert.innerHTML = error.message;
            $("#errorAlertCollapse").collapse("show");
        });
        return false;
    }
});