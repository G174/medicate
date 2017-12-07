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
    let medRef = firebase.database().ref('/medications')
    medRef.on('value', snapshot => {
      /* Update React state when message is added at Firebase Database */
      // let message = { text: snapshot.val(), id: snapshot.key };
      this.setState({
        medications: snapshot.val()
      })
    })
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
    return (
      <div className='App'>
        <h1>Add Medications</h1>
        <form onSubmit={(e)=>this.handleSubmit(e)}>
          <label>Medication:<input type='text' name='medication' /></label>
          <label>Dosage:<input type='text' name='dosage' /></label>
            <input type="submit" value="save" />
          </form>

        <h1>Medication list</h1>
        <div className='row'>
          { this.state.medications.map((med, index) => {
            return (
              <div className='col s4 m7' key={index}>
                <div className='card'>
                  {/* <div className='card-image'>
                    <img src='assets/images/panadol.jpg' alt='paracetamol'></img>
                  </div> */}
                  <span className='card-title'>{med.medication}</span>
                  <div className='card-content'>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default Profile
