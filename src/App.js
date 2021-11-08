import React from 'react';
import './App.css';
import  firebase from 'firebase/compat/app';
import "firebase/firestore";
import "firebase/auth";

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

// firebase initial app
firebase.initializeApp({
  apiKey: "AIzaSyDWCnKKZ3CeJuDjNYqZtOkoAu20EKrKoNA",
  authDomain: "chatting-app-72a60.firebaseapp.com",
  projectId: "chatting-app-72a60",
  storageBucket: "chatting-app-72a60.appspot.com",
  messagingSenderId: "140274017200",
  appId: "1:140274017200:web:edb61cbae922cd4eb56c75"
});

const auth = firebase.auth();
const firestore = firebase.firestore();

const [user] = useAuthState(auth);

function App() {
  return (
    <div className="App">
      <header className="App-header">
       
      </header>

      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  );
}

// sign in Component
function SignIn(){
  const signInWithGoogle = () =>{
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.SignInWithPopup(provider);
  }

  return(
    <button onClick={signInWithGoogle}>Sign in With Google</button>
  )
}

function SignOut(){
  return auth.currentUser && (
    <button onClick={()=> auth.signOut()}>Sign Out</button>
  )
}

function ChatRoom() {

  const messageRef = firestore.collection('messages');
  const query = messageRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, {'idField': 'id'})

  return (
    <>
      <div>
        { messages && messages.map(msg=> <ChatMessage key={msg.id} message={msg} /> )}
      </div>
    </>
  )

}

function ChatMessage(props) {
  const {text,uid} = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (
    <p>
      {text}
    </p>
  )
}
export default App;
