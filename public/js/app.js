
    // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
    import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-analytics.js";
    import { getDatabase, ref, onValue, child, get, push, update} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";
    import { getAuth, GoogleAuthProvider, signInWithPopup } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js'


    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries
  
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
      apiKey: "AIzaSyCNDONYJMyiLV3NxBNcO0MqSFy--17kg64",
      authDomain: "stargym-19c81.firebaseapp.com",
      projectId: "stargym-19c81",
      storageBucket: "stargym-19c81.appspot.com",
      messagingSenderId: "946227482449",
      appId: "1:946227482449:web:adb94cb87469315cab4d70",
      measurementId: "G-GJPGWDBWSR",
      databaseURL: "https://stargym-19c81-default-rtdb.asia-southeast1.firebasedatabase.app",
    };
  
    // Initialize Firebase
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
            console.log(postElement);
            console.log(postElement.parentElement)
            var Key = undefined;
            if(postElement.parentElement.id === `price1`)  Key = `Monthly`
            else Key = `3 Months`
            var updateStarCount = function(element, value) {
                element.textContent = value;
            };
            const starCountRef = ref(db, 'Prices/' + Key);
        onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data)
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





