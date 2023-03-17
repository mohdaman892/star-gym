    // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
    import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-analytics.js";
    import { getDatabase, ref, onValue, child, get, push, update} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";
    import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut  } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js'
    import { getStorage, uploadBytes, getDownloadURL} from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-storage.js'
    import {ref as sref }  from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-storage.js'

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
    const dbRef = ref(db);
    const storage = getStorage(app);
    const storageRef = sref(storage, 'image1');

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        document.getElementById('hidden-id-field').setAttribute("value", uid);
        if(uid !== `e7nDqhJTD1Xps6dNOtwa6VnbiiS2`) {
            alert("Unauthenticated User")
            const loc= window.location;
            const server = loc.origin;
            const url = server + `/index`;
            window.location.replace(url);
        }
        // ...
      } else {
        // User is signed out
        // ...
        console.log("User signed out")
        // alert("Admin User is not signed in");
        const loc= window.location;
        const server = loc.origin;
        const url = server + `/index`;
        window.location.replace(url);
      }
    });
      
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
                element.value = value;
            };
            const starCountRef = ref(db, 'Prices/' + Key);
        onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data)
        updateStarCount(postElement, data);
        });
    }

    function updateChangesinDB(){
        const priceElement1 = document.getElementById("input-price1");
        const priceElement2 = document.getElementById("input-price2");
        const updates = {};
        updates[`Prices/` + `Monthly`] = priceElement1.value;
        updates[`Prices/` + `3 Months`] = priceElement2.value;
        update(dbRef, updates);
        const auth = getAuth();
        signOut(auth).then(() => {
        // Sign-out successful.
            console.log("SignOut success");
        }).catch((error) => {
        // An error happened.
        });
        const loc= window.location;
        const server = loc.origin;
        const url = server + `/index`;
        window.location.replace(url);
    }

    document.getElementById('saveChanges').addEventListener("click", updateChangesinDB);
  