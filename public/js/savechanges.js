    // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
    import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-analytics.js";
    import { getDatabase, ref, onValue, child, get, push, update} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";
    import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut  } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js'
    import { getStorage, uploadBytes, getDownloadURL} from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-storage.js'
    import {ref as sref }  from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-storage.js'

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
    const dbRef = ref(db);
    const storage = getStorage(app);
    const storageRef = sref(storage, 'image1');

    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        document.getElementById('hidden-id-field').setAttribute("value", uid);
        const obj = {"name": uid}
        const loc = window.location;
        const server = loc.origin;
        const respo = await fetch(server+'/verifyUid', {
          method: 'POST',
          body: JSON.stringify(obj),
          headers: {
            "Content-type": "application/json"
          }
        });
        const responseText = await respo.text();
        console.log(responseText);
        if(responseText!=="Yes") {
            alert("Unauthenticated User")
            const loc= window.location;
            const server = loc.origin;
            const url = server + `/index`;
            window.location.replace(url);
        }
      } else {
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
            var Key = undefined;
            if(postElement.parentElement.id === `price1`)  Key = `Monthly`
            else Key = `3 Months`
            var updateStarCount = function(element, value) {
                element.value = value;
            };
            const starCountRef = ref(db, 'Prices/' + Key);
        onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
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
        }).catch((error) => {
        // An error happened.
        });
        const loc= window.location;
        const server = loc.origin;
        const url = server + `/index`;
        window.location.replace(url);
    }

    document.getElementById('saveChanges').addEventListener("click", updateChangesinDB);
  