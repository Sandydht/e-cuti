import React, { Component } from 'react';

// React router dom
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

// Redux
import { connect } from "react-redux";

// Pages
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

class App extends Component {
  render() {
    const { checked, authenticated } = this.props;

    return (
      <Router>
        {
          checked &&
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
              render={({ location }) =>
                authenticated ? (
                  <Dashboard />
                ) : (
                    <Redirect
                      to={{
                        pathname: "/login",
                        state: { from: location }
                      }}
                    />
                  )}
            />
          </Switch>
        }
      </Router>
    );
  }
}

const mapStateToProps = ({ session }) => ({
  checked: session.checked,
  authenticated: session.authenticated
});

export default connect(mapStateToProps, null)(App); 