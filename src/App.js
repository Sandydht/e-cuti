import React, { Component } from 'react';
import "./App.css";

// Material UI
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
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

// Redux
import { Provider } from "react-redux";
import store from "./redux";

const theme = createMuiTheme({
  overrides: {
    MuiTableCell: {
      head: {
        backgroundColor: 'black',
        color: "white"
      }
    }
  }
});

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
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
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App; 