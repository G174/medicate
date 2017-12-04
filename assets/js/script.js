// Initialize firebase
const config = {
  apiKey: 'AIzaSyD9tO_qLWwU_qVwvMSpstjRtRow3m6h57M',
  authDomain: 'sgpharmacylocator.firebaseapp.com',
  databaseURL: 'https://sgpharmacylocator.firebaseio.com',
  projectId: 'sgpharmacylocator',
  storageBucket: 'sgpharmacylocator.appspot.com',
  messagingSenderId: '229367950109'
}
firebase.initializeApp(config)

// Get Elements
//const medications = document.getElementById('medications')

// Create Refrences
var dbRef = firebase.database().ref().child('medications')

// Sync object changes
$('#save_button').click(function(){
  dbRef.set({
    medication:$('#medication').val(),
    dosage:$('#dosage').val()
  })

})
