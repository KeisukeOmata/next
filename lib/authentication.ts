import firebase from 'firebase/app'

function authenticate() {
  firebase
    .auth()
    .signInAnonymously()
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code
      var errorMessage = error.message
      // ...
    })

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log(user.uid)
      console.log(user.isAnonymous)
    } else {
      // User is signed out.
      // ...
    }
    // ...
  })
}

if (process.browser) {
  authenticate()
}