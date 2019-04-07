import React, { Component } from 'react';
import { connect } from 'react-redux';
import Filters from './Filters';
import Feed from './Feed';

class Dashboard extends Component {
  state = {
    sortBy: "score",
  }

  handleSortChange = e => {
		const value = e.target.value;

		this.setState(() => ({
			sortBy: value,
		}));
	}

	handleCategoryChange = e => {
    const value = e.target.value;
    this.props.history.push(`/${value === "all" ? "" : value}`);
  }

  handlePosts = category => {
    const { sortBy } = this.state;
    const { posts } = this.props;

    const handledPosts = posts
      .filter(p => category === "all"
          ? true
          : p.category === category)
      .sort((a, b) => {
        return ( sortBy === "score"
          ? b.voteScore - a.voteScore
          : b.timestamp - a.timestamp)});

    return handledPosts;
  }

  render() {
    const { categories, match } = this.props;
    const { sortBy } = this.state;

    const path = match.params.category ? match.params.category : "all";

    return (
      <div className="dashboard center">
        <Filters
          categories={categories}
          category={path}
          sortBy={sortBy}
          handleCategoryChange={this.handleCategoryChange}
          handleSortChange={this.handleSortChange}
        />
        <Feed posts={this.handlePosts(path)}/>
      </div>
    );
  }
}

function mapStateToProps({ posts, categories }) {
	return {
    posts: Object.keys(posts)
      .map(key => posts[key]),

    categories: Object.keys(categories)
      .map(key => categories[key].name),
  };
}

export default connect(mapStateToProps)(Dashboard);