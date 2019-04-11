import React from 'react'
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const Nav = (props) => {
  const category = props.history.location.pathname.replace('/','');

  return (
    <nav className='nav'>
      <ul>
        <li>
          <NavLink to='/' exact activeClassName='active'>
            Feed
          </NavLink>
        </li>
        <li>
          <NavLink to='/new-post' exact activeClassName='active'>
            New post
          </NavLink>
        </li>
        <li>
          <NavLink to={`/${category}`} exact activeClassName='active'>
            {props.categories.includes(category)
              ? category.replace(category[0], category[0].toUpperCase()) 
              : ''
            }
          </NavLink>
        </li>
      </ul>
    </nav>
  )
};

function mapStateToProps({ categories }) {
	return {
    categories: Object.keys(categories)
      .map(key => categories[key].name),
  };
}

export default withRouter(connect(mapStateToProps)(Nav));