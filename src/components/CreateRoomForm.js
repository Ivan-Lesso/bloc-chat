import React, { Component } from 'react';

class CreateRoomForm extends Component {
  render() {
    const showHideClassName = this.props.show ? "modal display-block" : "modal display-none";
    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          <h3>Create new room</h3>
          <p>Enter a room name</p>
          <input type="text" value={this.props.newRoomName} onChange={this.props.handleRoomType} />
          <br /><br />
          <button onClick={this.props.handleClose}>Cancel</button>
          <button onClick={this.props.handleRoomCreate}>Create Room</button>
        </section>
      </div>
    );
  };
};

export default CreateRoomForm;
