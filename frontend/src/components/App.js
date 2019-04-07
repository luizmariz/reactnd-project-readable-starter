import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import  Login  from './Login';
import  Feed  from './Feed';
import Nav from './Nav';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    const { authedUser } = this.props;

    if (!authedUser) {
      return <Login />; // Fake front login, just to set your authedUser
    }

    return (
      <Router>
        <div className="container">
          <Nav />
          <Route exact path="/" component={Feed} />
        </div>
      </Router>
    );
  }
}

function mapStateToProps ({ authedUser }) {
  return { authedUser };
}

export default connect(mapStateToProps)(App);
