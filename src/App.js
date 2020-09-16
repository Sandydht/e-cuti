import React, { lazy, Suspense } from 'react';
import JwtDecode from 'jwt-decode';

// React router dom
import {
  BrowserRouter as Router,
  Switch,
  Route, Redirect
} from 'react-router-dom';

// Material UI
import LinearProgress from '@material-ui/core/LinearProgress';
import CssBaseline from '@material-ui/core/CssBaseline';

// Redux
import { connect } from 'react-redux';
import { logout } from './config/redux/actions';
import store from './config/redux';

// Pages
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

const token = localStorage.getItem("redux-react-session/USER-SESSION");
if (token) {
  const decodedToken = JwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = "/login";
    store.dispatch(logout());
  }
}

const App = ({ checked, authenticated }) => {
  return (
    <Router>
      <Suspense fallback={<LinearProgress />}>
        <CssBaseline />
        {
          checked &&
          <Switch>
            <Route
              path='/login'
              component={Login}
            />
            <Route
              path='/register'
              component={Register}
            />
            <Route
              path='/lupa_kata_sandi'
              component={ForgotPassword}
            />
            <Route
              path='/'
              render={(routeProps) =>
                authenticated ? (
                  <Dashboard {...routeProps} />
                ) : (
                    <Redirect
                      to={{
                        pathname: '/login',
                        state: { from: routeProps.location }
                      }}
                    />
                  )}
            />
          </Switch>
        }
      </Suspense>
    </Router>
  );
};

const mapStateToProps = ({ session }) => ({
  checked: session.checked,
  authenticated: session.authenticated,
  uid: session.uid
});

export default connect(mapStateToProps)(App);