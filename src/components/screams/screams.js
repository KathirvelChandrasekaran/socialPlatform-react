import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import ChatIcon from "@material-ui/icons/Chat";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { connect } from "react-redux";
import { likeScream, unlikeScream } from "../../redux/actions/dataActions";

import MyButton from "../../utils/button";
import DeleteScream from "./deleteScream";
import ScreamDialog from "./screamDialog";

const styles = {
  card: {
    display: "flex",
    marginBottom: 20,
  },
  image: {
    minWidth: 200,
  },
  content: {
    padding: 25,
    objectFir: "cover",
  },
};

const Screams = ({
  classes,
  likeScream,
  unlikeScream,
  user,
  scream,
  userHandle,
}) => {
  const userLikeScream = () => {
    likeScream(scream.screamId);
  };

  const userUnLikeScream = () => {
    unlikeScream(scream.screamId);
  };
  const likedScream = () => {
    if (
      user.likes &&
      user.likes.find((like) => like.screamId === scream.screamId)
    ) {
      return true;
    } else {
      return false;
    }
  };
  dayjs.extend(relativeTime);
  const likeButton = !user.authenticated ? (
    <MyButton tip="Like">
      <Link to="/login">
        <FavoriteBorderIcon color="primary" />
      </Link>
    </MyButton>
  ) : likedScream() ? (
    <MyButton tip="Undo like" onClick={userUnLikeScream}>
      <FavoriteIcon color="primary" />
    </MyButton>
  ) : (
    <MyButton tip="Like" onClick={userLikeScream}>
      <FavoriteBorderIcon color="primary" />
    </MyButton>
  );

  return (
    <Card key={scream.screamId} className={classes.card}>
      <CardMedia
        image={scream.userImage}
        title="User Image"
        className={classes.image}
      ></CardMedia>
      <CardContent className={classes.details}>
        <Typography
          variant="h4"
          component={Link}
          to={`/users/${scream.userHandle}`}
          color="primary"
        >
          {scream.userHandle}
        </Typography>
        {user.authenticated && scream.userHandle === user.credentials.handle ? (
          <DeleteScream screamId={scream.screamId} />
        ) : null}
        <Typography variant="body2" color="secondary">
          {dayjs(scream.createdAt).fromNow()}
        </Typography>
        <Typography variant="body1">{scream.body}</Typography>
        {likeButton}
        <span>{scream.likeCount} Likes</span>
        <MyButton tip="comments">
          <ChatIcon color="primary" />
        </MyButton>
        <span>{scream.commentCount} comments</span>
        <ScreamDialog
          screamId={scream.screamId}
          userHandle={scream.userHandle}
        ></ScreamDialog>
      </CardContent>
    </Card>
  );
};

Screams.propTypes = {
  likeScream: PropTypes.func.isRequired,
  unlikeScream: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  likeScream,
  unlikeScream,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Screams));
