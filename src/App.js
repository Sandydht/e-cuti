import React, { Component } from 'react';
import "./App.css";

// Material UI
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";

// Icons
import CloseIcon from '@material-ui/icons/Close';

// Notistack
import { SnackbarProvider } from "notistack";

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
    // add action to all snackbars
    const notistackRef = React.createRef();
    const onClickDismiss = key => () => {
      notistackRef.current.closeSnackbar(key);
    };
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <SnackbarProvider
            maxSnack={3}
            ref={notistackRef}
            action={(key) => (
              <IconButton
                color="inherit"
                onClick={onClickDismiss(key)}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            )}
          >
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
          </SnackbarProvider>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App; 