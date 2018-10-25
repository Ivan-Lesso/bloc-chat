import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import Landing from './components/Landing';

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
      currentRoom: ''
    };
  }
  handleRoomClick = (index) => {
    this.setState({ currentRoom: index });
  }
  render() {
    return (
      <div className="App">
        <div className="wrapper">
          <nav id="sidebar">
            <RoomList firebase={firebase} handleRoomClick={this.handleRoomClick.bind(this)}/>
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
