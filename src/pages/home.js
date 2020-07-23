import React, { Component } from "react";
import axios from "axios";

import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

import Screams from "../components/screams";
import Profile from "../components/profile";

export class Home extends Component {
  state = {
    screams: null,
  };
  componentDidMount() {
    axios
      .get("/screams")
      .then((res) => {
        this.setState({
          screams: res.data,
        });
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    let recentScreamsMarkup = this.state.screams ? (
      this.state.screams.map((scream) => (
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

export default Home;
