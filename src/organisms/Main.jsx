import React, { lazy, Suspense } from 'react';

// Material UI
import makeStyles from '@material-ui/core/styles/makeStyles';
import LinearProgress from '@material-ui/core/LinearProgress';

// React router dom
import {
  Switch,
  Route, Redirect
} from 'react-router-dom';

// Redux
import { connect } from 'react-redux';

// Styles
const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  }
}));

// Pages
const AdminHome = lazy(() => import('../templates/admin/AdminHome'));
const UserHome = lazy(() => import('../templates/user/UserHome'));
const Profile = lazy(() => import('../pages/Profile'));
const Setting = lazy(() => import('../pages/Setting'));

const Main = ({ role }) => {
  const classes = useStyles();

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Suspense fallback={<LinearProgress />}>
        <Switch>
          <Route
            exact
            path='/beranda'
            render={(routeProps) =>
              role === 'admin' ? (
                <AdminHome {...routeProps} />
              ) : (
                  <UserHome  {...routeProps} />
                )}
          />

          <Route
            exact
            path='/profil'
            component={Profile}
          />

          <Route
            exact
            path='/pengaturan'
            component={Setting}
          />

          <Redirect
            from='/'
            to='/beranda'
          />
        </Switch>
      </Suspense>
    </main>
  );
};

const mapStateToProps = ({ session }) => ({
  role: session.user.role
});

export default connect(mapStateToProps)(Main);
