import React from 'react'
import Filters from './Filters';
import Dashboard from './Dashboard';

const Feed = () => {
  return (
    <div>
      <div className="feed center">
        <Filters />
        <Dashboard />
      </div>
    </div>
  );
};

export default Feed;