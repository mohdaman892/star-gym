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
    const cardsDiv = document.getElementById("cards-section");
    const starCountRef = ref(db, 'New Requests/');
    onValue(starCountRef, async (snapshot) => {
        const data = snapshot.val();
        for(const key in data){
            const card = document.createElement("article");
            card.setAttribute("class", "card");
            const obj = {"name": data[key]['Name']}
            const loc = window.location;
            const server = loc.origin;
            const respo = await fetch(server+'/getGender', {
              method: 'POST',
              body: JSON.stringify(obj),
              headers: {
                "Content-type": "application/json"
              }
            });
            const responseText = await respo.text();
            var gen = "male"
            if(responseText==="female") {
                gen = "female"
            }
            card.innerHTML = "<picture><img id='user-card-pic' src='images/"+gen+".jpg' alt='Male/Boy'></picture><div class='card-content'><p class='card-title'>"+data[key]["Name"]+"</p><p class='card-phone'>"+data[key]["phone"]+"</p><p class='card-para'>"+data[key]["comments"]+"</p></div>"
            cardsDiv.appendChild(card);
        }
    });
    document.getElementById("deleteButton").addEventListener("click", function f(){
            const updates = {};
            updates['New Requests'] = {}
            update(ref(db), updates);
            location.reload();
    });