import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import dayjs from "dayjs";

import { withStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const styles = {
  visiblehrool: {
    width: "100%",
    borderBottom: "1px solid rgba(0,0,0,0.1)",
    marginBottom: "20px",
  },
  image: {
    maxWidth: "100%",
    height: 100,
    objectFit: "cover",
    borderRadius: "50%",
  },
  commentData: {
    marginLeft: "20%",
  },
  grid: {
    margin: 20,
  },
};

const Comment = ({ comments, classes }) => {
  return (
    <Grid container className={classes.grid}>
      {comments.map((comment, index) => {
        const { body, createdAt, userImage, userHanlde } = comment;
        return (
          <Fragment key={createdAt}>
            <Grid item sm={12}>
              <Grid container>
                <Grid item sm={2}>
                  <img
                    src={userImage}
                    alt="User Picture"
                    className={classes.image}
                  ></img>
                </Grid>
                <Grid item sm={9}>
                  <div className={classes.commentData}>
                    <Typography
                      variant="h5"
                      component={Link}
                      to={`/user/${userHanlde}`}
                      color="primary"
                    >
                      {userHanlde}
                    </Typography>
                    <Typography variant="body2" color="secondary">
                      {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
                    </Typography>

                    {index !== comments.length - 1 && (
                      <hr className={classes.visiblehrool}></hr>
                    )}
                    <Typography variant="body1">{body}</Typography>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Fragment>
        );
      })}
    </Grid>
  );
};

Comment.propTypes = {
  comments: PropTypes.array.isRequired,
};

export default withStyles(styles)(Comment);
