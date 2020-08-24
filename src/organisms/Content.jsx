import React, { Component, lazy, Suspense } from 'react';

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";

// React router dom
import { Switch, Route, Redirect } from "react-router-dom";

// Redux
import { connect } from "react-redux";

// Molecules
import BreadCrumbs from "../molecules/BreadCrumbs";

// Styles
const styles = (theme) => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    overflow: "auto"
  },
});

// Templates 
const DataPNS = lazy(() => import("../templates/DataPNS"));
const Home = lazy(() => import("../templates/Home"));
const Settings = lazy(() => import("../templates/Settings"));
const Profile = lazy(() => import("../templates/Profile"));
const CutiTahunan = lazy(() => import("../templates/CutiTahunan"));
const CutiBesar = lazy(() => import("../templates/CutiBesar"));
const CutiSakit = lazy(() => import("../templates/CutiSakit"));
const CutiBersalin = lazy(() => import("../templates/CutiBersalin"));
const CutiAlasanPenting = lazy(() => import("../templates/CutiAlasanPenting"));
const CLTN = lazy(() => import("../templates/CLTN"));

class Content extends Component {
  render() {
    const { classes, role } = this.props;

    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Suspense fallback={<LinearProgress />}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <BreadCrumbs />
            </Grid>
            <Grid item xs={12} md={12}>
              <Switch>
                <Route
                  path="/profil"
                  component={Profile}
                />
                <Route
                  path="/pengaturan"
                  component={Settings}
                />
                <Route
                  path="/data_cuti/cltn"
                  component={CLTN}
                />
                <Route
                  path="/data_cuti/cuti_alasan_penting"
                  component={CutiAlasanPenting}
                />
                <Route
                  path="/data_cuti/cuti_bersalin"
                  component={CutiBersalin}
                />
                <Route
                  path="/data_cuti/cuti_sakit"
                  component={CutiSakit}
                />
                <Route
                  path="/data_cuti/cuti_besar"
                  component={CutiBesar}
                />

                <Route
                  path="/data_cuti/cuti_tahunan"
                  component={CutiTahunan}
                />

                {
                  role === "admin" ? (
                    <Switch>
                      <Route
                        path="/data_pns"
                        component={DataPNS}
                      />

                      <Redirect
                        from="/"
                        to="/data_pns"
                      />
                    </Switch>
                  ) : (
                      <Switch>
                        <Route
                          path="/beranda"
                          component={Home}
                        />

                        <Redirect
                          from="/"
                          to="/beranda"
                        />
                      </Switch>
                    )
                }
              </Switch>
            </Grid>
          </Grid>
        </Suspense>
      </main>
    );
  }
}

const mapStateToProps = ({ session }) => ({
  role: session.user.role
});

export default connect(mapStateToProps, null)(withStyles(styles)(Content)); 