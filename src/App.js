import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/navbar";

import jwtDecode from "jwt-decode";

import { MuiThemeProvider } from "@material-ui/core/styles";
import CreateTheme from "@material-ui/core/styles/createMuiTheme";
import CustomTheme from "./utils/theme";
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";

import AuthRoute from "./utils/authRoute";

const theme = CreateTheme(CustomTheme);

let authenticated;
const token = localStorage.FireToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = "/login";
    authenticated = false;
    localStorage.clear();
  } else {
    authenticated = true;
  }
}
class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <Router>
            <div className="container">
              <Navbar />
              <Switch>
                <Route exact path={"/"} component={Home}></Route>
                <AuthRoute
                  exact
                  path={"/login"}
                  component={Login}
                  authenticated={authenticated}
                ></AuthRoute>
                <AuthRoute
                  exact
                  path={"/signup"}
                  authenticated={authenticated}
                  component={Signup}
                ></AuthRoute>
              </Switch>
            </div>
          </Router>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
