
    // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
    import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-analytics.js";
    import { getDatabase, ref, onValue, child, get, push, update} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";
    import { getAuth, GoogleAuthProvider, signInWithPopup } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js';

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



    document.getElementById('signInButton').addEventListener("click", function f() {
        const provider = new GoogleAuthProvider();
        console.log(provider);
        const auth = getAuth();
     return signInWithPopup(auth, provider)
    .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        document.getElementById('hidden-field').setAttribute("value", user.uid);
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








