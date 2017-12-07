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
          <h1>Add Medications</h1><br/>
          <div className='row'>
            <div className='col s4 m7'>
              <div className='card'>
                <div className='card-image'>
                  <img src='images/sample-1.jpg'></img>
                  <span className="card-title">Card Title</span>
                </div>
                <div className="card-content">
                  <form onSubmit={(e)=>this.handleSubmit(e)}>
                  <label>
                    Medication:
                  <input type='text' name="medication" />
                </label>
              <label>
                  Dosage:
                  <input name="dosage" type='text' id="dosage" />
                </label>
                  {/* <button id="edit_button" onClick={() => this.update()}>Edit</button> */}
                  <input type="submit" value="save" />
                </form>
                </div>
              </div>
            </div>
          </div>
      </div>
    )
  }
}

export default Profile
