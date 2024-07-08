// lib/firebase.ts
import { getApps, initializeApp } from "firebase/app"
import { getStorage, ref } from "firebase/storage"

const firebaseConfig = {
    apiKey: process.env.FIREBASEAPIKEY,
    authDomain: process.env.AUTHDOMAIN,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.BUCKET,
    messagingSenderId: "566968385357",
    appId: "1:566968385357:web:7b009765b93e9bb1fb8104",
    measurementId: "G-KBZE95VTLK"
}


const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

const storage = getStorage(app)
export const storageRef = (token: string) => ref(storage, token)