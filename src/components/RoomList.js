import React, { Component } from 'react';
import CreateRoomForm from './CreateRoomForm';

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
      showRoomModalForm: false,
      newRoomName: ''
    };
    this.roomsRef = this.props.firebase.database().ref('rooms');
  }
  showRoomModal = () => {
    this.setState({ showRoomModalForm: true });
  };

  hideRoomModal = () => {
    this.setState({ showRoomModalForm: false });
  };

  handleRoomType = (e) => {
    e.preventDefault();
    this.setState({ newRoomName: e.target.value });
  };

  handleRoomCreate = () => {
    this.roomsRef.push({
      name: this.state.newRoomName
    });
    this.setState({ showRoomModalForm: false });
  };

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( { room } ) })
    });
  }
  render() {
    return (
      <section className="">
      <div className="sidebar-header">
        <h3>Bloc Chat</h3>
        <CreateRoomForm show={this.state.showRoomModalForm} newRoomName={this.state.newRoomName} handleRoomType={(e) => this.handleRoomType(e)} handleClose={() => this.hideRoomModal()} handleRoomCreate={() => this.handleRoomCreate()}>
          <p>Modal</p>
          <p>Data</p>
        </CreateRoomForm>
        <button type="button" onClick={this.showRoomModal}>
          Create Room
        </button>
      </div>
      <ul>
      {
        this.state.rooms.map((item, index) =>
            <li key={index}>{item.room.name}</li>
        )
      }
      </ul>
      </section>
    );
  }
}

export default RoomList;
