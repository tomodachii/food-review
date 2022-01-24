// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCQPCShSr9fZB96i04wbXf0xXGXVIzjfII',
  authDomain: 'chat-files-storage.firebaseapp.com',
  projectId: 'chat-files-storage',
  storageBucket: 'chat-files-storage.appspot.com',
  messagingSenderId: '1048765770215',
  appId: '1:1048765770215:web:cddeb7e2fc688f19e3f542',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
