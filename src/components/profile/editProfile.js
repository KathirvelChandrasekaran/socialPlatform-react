import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { EditUserDetails } from "../../redux/actions/userActions";
import { withStyles } from "@material-ui/core";
const styles = {};

export class EditProfile extends Component {
  state = {
    bio: "",
    website: "",
    location: "",
    open: false,
  };

  componentDidMount() {
    const { credentials } = this.props;
    this.setState({
      bio: credentials.bio ? credentials.bio : "",
      website: credentials.website ? credentials.website : "",
      location: credentials.location ? credentials.location : "",
    });
  }
  render() {
    return (
      <Fragment>
          
      </Fragment>
    );
  }
}

EditProfile.propTypes = {
  classes: PropTypes.object.isRequired,
  EditUserDetails: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  credentials: state.user.credentials,
});

export default connect(mapStateToProps, { EditUserDetails })(
  withStyles(styles)
)(EditProfile);
