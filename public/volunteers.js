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

function renderVolunteers(doc) {
    const volunteerList = document.getElementById("volunteer-list");
    const volunteerItem = document.createElement("li");
    volunteerItem.className = "volunteer-item bg-white bg-opacity-10 p-4 rounded-lg";
    volunteerItem.setAttribute("data-id", doc.id);
    volunteerItem.innerHTML = `
        <div class="volunteer-content">
            <h3 class="text-xl font-bold">${doc.data().firstName} ${doc.data().middleName} ${doc.data().lastName}</h3>
            <p>Email: ${doc.data().email}</p>
            <p>DOB: ${doc.data().dob}</p>
            <p>Contact: ${doc.data().contactNumber}</p>
            <p>Address: ${doc.data().streetAddress}, ${doc.data().streetAddressLine2}, ${doc.data().city}, ${doc.data().state} - ${doc.data().pinCode}</p>
            <p>Gender: ${doc.data().gender}</p>
            <p>Skills: ${doc.data().skills}</p>
            <p>Availability: ${doc.data().availability}</p>
            <p>Reason: ${doc.data().reason}</p>
        </div>
    `;
    volunteerList.appendChild(volunteerItem);
}

db.collection("volunteers")
    .orderBy("timestamp", "desc")
    .onSnapshot(snapshot => {
        const changes = snapshot.docChanges();
        changes.forEach(change => {
            if (change.type === "added") {
                renderVolunteers(change.doc);
            } else if (change.type === "removed") {
                removeVolunteerFromDOM(change.doc.id);
            }
        });
    });

function removeVolunteerFromDOM(id) {
    const volunteerItem = document.querySelector(`li[data-id='${id}']`);
    if (volunteerItem) {
        volunteerItem.remove();
    }
}
