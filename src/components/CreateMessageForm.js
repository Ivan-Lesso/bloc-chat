import React, { Component } from 'react';

class CreateMessageForm extends Component {
  render() {
    return (
      <div className="roomChatText">
        <section className="chat-input">
          <input type="text" value={this.props.newChatText} onChange={this.props.handleChatType} onFocus={this.props.handleChatClick} />
          <button onClick={this.props.handleChatCreate}>Send</button>
        </section>
      </div>
    );
  };
};

export default CreateMessageForm;
