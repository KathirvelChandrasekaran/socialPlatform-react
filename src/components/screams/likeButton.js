import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import MyButton from "../../utils/button";

import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";

import { connect } from "react-redux";
import { likeScream, unlikeScream } from "../../redux/actions/dataActions";

const LikeButton = ({ user, screamId, likeScream, unlikeScream }) => {
  const userLikeScream = () => {
    likeScream(screamId);
  };

  const userUnLikeScream = () => {
    unlikeScream(screamId);
  };
  const likedScream = () => {
    if (user.likes && user.likes.find((like) => like.screamId === screamId)) {
      return true;
    } else {
      return false;
    }
  };
  const likeButton = !user.authenticated ? (
    <Link to="/login">
      <MyButton tip="Like">
        <FavoriteBorderIcon color="primary" />
      </MyButton>
    </Link>
  ) : likedScream() ? (
    <MyButton tip="Undo like" onClick={userUnLikeScream}>
      <FavoriteIcon color="primary" />
    </MyButton>
  ) : (
    <MyButton tip="Like" onClick={userLikeScream}>
      <FavoriteBorderIcon color="primary" />
    </MyButton>
  );
  return likeButton;
};

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired,
  likeScream: PropTypes.func.isRequired,
  unlikeScream: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  likeScream,
  unlikeScream,
};

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
