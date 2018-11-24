import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage'

// Replace this with your own config details

var config = {
    apiKey: "AIzaSyB1heLOYN_GTbdAYdC8Lrt-K7x2O5ZtJe4",
    authDomain: "menu-app-d88b1.firebaseapp.com",
    databaseURL: "https://menu-app-d88b1.firebaseio.com",
    projectId: "menu-app-d88b1",
    storageBucket: "menu-app-d88b1.appspot.com",
    messagingSenderId: "523981174616"
};
  firebase.initializeApp(config);
const storage = firebase.storage();
firebase.firestore().settings({ timestampsInSnapshots: true });

export {storage,firebase  as default}
