import React from 'react';

// Material UI
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

// Icons
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

// React router dom
import {
  Switch,
  Route,
  Redirect,
  NavLink
} from "react-router-dom";

// Pages
import Home from "../pages/Home";
import Info from "../pages/Info";
import Setting from "../pages/Setting";
import Profile from "../pages/Profile";

// Styles
const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  main: {
    padding: theme.spacing(3),
  }
}));

// Breadcrumbs map
const breadcrumbNameMap = {
  '/beranda': 'Beranda',
  '/pengaturan': 'Pengaturan',
  '/profil': 'Profil',
  '/informasi': 'Informasi'
};

const Main = () => {
  const classes = useStyles();
  return (
    <main className={classes.main} >
      <div className={classes.toolbar} />
      <Grid container spacing={2}>
        <Grid item md={12} xs={12}>
          <Route>
            {({ location }) => {
              const pathnames = location.pathname.split("/").filter(x => x);

              return (
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                  <Link color="inherit" component={NavLink} to="/">Dashboard</Link>
                  {pathnames.map((value, index) => {
                    const last = index === pathnames.length - 1;
                    const to = `/${pathnames.slice(0, index + 1).join('/')}`;

                    return last ? (
                      <Typography color="textPrimary" key={to}>
                        {breadcrumbNameMap[to]}
                      </Typography>
                    ) : (
                        <Link color="inherit" component={NavLink} to={to} key={to}>
                          {breadcrumbNameMap[to]}
                        </Link>
                      );
                  })}
                </Breadcrumbs>
              );
            }}
          </Route>
        </Grid>
        <Grid item md={12} xs={12}>
          <Switch>
            <Route
              path="/profil"
              component={Profile}
            />
            <Route
              path="/informasi"
              component={Info}
            />
            <Route
              path="/pengaturan"
              component={Setting}
            />
            <Route
              path="/beranda"
              component={Home}
            />
            <Redirect
              from="/"
              to="/beranda"
            />
          </Switch>
        </Grid>
      </Grid>
    </main>
  );
};
export default Main;