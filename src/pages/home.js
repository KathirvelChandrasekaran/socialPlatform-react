import React, { Component } from "react";
import PropTypes from "prop-types";

import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

import Screams from "../components/screams/screams";
import Profile from "../components/profile/profile";

import { connect } from "react-redux";
import { getScreams } from "../redux/actions/dataActions";

export class Home extends Component {
  componentDidMount() {
    this.props.getScreams();
  }
  render() {
    const { screams, loading } = this.props.data;
    let recentScreamsMarkup = !loading ? (
      screams.map((scream) => (
        <Screams key={scream.screamId} scream={scream}></Screams>
      ))
    ) : (
      <CircularProgress color="secondary" />
    );
    return (
      <div>
        <Grid container spacing={10}>
          <Grid item sm={8} xs={12}>
            {recentScreamsMarkup}
          </Grid>
          <Grid item sm={4} xs={12}>
            <Profile />
          </Grid>
        </Grid>
      </div>
    );
  }
}

Home.propTypes = {
  getScreams: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getScreams })(Home);
