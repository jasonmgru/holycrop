// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.findMatches = functions.https.onCall((data, context) => {
    let proposalId = data.id;
    return admin.firestore().collection("proposals").doc(proposalId).get().then((doc) => {
        if (doc.exists) {
            let proposal = doc.data();
            let farmingProposal = proposal.farmingProposal;

            if (farmingProposal) {
                let overlap = admin.firestore().collection("proposals")
                    .where("farmingProposal", "==", !farmingProposal)
                    .where("crop", "==", proposal.crop)
                    //.where("price", ">=", proposal.price)
                    //.where("returnPercent", "<=", proposal.returnPercent);
                return overlap.get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        let otherProposalId = doc.id;
                        let otherProposal = doc.data();
                        let farmer = proposal.uid;
                        let investor = otherProposal.uid;
                        admin.firestore().collection("matches").add({
                            farmer: farmer,
                            investor: investor,
                            farmerProposalId: proposalId,
                            investorProposalId: otherProposalId
                        });
                    });
                    return {size: querySnapshot.size};
                });
            } else {
                let overlap = admin.firestore().collection("proposals")
                    .where("farmingProposal", "==", !farmingProposal)
                    .where("crop", "==", proposal.crop)
                    //.where("price", "<=", proposal.price)
                    //.where("returnPercent", ">=", proposal.returnPercent);
                return overlap.get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        let otherProposalId = doc.id;
                        let otherProposal = doc.data();
                        let farmer = otherProposal.uid;
                        let investor = proposal.uid;
                        admin.firestore().collection("matches").add({
                            farmer: farmer,
                            investor: investor,
                            farmerProposalId: proposalId,
                            investorProposalId: otherProposalId
                        });
                    });
                    return {size: querySnapshot.size};
                });
            }
        } else {
            return {error: "That proposal doesn't exist"};
        }
    });
    return {error: "Nothing else returning"};
});

/*
exports.findMatches = functions.firestore
    .document("proposals/{proposalId}")
    .onWrite((change, context) => {
        let proposalId = context.params.proposalId;
        let proposal = change.after.data();
        
        if (change.after.exists) {
            let farmingProposal = proposal.farmingProposal;

            if (farmingProposal) {
                let overlap = admin.firestore().collection("proposals")
                    .where("farmingProposal", "==", !farmingProposal)
                    .where("crop", "==", proposal.crop)
                    .where("price", ">=", proposal.price)
                    .where("returnPercent", "<=", proposal.returnPercent);
                overlap.get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        let otherProposalId = doc.id;
                        let otherProposal = doc.data();
                        let farmer = proposal.uid;
                        let investor = otherProposal.uid;
                        admin.firestore().collection("matches").add({
                            farmer: farmer,
                            investor: investor,
                            farmerProposalId: proposalId,
                            investorProposalId: otherProposalId
                        });
                    });
                });
            } else {
                let overlap = admin.firestore().collection("proposals")
                    .where("farmingProposal", "==", !farmingProposal)
                    .where("crop", "==", proposal.crop)
                    .where("price", "<=", proposal.price)
                    .where("returnPercent", ">=", proposal.returnPercent);
                overlap.get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        let otherProposalId = doc.id;
                        let otherProposal = doc.data();
                        let farmer = otherProposal.uid;
                        let investor = proposal.uid;
                        admin.firestore().collection("matches").add({
                            farmer: farmer,
                            investor: investor,
                            farmerProposalId: proposalId,
                            investorProposalId: otherProposalId
                        });
                    });
                });
            }
        }
    });
*/
