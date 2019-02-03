function onFormChange() {
    if (document.getElementById('farmerCheckbox').checked) {
        var crop = document.getElementById("cropSelect").value.toLowerCase();
        var amount = document.getElementById("amountInput").value;
        var ret = document.getElementById("returnInput").value;
        var investment = document.getElementById("investmentInput").value;
        document.getElementById("sentence").innerHTML = 
            "I am a farmer and would like to grow <b>"+amount+"</b> bushel"+(amount != 1 ? "s" : "")+
            " of <b>"+crop+"</b>. I am asking for an" +
            " investment of <b>$"+investment+"</b> per bushel (<b>$"+investment*amount+" total</b>), and will return <b>"+ret+"%</b> of the profits to investors.";
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

document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
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
    }
}
