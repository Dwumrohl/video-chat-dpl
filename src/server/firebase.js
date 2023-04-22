import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, signInWithPopup, getAuth, signOut, onAuthStateChanged} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase, push, ref, child, set} from "firebase/database";
import { collection, addDoc,getDocs,
    query, where } from 'firebase/firestore';

var firebaseConfig = {
  apiKey: "AIzaSyCZzeoeLPf9RygQgYkvEI6q5c490KYeChY",
  authDomain: "test-video-chat-4979b.firebaseapp.com",
  projectId: "test-video-chat-4979b",
  storageBucket: "test-video-chat-4979b.appspot.com",
  messagingSenderId: "249820721403",
  appId: "1:249820721403:web:9ce311e53144626720c05e",
  databaseURL: "https://test-video-chat-4979b-default-rtdb.europe-west1.firebasedatabase.app/"
};
// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);


var firepadRef = ref(getDatabase());
//export const userName = prompt("What's your name?");
export const userName = "Олег"; ////

export function roomTemp(){
  const urlparams = new URLSearchParams(window.location.search);
  const roomId = urlparams.get("id");
  
  if (roomId) {
    firepadRef = child(firepadRef, roomId);
  } else {
    //var tempRef = push(firepadRef);
    firepadRef = push(firepadRef);
    //window.history.replaceState(null, "Meet", firepadRef.key);
  }
  return firepadRef.key;
}


async function loginWithGoogle() {
  try {
      const provider = new GoogleAuthProvider();       

      const { user } = await signInWithPopup(auth, provider);
      const q = query(collection(db, "users"), where("uid", "==", user.uid));

      const docs = await getDocs(q);
      if (docs.docs.length === 0) {

          await addDoc(collection(db, "users"), {
      uid: user.uid,
      name: user.displayName,
      authProvider: "google",
      email: user.email,
    });
  }
      return { uid: user.uid, displayName: user.displayName };
  } catch (error) {
      if (error.code !== 'auth/cancelled-popup-request') {
          console.error(error);
      }

      return null;
  }
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in.
    // ...
  } else {
    // User is not signed in.
    // ...
  }
});

const logout = () => {
  signOut(auth);
};


export default firepadRef;
export {loginWithGoogle, auth, db, logout};
