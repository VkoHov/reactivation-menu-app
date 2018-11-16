import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Replace this with your own config details
var config = {
    apiKey: "AIzaSyA9DOwXutW8btr-nwMGoQqulH5PWzMbqwc",
    authDomain: "reactivation-8bfeb.firebaseapp.com",
    databaseURL: "https://reactivation-8bfeb.firebaseio.com",
    projectId: "reactivation-8bfeb",
    storageBucket: "reactivation-8bfeb.appspot.com",
    messagingSenderId: "669461431553"
};
firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase
