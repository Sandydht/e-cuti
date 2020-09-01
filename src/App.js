import React, { Component, Fragment } from 'react';
import "./App.css";

// Material UI
import CssBaseline from "@material-ui/core/CssBaseline";

// React router dom
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

// Pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

class App extends Component {
  render() {
    return (
      <Fragment>
        <CssBaseline />
        <Router>
          <Switch>
            <Route
              path="/register"
              component={Signup}
            />

            <Route
              path="/login"
              component={Login}
            />

            <Route
              path="/"
              component={Dashboard}
            />
          </Switch>
        </Router>
      </Fragment>
    );
  }
}

export default App; 