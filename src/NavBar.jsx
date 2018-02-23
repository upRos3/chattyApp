import React, { Component } from "react";

class NavBar extends Component {
  render() {
    const { loggedInUsers } = this.props;

    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">
          ChattyApp
        </a>
        <span className="logged-in-users">
          {loggedInUsers} users logged in!
        </span>
      </nav>
    );
  }
}
export default NavBar;
