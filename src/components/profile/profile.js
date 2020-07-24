import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import dayjs from "dayjs";

import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import MuiLink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import EditIcon from "@material-ui/icons/Edit";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import InfoIcon from "@material-ui/icons/Info";

import { connect } from "react-redux";
import { uploadImage, logoutUser } from "../../redux/actions/userActions";

import EditProfile from "./editProfile";
import MyButton from "../../utils/button";

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
  buttons: {
    textAlign: "center",
    "& a": {
      margin: "20px 10px",
    },
  },
};

const Profile = ({ classes, user, uploadImage, logoutUser }) => {
  const handleLogout = () => {
    logoutUser();
  };

  const handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  const imageUpload = (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    console.log(image.name);
    formData.append("image", image, image.name);
    uploadImage(formData);
  };

  let profileMarkup = !user.loading ? (
    user.authenticated ? (
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className="image-wrapper">
            <img
              src={user.credentials.imageUrl}
              alt="profile"
              className="profile-image"
            />
            <input
              type="file"
              id="imageInput"
              onChange={imageUpload}
              hidden="hidden"
            />
            <MyButton
              tip="Edit Profile Picture"
              onClick={handleEditPicture}
              btnClassName="button"
              className={classes.button}
            >
              <EditIcon color="primary"></EditIcon>
            </MyButton>
          </div>
          <hr />
          <div className="profile-details">
            <MuiLink
              component={Link}
              to={`/users/${user.credentials.handle}`}
              color="primary"
              variant="h5"
            >
              @{user.credentials.handle}
            </MuiLink>
            <hr />
            {user.credentials.bio && (
              <Fragment>
                <InfoIcon color="primary" /> &nbsp;
                <span variant="body2">{user.credentials.bio}</span>
              </Fragment>
            )}
            <hr />
            {user.credentials.location && (
              <Fragment>
                <LocationOn color="primary" /> &nbsp;
                <span>{user.credentials.location}</span>
                <hr />
              </Fragment>
            )}
            {user.credentials.website && (
              <Fragment>
                <LinkIcon color="primary" />
                <a
                  href={user.credentials.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  &nbsp;
                  {user.credentials.website}
                </a>
                <hr />
              </Fragment>
            )}
            <CalendarToday color="primary" /> &nbsp;
            <span>
              Joined {dayjs(user.credentials.createdAt).format("MMM YYYY DD")}
            </span>
          </div>
        </div>
        <MyButton
          tip="Logout"
          onClick={handleLogout}
          className={classes.button}
        >
          <ExitToAppIcon color="primary"></ExitToAppIcon>
        </MyButton>
        <EditProfile></EditProfile>
      </Paper>
    ) : (
      <Paper className={classes.paper}>
        <Typography variant="body2" align="center">
          No profile found, please login again
        </Typography>
        <div className={classes.buttons}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/login"
          >
            Login
          </Button>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/signup"
          >
            Signup
          </Button>
        </div>
      </Paper>
    )
  ) : (
    <CircularProgress color="secondary" />
  );

  return profileMarkup;
};

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  uploadImage,
  logoutUser,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Profile));
