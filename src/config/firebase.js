//import * as firebase from 'firebase/app';
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, deleteUser, getAuth, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBQuFHbaOSWWIyZsXGnU_jFYCg2enqF1g4",
  authDomain: "store-366421.firebaseapp.com",
  databaseURL: "https://store-366421-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "store-366421",
  storageBucket: "store-366421.appspot.com",
  messagingSenderId: "229958301314",
  appId: "1:229958301314:web:5830b882a6783ffe26e69b",
  measurementId: "G-59B7FJBDD3"
};

//if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const google = {
  user:async()=>auth.currentUser,
  signInWithGoogle: async () => {
    await auth.signInWithPopup(new GoogleAuthProvider());
  },

  auth:()=> getAuth(app),

  popup:async()=>{
    return await signInWithPopup(auth,new GoogleAuthProvider()).then(data=>data)
  },

  signin:async(email,password)=>{
    return await signInWithEmailAndPassword(auth,email,password).then((user) =>user).catch((e) => e.message)
  },

  signup:async({name,email,password})=>{
    await createUserWithEmailAndPassword(auth, email, password).then((u)=>u.user).catch((e) => [e.code,e.message])
    if (name) {
      updateProfile(auth.currentUser, {displayName: name}).then((u) => u).catch((e) => e);
    }
  },

  check:async(callback)=>{
    return await onAuthStateChanged(auth,callback)
  },

  update:({name,photoURL})=>{
    updateProfile(auth.currentUser, {displayName: name, photoURL: photoURL}).then((data) => true).catch(() => false);
  },

  checkAuthState:(type)=>{
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          if(!type) resolve(user)
          if(type === "getUser") resolve(user)
          else resolve(true)
        } else {
          if(!type) resolve(false);
          else resolve(false)
        }
        unsubscribe();
      });
    })
  },
  forget:async(email)=>{
    sendPasswordResetEmail(auth, email).then(()=>true).catch((e)=>false);
  },

  logout:async()=>{
    signOut(auth).then(()=>true).catch(()=>null)
  },

  delete:({user})=>{
    deleteUser(user).then(()=>true).catch((error)=>error);
  }
}

export default app;