function onFormChange() {
    if (document.getElementById('farmerCheckbox').checked) {
        let crop = document.getElementById("cropSelect").value.toLowerCase();
        let amount = document.getElementById("amountInput").value;
        let ret = document.getElementById("returnInput").value;
        let investment = document.getElementById("investmentInput").value;
        document.getElementById("sentence").innerHTML = 
            "I am a farmer and would like to grow <b>"+amount+"</b> bushel"+(amount != 1 ? "s" : "")+
            " of <b>"+crop+"</b>. I am asking for investments" +
            " of <b>$"+investment+"</b> per bushel (<b>$"+investment*amount+" total</b>), and will return <b>"+ret+"%</b> of the profits to investors.";
    } else if (document.getElementById('investorCheckbox').checked) {
        var crop = document.getElementById("cropSelect").value.toLowerCase();
        var amount = document.getElementById("amountInput").value;
        var ret = document.getElementById("returnInput").value;
        var investment = document.getElementById("investmentInput").value;
        document.getElementById("sentence").innerHTML = 
            "I am an investor and would like to invest <b>$"+investment+"</b> per bushel into <b>"+amount+"</b> bushel"+(amount != 1 ? "s" : "")+
            " of <b>"+crop+"</b>, totaling <b>$"+investment*amount+"</b>. I am asking for <b>"+ret+"%</b> of the profits in return."
    }
}

$(document).ready(() => {
    let inputs = Array.from(document.getElementsByTagName("input"));
    inputs.forEach((input) => {
        input.onchange = () => {
            onFormChange();
        }
    });
    let selects = Array.from(document.getElementsByTagName("select"));
    selects.forEach((input) => {
        input.onchange = () => {
            onFormChange();
        }
    });

    document.getElementById("makeProposalForm").onsubmit = (event) => {
        let crop = document.getElementById("cropSelect").value.toLowerCase();
        let amount = document.getElementById("amountInput").value;
        let returnPercent = document.getElementById("returnInput").value;
        let price = document.getElementById("investmentInput").value;
        firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).get().then((doc => {
            let user = doc.data();
            firebase.firestore().collection("proposals").add({
                date: new Date(),
                farmingProposal: user.farmer,
                amountInBushels: amount,
                returnPercent: returnPercent,
                price: price,
                crop: crop
            });
        }));
        return false;
    };
})

