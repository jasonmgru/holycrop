$(document).ready(() => {

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            window.location = "makeproposal.html";
        }
    });

    document.getElementById('signup').onsubmit = (event) => {
        let password1 = document.getElementById("passwordOne").value;
        let password2 = document.getElementById("passwordTwo").value;
        let errorAlert = document.getElementById("errorAlert");

        if (password1 !== password2) {
            $("#errorAlertCollapse").collapse("hide");
            errorAlert.innerHTML = "Passwords do not match";
            $("#errorAlertCollapse").collapse("show");
            return false;
        } else {
            let email = document.getElementById("emailAddress").value;
            firebase.auth().createUserWithEmailAndPassword(email, password1).catch((error) => {
                errorAlert.innerHTML = error.message;
                $("#errorAlertCollapse").collapse("show");
            });
            return false;
        }
    }
});