import React from "react";
import { Link, withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Logo from "../services/greenHauseLog.png";

import Canvas from "./Canvas";

// import "../App.css";

class Navbar extends React.Component {
  render() {
    const loggedIn = !!this.props.currentUser.id;

    return (
      <div className="nav">
        <ul>
          <li>
            <Link to="/" className="Navitem">
              Profile
            </Link>
          </li>
          <li>
            <Link to="/plants" className="Navitem">
              Plants
            </Link>
          </li>
          <li>
            <Link to="/design" className="Navitem">
              Design
            </Link>
          </li>

          <img className="logo" src={Logo} />

          {/* <li> */}

          {loggedIn ? (
            <div className="Navthing">{`Welcome ${this.props.currentUser.username}`}</div>
          ) : null}
          {loggedIn ? (
            <a
              onClick={() => {
                this.props.history.push("/login");
                this.props.handleLogout();
              }}
              className="Navthing"
              id="navthing"
            >
              <div className="navbutton">Log Out</div>
            </a>
          ) : (
            <div>
              <Link to="Signup" id="navthing" className="Navthing">
                <div className="navthing">Sign Up</div>
              </Link>
              <Link to="/login" id="navthing" className="Navthing">
                <div className="navbutton">Log In</div>
              </Link>
            </div>
          )}

          {/* </li> */}
        </ul>
      </div>
    );
  }
}

export default withRouter(Navbar);
