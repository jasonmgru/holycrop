firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        let docRef = firebase.firestore().collection("users").doc(user.uid);
        docRef.get().then((doc) => {
            if (doc.exists) {
                let data = doc.data();
                document.getElementById("profileName").innerHTML = data.firstName + " " + data.lastName;
            } else {
                alert("There was an error retrieving profile information.");
            }
        });
    } else {
        window.location = "login.html";
    }
});

function signOut() {
    firebase.auth().signOut();
}

function myAccount() {
    
}

function myMatches() {
    window.location = "mymatches.html";
}

function myProposals() {
    window.location = "myproposals.html";
}