import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyACAlzptPufvxG9YsKis1W2Gdw0Dpaki-o",
  authDomain: "cloud-storage-9a7d9.firebaseapp.com",
  projectId: "cloud-storage-9a7d9",
  storageBucket: "cloud-storage-9a7d9.firebasestorage.app",
  messagingSenderId: "41904069134",
  appId: "1:41904069134:web:2e6d2b8630bfec0432fa5f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db}