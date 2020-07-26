import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import Scream from "../components/screams/screams";
import StaticProfile from "../components/profile/staticProfile";

import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

import { connect } from "react-redux";
import { getUSerData } from "../redux/actions/dataActions";

class User extends Component {
  state = {
    profile: null,
  };

  componentDidMount() {
    const handle = this.props.match.params.handle;
    console.log(handle);
    this.props.getUSerData(handle);
    axios
      .get(`/user/${handle}`)
      .then((res) => {
        this.setState({
          profile: res.data.user,
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    const { screams, loading } = this.props.data;

    const screamsMarkup = loading ? (
      <CircularProgress color="secondary" />
    ) : screams === null ? (
      <p>Screams not found</p>
    ) : (
      screams.map((scream) => (
        <Scream key={scream.screamId} scream={scream}></Scream>
      ))
    );

    return (
      <Grid container spacing={10}>
        <Grid item sm={8} xs={12}>
          {screamsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          {this.state.profile === null ? (
            <CircularProgress color="secondary" />
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
      </Grid>
    );
  }
}

User.propTypes = {
  getUSerData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getUSerData })(User);
