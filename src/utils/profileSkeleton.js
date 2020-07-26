import React from "react";

import NoImg from "../images/blank-profile-picture.png";
import PropTypes from "prop-types";

import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import withStyles from "@material-ui/core/styles/withStyles";

import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import InfoIcon from "@material-ui/icons/Info";

const styles = {
  paper: {
    padding: 20,
  },
  profile: {
    "& .image-wrapper": {
      textAlign: "center",
      position: "relative",
      "& button": {
        position: "absolute",
        top: "80%",
        left: "70%",
      },
    },
    "& .profile-image": {
      width: 150,
      height: 150,
      objectFit: "cover",
      maxWidth: "100%",
      borderRadius: "50%",
    },
    "& .profile-details": {
      textAlign: "center",
      "& span, svg": {
        verticalAlign: "middle",
      },
      //   "& a": {
      //     color: theme.palette.primary.main,
      //   },
    },
    "& hr": {
      border: "none",
      margin: "0 0 10px 0",
    },
    "& svg.button": {
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
  handle: {
    width: 60,
    height: 20,
    background: "#3f51b5",
    margin: "0 auto 7px auto",
  },
  fullLine: {
    height: 15,
    width: "50%",
    backgroundColor: "rgba(0,0,0,0.4)",
    marginBottom: 10,
  },
  halfLine: {
    height: 15,
    backgroundColor: "rgba(0,0,0,0.4)",
    width: "30%",
    marginBottom: 10,
  },
  paper: {
    padding: 20
  },
};

const ProfileSkeleton = ({ classes }) => {
  return (
    <div>
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className="image-wrapper">
            <img src={NoImg} alt="Profile" className="profile-image"></img>
            <hr />
            <div className="profile-details">
              <div className={classes.handle}></div>
              <hr />
              <div className={classes.fullLine} />
              <div className={classes.halfLine} />
              <hr />
              <LocationOn color="primary"></LocationOn>
              <hr />
              <LinkIcon color="primary"></LinkIcon>
              <hr />
              <CalendarToday color="primary"></CalendarToday>
            </div>
          </div>
        </div>
      </Paper>
    </div>
  );
};

ProfileSkeleton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileSkeleton);
