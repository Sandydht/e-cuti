import React from 'react';

// Material UI
import makeStyles from "@material-ui/core/styles/makeStyles";

// React router dom
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";

// Pages
import Home from "../pages/Home";
import Info from "../pages/Info";
import Setting from "../pages/Setting";

// Styles
const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  main: {
    padding: theme.spacing(3),
  }
}));

const Main = () => {
  const classes = useStyles();
  return (
    <main className={classes.main} >
      <div className={classes.toolbar} />
      <Switch>
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
    </main>
  );
};
export default Main;