const firebaseConfig = {
  apiKey: "AIzaSyDY8698pqybvVg-IuB4gPXcDeax1vMyAAY",
  authDomain: "voiceyourvote-93558.firebaseapp.com",
  projectId: "voiceyourvote-93558",
  storageBucket: "voiceyourvote-93558.firebasestorage.app",
  messagingSenderId: "419285654413",
  appId: "1:419285654413:web:c893ac4b83e6c44016fbc4",
  measurementId: "G-X119QLCTF3"
};

// Initialize Firebase (compat SDK)
const app=firebase.initializeApp(firebaseConfig);

// Access Firebase services
const auth = firebase.auth();
const db = firebase.firestore();

// Export Firebase services for use in other scripts
// Since we're using the compatibility SDK, no need to use 'export'.
window.auth = auth;
window.db = db;