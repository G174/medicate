import React, { Component } from 'react'
import firebase from './firebase.js'
import './App.css'

class Profile extends Component {
  constructor (props) {
    super()
    this.state = {
      medication: [],
      dosage: [],
      reminder: [],
      user: props.logggedIn
    }
  }


  // componentDidMount () {
  //     const dbRef = firebase.database().ref().child('medications')
  //     const medRef = dbRef.child('medication')
  //     medRef.on('value', snap => {
  //       this.setState({
  //         medication: snap.val(),
  //         dosage: snap.val()
  //       })
  //     })
  //     $('#save_button').onClick(function (){
  //       dbRef.set({
  //         medication:$('#medication').val(),
  //         dosage:$('#dosage').val()
  //       })
  //     $('#edit_button').onClick(function(){
  //       dbRef.update({
  //         medication:$('#medication').val(),
  //         dosage: $('#dosage').val()
  //       })
  //     })
  //   })
  // }

  render () {
    return (
      <div className="App">
          <h1>Medications</h1><br/>
          <div class="row">
            <div class="col s4 m7">
              <div class="card">
                <div class="card-image">
                  <img src="images/sample-1.jpg"></img>
                  <span class="card-title">Card Title</span>
                </div>
                <div class="card-content">
                  <h6>Medication: </h6><input type="text" id="medication">{this.state.medication}</input>
                  <h6>Dosage: </h6><input type="text" id="dosage">{this.state.dosage}</input>
                  <button id="edit_button" onClick ={this.update.bind}>Edit</button>
                  <button id="save_button">Save</button>
                </div>
              </div>
            </div>
          </div>
      </div>
    );
  }
}

export default Profile
