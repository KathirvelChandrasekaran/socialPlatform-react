import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

import AddIcon from "@material-ui/icons/Add";
import HomeIcon from "@material-ui/icons/Home";
import Notifications from "@material-ui/icons/Notifications";

import { connect } from "react-redux";

import MyButton from "../utils/button";
export class NavBar extends Component {
  render() {
    const { authenticated } = this.props;
    return (
      <div>
        <AppBar>
          <Toolbar className="nav-container">
            {authenticated ? (
              <Fragment>
                <MyButton tip="Create a Post">
                  <AddIcon color="primary"></AddIcon>
                </MyButton>
                <Link to="/">
                  <MyButton tip="Home">
                    <HomeIcon color="primary"></HomeIcon>
                  </MyButton>
                </Link>
                <MyButton tip="Notifications">
                  <Notifications color="primary"></Notifications>
                </MyButton>
              </Fragment>
            ) : (
              <Fragment>
                <Button color="inherit" component={Link} to="/login">
                  Login
                </Button>
                <Button color="inherit" component={Link} to="/">
                  Home
                </Button>
                <Button color="inherit" component={Link} to="/signup">
                  Signup
                </Button>
              </Fragment>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

NavBar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps)(NavBar);
