import React, { Component } from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

// Pages
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

class App extends Component {
  render() {
    return (
      <Router>
        <CssBaseline />
        <Switch>
          <Route
            path="/register"
            component={Register}
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
    );
  }
}

export default App; 