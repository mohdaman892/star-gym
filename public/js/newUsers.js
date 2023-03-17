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
        console.log(uid);
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




    const usersDiv = document.getElementById("userslistdiv");
    console.log(usersDiv);
    const starCountRef = ref(db, 'New Requests/');
    onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        for(const key in data){
            const listData = document.createElement("li");
            listData.setAttribute("id", "user-list");
            listData.innerHTML = "<span><label>Name:</label><span>" + data[key]['Name'] + "</span><label>Phone:<span>"+ data[key]['phone'] +"</span></label><label>Comments:</label><span>" + data[key]['comments'] + "</span></span>"
            usersDiv.appendChild(listData)
        }
    });

    document.getElementById("deleteButton").addEventListener("click", function f(){
            console.log("Deleting all new requests");
            const updates = {};
            updates['New Requests'] = {}
            update(ref(db), updates);
            location.reload();
    });