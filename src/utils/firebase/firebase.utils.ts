import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    User,
    NextOrObserver
} from 'firebase/auth';

import { 
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs,
    QueryDocumentSnapshot
} from 'firebase/firestore';

import { Category } from '../../store/category/category.types';

const firebaseConfig = {
    apiKey: "AIzaSyBbwPomGnnFCq8Nv224gXoedn-PDMkAMUI",
    authDomain: "crwn-clothing-db-9cf15.firebaseapp.com",
    projectId: "crwn-clothing-db-9cf15",
    storageBucket: "crwn-clothing-db-9cf15.appspot.com",
    messagingSenderId: "644260695745",
    appId: "1:644260695745:web:ffed10c6666d6e523ace40"
  };
  
// Initialize Firebase
initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

export const db = getFirestore();

export type ObjectToAdd = {
    title: string; 
}
export const addCollectionAndDocuments = async <T extends ObjectToAdd>(
    collectionKey: string,
    objectsToAdd: T[]
    ) : Promise<void> => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach(object => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });

    await batch.commit();
    console.log('done');
};

export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
    const collectionRef = collection (db, 'categories');
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(docSnapshot => docSnapshot.data() as Category);
}

export type AdditionalInformation = {
    displayName?: string;
}

export type UserData = {
    createdAt: Date;
    displayName: string;
    email: string;
}

export const createUserDocumentFromAuth = async (
    userAuth: User, 
    additionalInfo = {} as AdditionalInformation) : Promise<QueryDocumentSnapshot<UserData> | void> => {
    if (!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);
    // console.log(userDocRef); 

    const userSnapshot = await getDoc(userDocRef);
    // console.log(userSnapshot);
    // console.log(userSnapshot.exists());

    if (!userSnapshot.exists()){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInfo
            })
        }

        catch (error) {
            console.log('Error creating the user', error);
        }
    }

    return userSnapshot as QueryDocumentSnapshot<UserData>;
}

export const createAuthUserWithEmailandPassword =
 async (email: string, password: string) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = 
async (email: string, password: string) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
 onAuthStateChanged(auth, callback);

 export const getCurrentUser = () : Promise<User | null>=> {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(
            auth,
            (userAuth) => {
                unsubscribe();
                resolve(userAuth);
            },
            reject
        )
    })
 }