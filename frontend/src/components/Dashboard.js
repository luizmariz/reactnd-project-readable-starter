import React, { Component } from 'react';
import { connect } from 'react-redux';
import Feed from './Feed';
import Select from './Select';

class Dashboard extends Component {
  state = {
    sortBy: "score",
  }

  handleSortChange = value => {
		this.setState(() => ({
			sortBy: value,
		}));
	}

	handleCategoryChange = value => {
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
    const { categories, category } = this.props;
    const { sortBy } = this.state;

    return (
      <div className="dashboard center">
        <div className="filter">
          <Select
            value={sortBy}
            onChange={this.handleSortChange}
            items={[ "score", "date" ]}
          />
          <Select
            value={category}
            onChange={this.handleCategoryChange}
            items={[ "all", ...categories ]}
          />
        </div>
        <Feed posts={this.handlePosts(category)}/>
      </div>
    );
  }
}

function mapStateToProps({ posts, categories }, props) {
  const { category } = props.match.params;

	return {
    category: category ? category : "all",
    posts: Object.keys(posts)
      .map(key => posts[key]),

    categories: Object.keys(categories)
      .map(key => categories[key].name),
  };
}

export default connect(mapStateToProps)(Dashboard);