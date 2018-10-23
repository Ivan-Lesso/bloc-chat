import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';

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
  render() {
    return (
      <div className="App">
        <div className="wrapper">
          <nav id="sidebar">
            <RoomList firebase={firebase}/>
          </nav>
          <div id="content">
            <MessageList firebase={firebase}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
