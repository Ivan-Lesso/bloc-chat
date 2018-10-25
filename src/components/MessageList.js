import React, { Component } from 'react';
import CreateMessageForm from './CreateMessageForm';

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      newChatText: 'Type your message here...'
    };
    this.messagesRef = this.props.firebase.database().ref('messages');
  }
  componentDidMount()
  {
    this.updateMessageList(this.props.currentRoom);
  }
  componentWillReceiveProps(nextProps) {
    //debugger;
    this.updateMessageList(nextProps.currentRoom);
  }
  updateMessageList(roomId)
  {
    let newMessages = [];
    this.setState({messages: newMessages});
    this.messagesRef.orderByChild("roomId").equalTo(roomId).on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      newMessages.push(message);
      this.setState({messages: newMessages});
    });
  }
  handleChatType = (e) => {
    e.preventDefault();
    this.setState({ newChatText: e.target.value });
  };

  handleChatCreate = () => {
    this.messagesRef.push({
      content: this.state.newChatText,
      roomId: this.props.currentRoom,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      userName: this.props.currentUser
    });
    this.setState({newChatText: 'Type your message here...'});
  };

  handleChatClick = (e) => {
    e.preventDefault();
    this.setState({ newChatText: '' });
  }

  formatTime = (t) => {
    let formattedTime = new Date(parseInt(t)).toLocaleDateString();
    return formattedTime;
  }

  render() {
    return (
      <section className="messageList">
        <div>
          <h2>Active Room: {this.props.currentRoom}</h2>
        </div>
        <table className="table table-striped text-left messageTable">
        <tbody>
        {
            this.state.messages.map((item, index) =>
              <tr key={index}>
                <td>{this.formatTime(item.sentAt)} - {item.userName} - {item.content}</td>
              </tr>
            )
        }
        </tbody>
        </table>
        <div className="fixed-bottom chatForm">
          <CreateMessageForm newChatText={this.state.newChatText} handleChatClick={ (e) => { this.handleChatClick(e) } } handleChatType={ (e) => { this.handleChatType(e) } } handleChatCreate={ () => { this.handleChatCreate() } } />
        </div>
      </section>
    );
  }
}

export default MessageList;
