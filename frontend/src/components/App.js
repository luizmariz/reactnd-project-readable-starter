import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import  Login  from './Login';
import Nav from './Nav';
import Dashboard from './Dashboard';
import HandlePost from './HandlePost';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    const { authedUser, categories } = this.props;

    if (!authedUser) {
      return <Login />; // Fake front login, just to set your authedUser
    }

    return (
      <Router>
        <div className="container">
          <Nav />
          <Route exact path="/new" component={HandlePost} />
          <Route exact path={`/:category(${categories.join('|')})?`} component={Dashboard} />
        </div>
      </Router>
    );
  }
}

function mapStateToProps ({ authedUser, categories }) {
  return {
    authedUser,
    categories: Object.keys(categories)
      .map(key => categories[key].name),
  };
}

export default connect(mapStateToProps)(App);
