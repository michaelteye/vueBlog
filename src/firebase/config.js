import firebase from "firebase/app"
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyD-pI8S2TM5yTQ4SEKH0IXHXsf616KLzTU",
    authDomain: "mike-s-blog-ab1d4.firebaseapp.com",
    projectId: "mike-s-blog-ab1d4",
    storageBucket: "mike-s-blog-ab1d4.appspot.com",
    messagingSenderId: "102619986276",
    appId: "1:102619986276:web:dc011cea14a08024f72271"
};

firebase.initializeApp(firebaseConfig)

const ProjectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const ProjectStorage = firebase.storage()

// timestamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { ProjectFirestore,projectAuth,ProjectStorage,timestamp}