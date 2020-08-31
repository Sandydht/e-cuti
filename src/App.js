import React, { Component } from 'react';
import "./App.css";

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
    );
  }
}

export default App; 