import React, { Fragment, Component } from "react";
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

import MyButton from "../../utils/button";

import { connect } from "react-redux";
import { getScream } from "../../redux/actions/dataActions";

const styles = {
  hrool: {
    border: "none",
    margin: 4,
  },
};

class ScreamDialog extends Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
    this.props.getScream(this.props.screamId);
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const {
      classes,
      scream: {
        body,
        createdAt,
        userImage,
        userHandle,
        screamId,
        likeCount,
        commentCount,
      },
      UI: { loading },
    } = this.props;

    const dialogMarkup = loading ? (
      <CircularProgress size={200}></CircularProgress>
    ) : (
      <Fragment>
        <Grid container spacing={10}>
          <Grid item sm={5}>
            <img
              src={userImage}
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
              @{userHandle}
            </Typography>
            <hr classes={classes.hrool}></hr>
            <Typography color="secondary" variant="body2">
              {dayjs(createdAt).format(
                "h:mm a, MMMM DD YYYY"
              )}
            </Typography>
            <hr classes={classes.hrool}></hr>
            <Typography variant="body1">{body}</Typography>
          </Grid>
        </Grid>
      </Fragment>
    );

    return (
      <Fragment>
        <MyButton
          onClick={this.handleOpen}
          tip="Expand Post"
          tipClassName={classes.expandButton}
        >
          <UnfoldMoreIcon color="primary"></UnfoldMoreIcon>
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <MyButton
            tip="Close"
            onClick={this.handleClose}
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
  }
}

ScreamDialog.propTypes = {
  getScream: PropTypes.func.isRequired,
  screamId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  scream: state.scream,
  UI: state.UI,
  credentials: state.user.credentials,
});

export default connect(mapStateToProps, { getScream })(
  withStyles(styles)(ScreamDialog)
);
