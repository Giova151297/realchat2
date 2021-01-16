
import React, {useState, useEffect} from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import Channel from './Components/Channel'
import Button from './Components/Button';
firebase.initializeApp({
 
    apiKey: "AIzaSyDGXYi7hXaaLMH88Y0rSg-sePDdWCdJ0zQ",
    authDomain: "chat2-51d18.firebaseapp.com",
    projectId: "chat2-51d18",
    storageBucket: "chat2-51d18.appspot.com",
    messagingSenderId: "44046589079",
    appId: "1:44046589079:web:a389ee4eacc3d412595dd2"
  
})
const db = firebase.firestore();

function App() {
  const [user, setUser] = useState(() => firebase.auth.currentUser);
  
const [initializing, setInitializing]= useState(true);
  useEffect(()=>{
    const unsubscribe = firebase.auth().onAuthStateChanged(user =>{
      if (user){
       setUser(user);
      }else {
        setUser(null);
      }
      if (initializing){
        setInitializing(false);
      }
    });
    return unsubscribe;
  }, []);
   
const signInWithGoogle = async () =>{
const provider = new firebase.auth.GoogleAuthProvider();
firebase.auth().useDeviceLanguage();
try{
  await firebase.auth().signInWithPopup(provider);
} catch(error){
  console.error(error);
}
  }

const signOut = async ()=>{
  try{
    await firebase.auth().signOut();
  } catch(error){
    console.log(error.message);
  }
}

if (initializing) return "Loading ...";

  return (
    <div>
    {
      user ? (
        <>
          <Button onClick={signOut}>Sign out</Button>
          <Channel user={user} db={db}/>
        </>
      ) : <Button onClick={signInWithGoogle}>Sign in with Google</Button>
    }
  </div>
);
}

export default App;
