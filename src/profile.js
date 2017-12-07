import React, { Component } from 'react'
import firebase from './firebase.js'
import './App.css'


class Profile extends Component {
  constructor (props) {
    super()
    this.state = {
      medication: '',
      dosage: '',
      user: props.logggedIn
    }
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
          <div className='col s4 m7'>
            <div className='card'>
              <div className='card-image'>
                <img src='assets/images/panadol.jpg' alt='paracetamol'></img>
              </div>
              <span className='card-title'></span>
              <div className='card-content'>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Profile
