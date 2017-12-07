import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import firebase, { auth, provider } from './firebase.js'
import './App.css'
import Profile from './profile'

class App extends Component {
  constructor () {
    super()
    this.state = {
      inputs: [],
      redirect: false,
      user: null
    }
  }
  logout () {
    auth.signOut()
  .then(() => {
    this.setState({
      user: null,
      redirect: true
    })
  })
  }
  login () {
    auth.signInWithPopup(provider)
  .then((result) => {
    const user = result.user
    this.setState({
      user
    })
  })
  }
  render () {
    return (
      <Router>
        <div>
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/profile'>Profile</Link></li>
            {this.state.user
          ? <Link to='/' onClick={() => this.logout()}>Log Out</Link>
          : <Link to='/' onClick={() => this.login()}>Log In</Link>
          }
          </ul>

          <Route exact path='/' component={Home} />
          <Route path='/profile' render={() => <Profile loggedIn={this.state.user} />} />
        </div>
      </Router>
    )
  }
  componentDidMount () {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user })
      }
    })
  }
}
const Home = () => (
  <div className='container'>
    <div className='App'>
      <div id='map'>
        <iframe src='https://www.google.com/maps/d/embed?mid=1-WIuuq1TjhOCQnTIWv_hRsvzCeg' width='800' height='600' frameborder='0' allowfullscreen></iframe>
      </div>
    </div>
  </div>
  )

export default App
