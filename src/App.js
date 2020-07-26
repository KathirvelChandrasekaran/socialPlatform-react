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
import User from "./pages/user";

import AuthRoute from "./utils/authRoute";

//Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser, GetUserData } from "./redux/actions/userActions";
import Axios from "axios";

const theme = CreateTheme(CustomTheme);

const token = localStorage.FireToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
    localStorage.clear();
  } else {
    store.dispatch({
      type: SET_AUTHENTICATED,
    });
    Axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(GetUserData());
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <div className="App">
            <Router>
              <div className="container">
                <Navbar />
                <Switch>
                  <Route exact path={"/"} component={Home}></Route>
                  <Route exact path={"/users/:handle"} component={User}></Route>
                  <AuthRoute
                    exact
                    path={"/login"}
                    component={Login}
                  ></AuthRoute>
                  <AuthRoute
                    exact
                    path={"/signup"}
                    component={Signup}
                  ></AuthRoute>
                </Switch>
              </div>
            </Router>
          </div>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
