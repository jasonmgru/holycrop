
$(document).ready(() => {
    console.log("ready");
    firebase.firestore().collection("matches").onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(doc.data());
        });
    });
});