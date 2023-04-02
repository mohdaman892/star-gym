
    // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
    import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-analytics.js";
    import { getDatabase, ref, onValue, child, get, push, update} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";
    import { getAuth, GoogleAuthProvider, signInWithPopup } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js';

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

    document.getElementById('login-with-google-btn').addEventListener("click", function f() {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
     return signInWithPopup(auth, provider)
    .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        document.getElementById('hidden-field').setAttribute("value", user.uid);
        document.getElementById('name-after-login').textContent = `Welcome ` + user.displayName;
        document.getElementById('name-after-login').style.fontSize = "xx-large";
        // IdP data available using getAdditionalUserInfo(result)
        // ...
    }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
    });
})








