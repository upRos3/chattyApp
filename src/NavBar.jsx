import React, { Component } from "react";

class NavBar extends Component {
  render() {
    const loggedInUsers = this.props.loggedInUsers;
    let grammar = "users";

    if (this.props.loggedInUsers === 1) {
      console.log("poop");
      grammar = "user";
    }

    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">
          ChattyApp
        </a>
        <span className="logged-in-users">
          {loggedInUsers} {grammar} logged in
        </span>
      </nav>
    );
  }
}
export default NavBar;
