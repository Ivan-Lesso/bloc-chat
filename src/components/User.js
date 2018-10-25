import React, { Component } from 'react';

class User extends Component {
  render() {
    return (
      <section className="user-button">
        Signed in as { this.props.currentUser } <br />
        { (this.props.currentUser === 'Guest') ? <button onClick={this.props.handleSigninClick}>Sign-in</button> : <button onClick={this.props.handleSignoutClick}>Sign-out</button> }
      </section>
    );
  };
};

export default User;
