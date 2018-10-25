import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
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
  render() {
    return (
      <section className="">
        <div>
          <p>Active Room: {this.props.currentRoom}</p>
        </div>
        <table className="table">
        <colgroup>
          <col />
        </colgroup>
        <tbody>
        {
            this.state.messages.map((item, index) =>
              <tr key={index}>
                <td>{item.content}</td>
              </tr>
            )
        }
        </tbody>
        </table>
      </section>
    );
  }
}

export default MessageList;
