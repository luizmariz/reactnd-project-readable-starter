import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';
import { Redirect } from 'react-router-dom';

class Login extends Component {
  state = {
    text: '',
    userAutentication: false
  };

  handleChange = e => {
    const value = e.target.value;

    this.setState(() => ({
      text: value,
    }));

  };

  handleSubmit = e => {
    e.preventDefault();

    const { text } = this.state;
    const { dispatch } = this.props;

    dispatch(setAuthedUser(text));

    this.setState(() => ({
      userAutentication: true,
    }));

  }

  render() {
    const { text, userAutentication } = this.state;

    if (userAutentication) {
      return (
        <Redirect from='/login' to='/'/> // Don't want to push the login on history, so i'm using it
      );
    }

    return (
      <div className='flex-container'>
        <form
          className="new-user"
          onSubmit={this.handleSubmit}
        >
          <h3>Login</h3>
          <input
            className="user-input"
            placeholder="Type any name to begin"
            value={text}
            onChange={this.handleChange}
          />
          <button
            className="btn"
            disabled={text === ''}
          >
            Join
          </button>
        </form>
      </div>
    );
  }
}

export default connect()(Login);