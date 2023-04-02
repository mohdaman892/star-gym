
    // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
    import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-analytics.js";
    import { getDatabase, ref, onValue, child, get, push, update} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";

    // Initialize Firebase
    const loc = window.location;
    const server = loc.origin;
    const response = await fetch(server+'/fire');
    const config = await response.json();
    const firebaseConfig = {
        apiKey: config["apiKey"],
        authDomain: config["authDomain"],
        projectId: config["projectId"],
        storageBucket: config["storageBucket"],
        messagingSenderId: config["messagingSenderId"],
        appId: config["appId"],
        measurementId: config["measurementId"],
        databaseURL: config["databaseURL"],
      };
    const app = initializeApp(firebaseConfig);  
    const analytics = getAnalytics(app);
    const db = getDatabase();
    const dbRef = ref(getDatabase());
    // Method to get Updated prices from the DB
    const priceElement1 = document.getElementById("price1").childNodes[1];
    const priceElement2 = document.getElementById("price2").childNodes[1];
    updatePrices(priceElement1);
    updatePrices(priceElement2);
    function updatePrices(postElement){
            var Key = undefined;
            if(postElement.parentElement.id === `price1`)  Key = `Monthly`
            else Key = `3 Months`
            var updateStarCount = function(element, value) {
                element.textContent = value;
            };
            const starCountRef = ref(db, 'Prices/' + Key);
        onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        updateStarCount(postElement, data);
        });
    }
    document.getElementById('enquiry-form').addEventListener("submit", function f() {
        const phone = document.getElementById("form-phone");
        const formName = document.getElementById("form-name");
        const comments = document.getElementById("form-comments");
        const updates = {}
        const postData = {}
        const uniq = 'id' + (new Date()).getTime();
        postData[`phone`] = phone.value;
        postData[`Name`] = formName.value; 
        postData[`comments`] = comments.value;
        updates[`New Requests/` + uniq + `/`] = postData;
        update(ref(db), updates);
        alert("Thanks! Your response has been submitted");
        phone.value = null;
        formName.value = null;
        comments.value = null;
    });





