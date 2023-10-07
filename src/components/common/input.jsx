import React, { Component } from 'react';

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        className="form-control"
        id={name}
        name={name}
        {...rest}
      // value={value}
      // onChange={onChange}
      // type={type}
      // ref={this.username}
      // autoFocus
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
}

export default Input;