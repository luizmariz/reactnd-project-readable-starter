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
    const { login } = this.props;

    login(text);
  }

  render() {
    const { text } = this.state;

    return (
      <div className='container center screen-size'>
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

function mapDispatchToProps (dispatch) {
  return {
    login: text => {
      dispatch(setAuthedUser(text))
    }
  }
}

function mapStateToProps (state) {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);