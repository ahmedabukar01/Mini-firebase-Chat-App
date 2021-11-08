import './App.css';
import firebase from 'firebase/app';
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

export default App;
