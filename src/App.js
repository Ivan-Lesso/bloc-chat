import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import Landing from './components/Landing';
import User from './components/User';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAOhnoIdlKInpeGKR8HJw_-NIqerCgBeyI",
  authDomain: "bloc-chat-1c381.firebaseapp.com",
  databaseURL: "https://bloc-chat-1c381.firebaseio.com",
  projectId: "bloc-chat-1c381",
  storageBucket: "bloc-chat-1c381.appspot.com",
  messagingSenderId: "41523516273"
};
firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentRoom: '',
      currentUser: 'Guest'
    };
  }
  handleRoomClick = (index) => {
    this.setState({ currentRoom: index });
  }
  handleSigninClick = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup( provider );
  }
  handleSignoutClick = () => {
    firebase.auth().signOut();
    this.setState({ currentUser: 'Guest' });
  }
  setUser = (user) => {
    this.setState({ currentUser: user.displayName });
  }
  componentDidMount = () => {
    firebase.auth().onAuthStateChanged( user => {
      if (user) this.setUser(user);
    });
  }
  render() {
    return (
      <div className="App">
        <div className="wrapper">
          <nav id="sidebar">
            <RoomList firebase={firebase} handleRoomClick={this.handleRoomClick.bind(this)}/>
            <div className="fixed-bottom userButton">
              <User currentUser={this.state.currentUser} handleSigninClick={ () => { this.handleSigninClick() } } handleSignoutClick={ () => { this.handleSignoutClick() } } />
            </div>
          </nav>
          <div id="content">
            <main>
              <Route exact path="/" component={Landing} />
              <Route
                path='/room/:roomKey'
                render={(props) => <MessageList {...props} firebase={firebase} currentRoom={this.state.currentRoom} />}
              />
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
