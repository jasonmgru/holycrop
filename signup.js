$(document).ready(() => {
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
            firebase.auth().createUserWithEmailAndPassword(email, password1).then(() => {
                // Success
                let uid = firebase.auth().currentUser.uid;
                let firstName = document.getElementById("firstName").value;
                let lastName = document.getElementById("lastName").value;
                let farmer = document.getElementById("farmerCheckbox").checked;
                firebase.firestore().collection("users").doc(uid).set({
                    firstName: firstName,
                    lastName: lastName,
                    farmer: farmer,
                    uid: uid,
                    email: email
                }).then(() => {
                    firebase.auth().onAuthStateChanged((user) => {
                        if (user) {
                            window.location = "makeproposal.html";
                        }
                    });
                });
            }).catch((error) => {
                // Error
                errorAlert.innerHTML = error.message;
                $("#errorAlertCollapse").collapse("show");
            });
            return false;
        }
    }
});