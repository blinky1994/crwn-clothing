import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup,
    GoogleAuthProvider } from 'firebase/auth';

import { 
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBbwPomGnnFCq8Nv224gXoedn-PDMkAMUI",
    authDomain: "crwn-clothing-db-9cf15.firebaseapp.com",
    projectId: "crwn-clothing-db-9cf15",
    storageBucket: "crwn-clothing-db-9cf15.appspot.com",
    messagingSenderId: "644260695745",
    appId: "1:644260695745:web:ffed10c6666d6e523ace40"
  };
  
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef); 

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    if (!userSnapshot.exists()){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            })
        }

        catch (error) {
            console.log('Error creating the user', error.message);
        }
    }

    return userDocRef;
    //if user exists

    //if user does not exist 

    //return userDocRef
}
