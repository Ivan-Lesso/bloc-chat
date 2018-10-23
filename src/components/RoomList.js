import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: []
    };
    this.roomsRef = this.props.firebase.database().ref('rooms');
    //console.log(this.roomsRef);
  }
  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      let room = {};
      room.val = snapshot.val();
      room.key = snapshot.key;
      console.log(room);
      this.setState({ rooms: this.state.rooms.concat( room.val ) })
    });
  }
  render() {
    return (
      <section className="">
      <ul>
      {
        this.state.rooms.map((room, index) =>
            <li>{room}</li>
        )
      }
      </ul>
      </section>
    );
  }
}

export default RoomList;
