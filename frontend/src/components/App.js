import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import  Login  from './Login';
import Nav from './Nav';
import Dashboard from './Dashboard';
import HandlePost from './HandlePost';
import PostPage from './PostPage';
import HandleComment from './HandleComment';

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
          <Route exact path="/new-post" component={HandlePost} />
          <Route exact path={`/:category(${categories.join('|')})?`} component={Dashboard} />
          <Route exact strict path="/:category/:post_id" component={PostPage} />
          <Route exact path="/:category/:parent_id/new-comment" component={HandleComment} />
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
