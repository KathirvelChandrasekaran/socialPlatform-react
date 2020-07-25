import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import dayjs from "dayjs";

import { withStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";

import UnfoldMoreIcon from "@material-ui/icons/UnfoldMore";
import CloseIcon from "@material-ui/icons/Close";
import ChatIcon from "@material-ui/icons/Chat";

import MyButton from "../../utils/button";
import LikeButton from "./likeButton";

import { connect } from "react-redux";
import { getScream } from "../../redux/actions/dataActions";

const styles = {
  hrool: {
    border: "none",
    margin: 4,
  },
  profileImage: {
    maxWidth: 150,
    height: 150,
    borderRadius: "50%",
    objectFit: "cover",
  },
  dialogContent: {
    padding: 30,
  },
  closeButton: {
    position: "absolute",
    left: "90%",
  },
  spinDiv: {
    textAlign: "center",
  },
};

const ScreamDialog = ({
  classes,
  getScream,
  screamId,
  userHandle,
  scream,
  UI,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    getScream(screamId);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dialogMarkup = UI.loading ? (
    <div className={classes.spinDiv}>
      <CircularProgress size={100}></CircularProgress>
    </div>
  ) : (
    <Fragment>
      <Grid container spacing={10}>
        <Grid item sm={5}>
          <img
            src={scream.userImage}
            alt="Profile"
            className={classes.profileImage}
          ></img>
        </Grid>
        <Grid item sm={5}>
          <Typography
            component={Link}
            color="primary"
            variant="h5"
            to={`/users/${userHandle}`}
          >
            @{scream.userHandle}
          </Typography>
          <hr className={classes.hrool}></hr>
          <Typography color="secondary" variant="body2">
            {dayjs(scream.createdAt).format("h:mm a, MMMM DD YYYY")}
          </Typography>
          <hr className={classes.hrool}></hr>
          <Typography variant="body1">{scream.body}</Typography>
          <LikeButton screamId={screamId}></LikeButton>
          <span>{scream.likeCount} Likes</span>
          <MyButton tip="comments">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{scream.commentCount} comments</span>
        </Grid>
      </Grid>
    </Fragment>
  );

  return (
    <Fragment>
      <MyButton
        onClick={handleOpen}
        tip="Expand Post"
        tipClassName={classes.expandButton}
      >
        <UnfoldMoreIcon color="primary"></UnfoldMoreIcon>
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <MyButton
          tip="Close"
          onClick={handleClose}
          tipClassName={classes.closeButton}
        >
          <CloseIcon></CloseIcon>
        </MyButton>
        <DialogContent className={classes.dialogContent}>
          {dialogMarkup}
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

ScreamDialog.propTypes = {
  getScream: PropTypes.func.isRequired,
  screamId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  scream: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  scream: state.data.scream,
  UI: state.UI,
});

const mapActionsToProps = {
  getScream,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(ScreamDialog));
