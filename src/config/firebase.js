import { initializeApp } from "firebase/app";
import { getAuth, updatePassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDocs, getDoc, addDoc, collection, getFirestore } from "firebase/firestore";
import { category } from "../api/tmdbApi";

const firebaseConfig = {
  apiKey: "AIzaSyAXlCU9lLmMX4zTQ_nBfk54nz82QSX1iqw",
  authDomain: "movie-ff1a3.firebaseapp.com",
  projectId: "movie-ff1a3",
  storageBucket: "movie-ff1a3.appspot.com",
  messagingSenderId: "1048213275613",
  appId: "1:1048213275613:web:8951855ca293662d96ac34"
}

initializeApp(firebaseConfig);

const auth = getAuth();
export const db = getFirestore();
export default auth;



export const getUserByEmail = async (email) => {
  try {
    const result = await getDocs(collection(db, "users"));
    // return result;
    return result.docs.find(value => value.data().email == email);
  }
  catch (e) {
    console.log('Error getting document: ', e);
  }
}

export const addUser = async (email, password, userName) => {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      email,
      password,
      userName
    });
    return docRef;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export const addWatchList = async (userId) => {
  try {
    const docRef = await addDoc(collection(db, "watchLists"), {
      userId,
      watchList:[
        {
          id: 338953,
          category: 'movie'
        }
      ],
    });
    return docRef;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export const getWatchListByUserId = async (id) => {
  try {
    const result = await getDocs(collection(db, "watchLists"));
    // return result;
    return result.docs.find(value => value.data().userId === id);
  }
  catch (e) {
    console.log('Error getting document: ', e);
  }
}

export const getUser = async (id) => {
  try {
    const result = await getDoc(doc(db, "users", id));
    return result;
  }
  catch (e) {
    console.log('Error getting document: ', e);
  }
}


