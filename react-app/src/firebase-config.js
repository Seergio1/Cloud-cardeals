import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';

import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLyiwVOsj-zA1gJutT1veD8X4GbfnAlFQ",
  authDomain: "messagerie-c2812.firebaseapp.com",
  projectId: "messagerie-c2812",
  storageBucket: "messagerie-c2812.appspot.com",
  messagingSenderId: "274464842398",
  appId: "1:274464842398:web:386a516159c5d9943f118f"
};

const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);

const auth = getAuth(app);

setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log('Session persistence set');
  })
  .catch((error) => {
    console.error('Error setting session persistence', error);
  });

export { firestore, auth }