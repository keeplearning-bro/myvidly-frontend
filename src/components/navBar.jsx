import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Customers from './customers'
import Rentals from './rentals';

const NarBar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <Link className="navbar-brand" to="/">MyVidly</Link>
      {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon">button</span>
        </button> */}
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <NavLink className="nav-link" to="/movies">Movies</NavLink>
          <NavLink className="nav-link" to="/customers">Customers</NavLink>
          <NavLink className="nav-link" to="/rentals">Rentals</NavLink>
          {!user && (
            <React.Fragment>
              <NavLink className="nav-link" to="/login">Login</NavLink>
              <NavLink className="nav-link" to="/register">Register</NavLink>
            </React.Fragment>
          )}
          <NavLink className="nav-item nav-link" to="/logout"> Logout </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default NarBar;