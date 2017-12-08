import React, { Component } from 'react'
import firebase from './firebase.js'
import './App.css'

class Profile extends Component {
  constructor (props) {
    super()
    this.state = {
      medications: [],
      dosage: '',
      user: props.logggedIn
    }
    console.log(firebase)
  }

  componentDidMount () {
    /* Create reference to messages in Firebase Database */
    let medRef = firebase.database().ref('/medications').orderByKey()
    medRef.on('value', snapshot => {
      /* Update React state when medication is added at Firebase Database */
      this.setState({
        medications: snapshot.val()
      })
    })
  }

  remove (e, deletedIndex) {
    e.preventDefault()
    console.log('deletedIndex', deletedIndex)
    // var key = this.data('key')
    firebase.database().ref('/medications').child(deletedIndex).remove()
  }

  handleSubmit (e) {
    e.preventDefault()

    const formData = Array.from(e.target.elements)
            .filter(el => el.name)
            .reduce((a, b) => ({...a, [b.name]: b.value}), {})
    console.log('target elements', formData)

    var starCountRef = firebase.database().ref('medications')
    var childNumber = 0
    starCountRef.once('value', function (snap) {
      childNumber = snap.numChildren()
      starCountRef.child(childNumber).set(formData)
    })
  }
  render () {
    let allMedications = 'Please add new medication...'
    if (this.state.medications.length !== 0) {
      allMedications = this.state.medications.map((med, index) => {
        return (
          <div className='col s3 m5' key={index}>
            <div className='card'>
              {/* <div className='card-image'>
                <img src='../assets/images/panadol.jpg' alt='paracetamol.jpg'></img>
              </div> */}
              <span className='card-title'>{med.medication}</span>
              <div className='card-content'>{med.dosage}
                <div class='card-action'>
                  <button onClick={(e) => this.remove(e, index)}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        )
      })
    }

    return (
      <div className='App'>
        <h1>Add Medications</h1>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <label><h4>Medication:</h4><input type='text' name='medication' /></label>
          <label><h4>Dosage:</h4><input type='text' name='dosage' /></label>
          <input type='submit' value='save' />
        </form>

        <h1>Medication list</h1>
        <div className='row'>
          { allMedications }
        </div>
      </div>
    )
  }
}

export default Profile
