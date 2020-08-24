import React, { Component, Suspense, lazy } from 'react';

// React router dom
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

// Pages
const Dashboard = lazy(() => import("./pages/Dashboard"));

class App extends Component {
  render() {
    return (
      <Router>
        <Suspense fallback={<div>Sedang memuat...</div>}>
          <Switch>
            <Route
              path="/"
              component={Dashboard}
            />
          </Switch>
        </Suspense>
      </Router>
    );
  }
}

export default App; 