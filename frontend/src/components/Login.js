import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';

class Login extends Component {
  state = {
    text: '',
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
    const { dispatch, history } = this.props;

    dispatch(setAuthedUser(text));
    history.push('/');

  }

  render() {
    const { text } = this.state;

    return (
      <div className='flex-container'>
        <form
          className="new-user"
          onSubmit={this.handleSubmit}
        >
          <h3>Login</h3>
          <input
            className="user-input"
            placeholder="Select your username"
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