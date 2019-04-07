import React from 'react';
import { FaCaretDown } from 'react-icons/fa';

const Filters = props => {
	const { categories, handleCategoryChange, handleSortChange, category, sortBy } = props;

	return (
		<div className="filter">
			<div className="select s1">
				<select value={sortBy} onChange={handleSortChange}>
					<option value="score">Score</option>
					<option value="date">Date</option>
				</select>
				<FaCaretDown className="dropdown-icon"/>
			</div>
			<div className="select s2">
				<select value={category} onChange={handleCategoryChange}>
					<option value="all">All</option>
					{ categories.map(category => (
						<option key={category} value={category}>{category}</option>
					))}
				</select>
				<FaCaretDown className="dropdown-icon"/>
			</div>
		</div>
	);

}

export default Filters;