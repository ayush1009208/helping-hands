// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyA-WJoSEp71nmbqFvz62Yw7P4Qih5QIG7E",
    authDomain: "miniproject-edffe.firebaseapp.com",
    databaseURL: "https://miniproject-edffe-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "miniproject-edffe",
    storageBucket: "miniproject-edffe.appspot.com",
    messagingSenderId: "210609554643",
    appId: "1:210609554643:web:8a14eef8d81a89ec2bc026"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function addVolunteer() {
    const firstName = document.querySelector('input[placeholder="First Name"]').value.trim();
    const middleName = document.querySelector('input[placeholder="Middle Name"]').value.trim();
    const lastName = document.querySelector('input[placeholder="Last Name"]').value.trim();
    const email = document.querySelector('input[placeholder="Enter here"]').value.trim();
    const dob = document.querySelector('input[placeholder="DD/MM/YYYY"]').value.trim();
    const contactNumber = document.querySelector('input[placeholder="10digit only"]').value.trim();
    const streetAddress = document.querySelector('input[placeholder="Street Address"]').value.trim();
    const streetAddressLine2 = document.querySelector('input[placeholder="Street Address line2"]').value.trim();
    const city = document.querySelector('input[placeholder="City"]').value.trim();
    const state = document.querySelector('input[placeholder="State"]').value.trim();
    const pinCode = document.querySelector('input[placeholder="Pin Code"]').value.trim();
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const skills = document.querySelector('select').value;
    const availability = document.querySelector('input[name="availability"]:checked').value;
    const reason = document.querySelector('input[placeholder="Type here"]').value.trim();

    if (firstName && email && dob && contactNumber && streetAddress && city && state && pinCode) {
        db.collection("volunteers").add({
            firstName,
            middleName,
            lastName,
            email,
            dob,
            contactNumber,
            streetAddress,
            streetAddressLine2,
            city,
            state,
            pinCode,
            gender,
            skills,
            availability,
            reason,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        }).then(() => {
            alert("Volunteer added!");
            document.querySelector('input[placeholder="First Name"]').value = "";
            document.querySelector('input[placeholder="Middle Name"]').value = "";
            document.querySelector('input[placeholder="Last Name"]').value = "";
            document.querySelector('input[placeholder="Enter here"]').value = "";
            document.querySelector('input[placeholder="DD/MM/YYYY"]').value = "";
            document.querySelector('input[placeholder="10digit only"]').value = "";
            document.querySelector('input[placeholder="Street Address"]').value = "";
            document.querySelector('input[placeholder="Street Address line2"]').value = "";
            document.querySelector('input[placeholder="City"]').value = "";
            document.querySelector('input[placeholder="State"]').value = "";
            document.querySelector('input[placeholder="Pin Code"]').value = "";
            document.querySelector('input[placeholder="Type here"]').value = "";
        }).catch(error => {
            console.error("Error adding volunteer: ", error);
        });
    } else {
        alert("Please fill in all required fields.");
    }
}
