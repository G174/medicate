import firebase from 'firebase'

var config = {
  apiKey: 'AIzaSyD9tO_qLWwU_qVwvMSpstjRtRow3m6h57M',
  authDomain: 'sgpharmacylocator.firebaseapp.com',
  databaseURL: 'https://sgpharmacylocator.firebaseio.com',
  projectId: 'sgpharmacylocator',
  storageBucket: 'sgpharmacylocator.appspot.com',
  messagingSenderId: '229367950109'
}
firebase.initializeApp(config)
// authentication
export const provider = new firebase.auth.GoogleAuthProvider()
export const auth = firebase.auth()

// var secondaryAppConfig = {
//   apiKey: "AIzaSyCcWQrcKiKLlQbTr07lFjflsEb_Tem1US8",
//   authDomain: "therapeutic-drugs.firebaseapp.com",
//   databaseURL: "https://therapeutic-drugs.firebaseio.com",
//   storageBucket: "therapeutic-drugs.appspot.com",
// };
// // Initialize another app with a different config
// var secondary = firebase.initializeApp(secondaryAppConfig, "secondary")
//
// // Retrieve the database.
// var secondaryDatabase = secondary.database()

export default firebase
