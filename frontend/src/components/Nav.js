import React from 'react'
import { NavLink } from 'react-router-dom'

const Nav = () => {
  return (
    <nav className='nav'>
      <ul>
        <li>
          <NavLink to='/' exact activeClassName='active'>
            Feed
          </NavLink>
        </li>
        <li>
          <NavLink to='/new' exact activeClassName='active'>
            New post
          </NavLink>
        </li>
      </ul>
    </nav>
  )
};

export default Nav;