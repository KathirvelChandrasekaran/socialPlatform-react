import React, { Component } from "react";
import { Link } from "react-router-dom";

import Logo from "../images/logo.png";

import TextField from "@material-ui/core/TextField";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

import PropTypes from "prop-types";

//Redux
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";

const styles = {
  form: {
    textAlign: "center",
  },
  img: {
    height: 75,
    width: 75,
    margin: "10px auto 10px auto",
  },
  pageTitle: {
    margin: "5px auto 5px auto",
  },
  button: {
    marginTop: 30,
  },
  textField: {
    margin: "5px auto 5px auto",
  },
  customError: {
    color: "red",
    fontSize: "0.8rem",
  },
  spinner: {
    margin: 20,
  },
};
export class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(userData, this.props.history);
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  render() {
    const {
      classes,
      UI: { loading },
    } = this.props;
    const { errors } = this.state;
    return (
      <Grid container className={classes.form}>
        <Grid item sm></Grid>
        <Grid item sm>
          <img src={Logo} alt="Logo" className={classes.img}></img>
          <Typography variant="h4" className={classes.pageTitle}>
            Login
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              className={classes.textField}
              value={this.state.email}
              onChange={this.handleChange}
              helperText={errors.email}
              error={errors.email ? true : false}
              fullWidth
            ></TextField>
            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              className={classes.textField}
              value={this.state.password}
              onChange={this.handleChange}
              helperText={errors.password}
              error={errors.password ? true : false}
              fullWidth
            ></TextField>
            {errors.general ? (
              <Typography variant="body2" className={classes.customError}>
                {errors.general}
              </Typography>
            ) : (
              ""
            )}
            <Button
              type="submit"
              variant="contained"
              className={classes.button}
              color="secondary"
              disabled={loading}
            >
              Login
            </Button>
            <br></br>

            {loading ? (
              <CircularProgress className={classes.spinner} color="secondary" />
            ) : (
              ""
            )}
            <br></br>
            <span>
              Already have an account then Login <Link to="/login">Here</Link>
            </span>
          </form>
        </Grid>
        <Grid item sm></Grid>
      </Grid>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapAtcionsToProps = {
  loginUser,
};
export default connect(
  mapStateToProps,
  mapAtcionsToProps
)(withStyles(styles)(Login));
