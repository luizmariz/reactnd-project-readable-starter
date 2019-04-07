import React, { Component } from 'react';
import { FaCaretDown } from 'react-icons/fa';
import { connect } from 'react-redux';

class Filters extends Component {
	state = {
		valueS1: 'trending',
		valueS2: 'all'
	}

	handleSortChange = e => {
		const value = e.target.value;

		this.setState(() => ({
			valueS1: value,
		}));

		console.log(value);

		// TODO: sort func
	}

	handleCategoryChange = e => {
		const value = e.target.value;

		this.setState(() => ({
			valueS2: value,
		}));

		console.log(value);

		// TODO: filter func
	}

	render() {
		const { categories } = this.props;
		const { valueS1, valueS2 } = this.state;

		return (
			<div className="filter">
				<div className="select s1">
					<select value={valueS1} onChange={this.handleSortChange}>
						<option value="trending">Trending</option>
						<option value="date">Date</option>
					</select>
					<FaCaretDown className="dropdown-icon"/>
				</div>
				<div className="select s2">
					<select value={valueS2} onChange={this.handleCategoryChange}>
						<option value="trending">All</option>
						{ categories.map(category => (
							<option key={category} value={category}>{category}</option>
						))}
					</select>
					<FaCaretDown className="dropdown-icon"/>
				</div>
			</div>
		);
	}
}

function mapStateToProps({ categories }) {
	return {
		categories: Object
			.keys(categories).map(key => categories[key].name),
	}
}

export default connect(mapStateToProps)(Filters);