import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
        apiKey: "",
        authDomain: "catch-of-the-day-5f0b6.firebaseapp.com",
        databaseURL: "https://catch-of-the-day-5f0b6.firebaseio.com",
});

const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp};

// This is a default export
export default base;

