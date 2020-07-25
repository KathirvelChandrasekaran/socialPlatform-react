import React, { useState } from "react";
// import { useRef, useEffect } from "react";

import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Textfield from "@material-ui/core/Textfield";

import { connect } from "react-redux";
import { submitComment } from "../../redux/actions/dataActions";

const styles = {
  textField: {
    margin: "5px auto 5px auto",
  },
  button: {
    marginTop: 20,
  },
  visiblehrool: {
    width: "100%",
    borderBottom: "1px solid rgba(0,0,0,0.1)",
    marginBottom: "20px",
  },
};

const CommentForm = ({ classes, submitComment, UI, user, screamId }) => {
  const [body, setBody] = useState("");
  //   const [errors, setErrors] = useState({});

  //   const prevProp = useRef(UI.errors);
  //   useEffect(() => {
  //     if (prevProp) {
  //       setErrors(UI.errors);
  //     }
  //   }, [UI.errors]);

  const handleChange = (e) => {
    const data = e.target.value;
    setBody(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitComment(screamId, { body });
    setBody("");
  };

  const commentFormMarkup = user.authenticated ? (
    <Grid item={12} style={{ textAlign: "center" }}>
      <form onSubmit={handleSubmit}>
        <Textfield
          name="body"
          type="text"
          label="Comment on the post"
          //   error={errors.comment ? true : false}
          //   helperText={errors.comment}
          value={body}
          onChange={handleChange}
          fullWidth
          className={classes.textField}
        ></Textfield>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Comment
        </Button>
      </form>
    </Grid>
  ) : null;

  return commentFormMarkup;
};

CommentForm.propTypes = {
  submitComment: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  user: state.user,
});

export default connect(mapStateToProps, { submitComment })(
  withStyles(styles)(CommentForm)
);
