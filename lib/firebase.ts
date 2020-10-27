import firebase from 'firebase/app'
import 'firebase/analytics'
import 'firebase/auth'
import 'firebase/firestore'

// typeof window !== 'undefined'でブラウザでの読み込みの場合
// firebase.apps.length === 0で初回の初期化時の場合
if (typeof window !== 'undefined' && firebase.apps.length === 0) {
  const firebaseConfig = {
    apiKey: "AIzaSyC153dApxFJGKp0YGKYwAGBerHw5GNgaoM",
    authDomain: "next-57fd0.firebaseapp.com",
    databaseURL: "https://next-57fd0.firebaseio.com",
    projectId: "next-57fd0",
    storageBucket: "next-57fd0.appspot.com",
    messagingSenderId: "884347730579",
    appId: "1:884347730579:web:4f94c221c14352a2b32b66",
    measurementId: "G-F5PJKYMCER"
  }

  firebase.initializeApp(firebaseConfig)
  firebase.analytics()
}