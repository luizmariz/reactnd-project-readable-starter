import React, { Component } from 'react';
import { FaCaretDown } from 'react-icons/fa';
import { string, func, array } from 'prop-types';

class Select extends Component {

  handleChange = e => {
    const value = e.target.value;

    this.props.onChange(value);
  }

  render() {
    const { value, items } = this.props;
    return (
      <div className="select">
        <select value={value} onChange={this.handleChange}>
          { items.map(item => (
            <option key={item} value={item}>{item.toUpperCase()}</option>
          ))}
        </select>
        <FaCaretDown className="dropdown-icon"/>
      </div>
    );
  }
};

Select.protoType = {
  value: string.isRequired,
  items: array.isRequired,
  onChange: func.isRequired,
};

export default Select;