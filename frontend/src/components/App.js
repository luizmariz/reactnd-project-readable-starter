import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import  Login  from './Login';
import Nav from './Nav';
import Dashboard from './Dashboard';

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
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/:category" component={Dashboard} />
        </div>
      </Router>
    );
  }
}

function mapStateToProps ({ authedUser }) {
  return { authedUser };
}

export default connect(mapStateToProps)(App);
