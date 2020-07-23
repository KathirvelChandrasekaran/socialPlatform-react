import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/navbar";

import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div className="container">
            <Navbar />
            <Switch>
              <Route exact path={"/"} component={Home}></Route>
              <Route exact path={"/login"} component={Login}></Route>
              <Route exact path={"/signup"} component={Signup}></Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
