import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getStorage } from 'firebase/storage';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyClWycO-KeuFMZ2CJUrU_TIio3I_p0JA3A",
  authDomain: "legalease-34703.firebaseapp.com",
  projectId: "legalease-34703",
  storageBucket: "legalease-34703.appspot.com",
  messagingSenderId: "891792241491",
  appId: "1:891792241491:web:6ebbc10f0ecfb447dc67a6",
  measurementId: "G-S0ZR2FQ49Q"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
//console.log(firestore);
export { auth, firestore, createUserWithEmailAndPassword, storage };