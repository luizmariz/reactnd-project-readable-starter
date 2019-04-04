import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import  Login  from './Login';
import  Feed  from './Feed';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    const { authedUser } = this.props;
    return (
      <Router>
        <div>
          <Route exact path="/" render={() => authedUser === null
            ? (<Redirect to="/login"/>)
            : (<Feed/>)
          }/>
          <Route path='/login' component={Login} />
        </div>
      </Router>
    );
  }
}

function mapStateToProps ({ authedUser }) {
  return { authedUser };
}

export default connect(mapStateToProps)(App);
