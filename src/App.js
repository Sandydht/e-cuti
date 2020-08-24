import React, { Component } from 'react';

// React router dom
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

// Pages
import Dashboard from "./pages/Dashboard";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
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