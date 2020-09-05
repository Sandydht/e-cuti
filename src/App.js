import React, { lazy, Suspense } from 'react';
import "./App.css";

// Material UI
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
import LinearProgress from "@material-ui/core/LinearProgress";

// Icons
import CloseIcon from '@material-ui/icons/Close';

// Notistack
import { SnackbarProvider } from "notistack";

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
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Dashboard from "./pages/Dashboard";

const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

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

const App = ({ checked, authenticated }) => {
  const notistackRef = React.createRef();
  const onClickDismiss = key => () => {
    notistackRef.current.closeSnackbar(key);
  };

  return (
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
          {
            checked &&
            <Suspense fallback={<LinearProgress />}>
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
                  render={(props) =>
                    authenticated ? (
                      <Dashboard {...props} />
                    ) : (
                        <Redirect
                          to={{
                            pathname: "/login",
                            state: { from: props.location }
                          }}
                        />
                      )}
                />
              </Switch>
            </Suspense>
          }
        </Router>
      </SnackbarProvider>
    </MuiThemeProvider>
  );
};

const mapStateToProps = ({ session }) => ({
  checked: session.checked,
  authenticated: session.authenticated
});

export default connect(mapStateToProps, null)(App); 