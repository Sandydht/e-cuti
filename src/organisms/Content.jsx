import React, { Component, lazy, Suspense } from 'react';

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import LinearProgress from "@material-ui/core/LinearProgress";

import Grid from "@material-ui/core/Grid";

// React router dom
import {
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

// Redux
import { connect } from "react-redux";

// Styles
const styles = (theme) => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
});

// Pages
const Home = lazy(() => import("../pages/Home"));
const Settings = lazy(() => import("../pages/Settings"));
const Profile = lazy(() => import("../pages/Profile"));
const CutiTahunan = lazy(() => import("../pages/CutiTahunan"));
const CutiBesar = lazy(() => import("../pages/CutiBesar"));
const CutiSakit = lazy(() => import("../pages/CutiSakit"));
const CutiBersalin = lazy(() => import("../pages/CutiBersalin"));
const CutiAlasanPenting = lazy(() => import("../pages/CutiAlasanPenting"));
const CLTN = lazy(() => import("../pages/CLTN"));
const DataPNS = lazy(() => import("../pages/DataPNS"));
const DetailPNS = lazy(() => import("../pages/DetailPNS"));
const EditPNS = lazy(() => import("../pages/EditPNS"));

// Molecules
const BreadCrumbs = lazy(() => import("../molecules/BreadCrumbs"));

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
                  path="/beranda/data_pns/:id/edit"
                  render={(routeProps) =>
                    role === "admin" ? (
                      <EditPNS {...routeProps} />
                    ) : (
                        <div>Halaman tidak ditemukan...</div>
                      )
                  }
                />

                <Route
                  path="/beranda/data_pns/:id"
                  render={(routeProps) =>
                    role === "admin" ? (
                      <DetailPNS {...routeProps} />
                    ) : (
                        <div>Halaman tidak ditemukan...</div>
                      )
                  }
                />

                <Route
                  path="/beranda/data_pns"
                  render={(routeProps) =>
                    role === "admin" ? (
                      <DataPNS {...routeProps} />
                    ) : (
                        <div>Halaman tidak ditemukan...</div>
                      )
                  }
                />

                <Route
                  path="/beranda/cltn"
                  component={CLTN}
                />

                <Route
                  path="/beranda/cuti_alasan_penting"
                  component={CutiAlasanPenting}
                />

                <Route
                  path="/beranda/cuti_bersalin"
                  component={CutiBersalin}
                />

                <Route
                  path="/beranda/cuti_sakit"
                  component={CutiSakit}
                />

                <Route
                  path="/beranda/cuti_besar"
                  component={CutiBesar}
                />

                <Route
                  path="/beranda/cuti_tahunan"
                  component={CutiTahunan}
                />

                <Route
                  path="/profil"
                  component={Profile}
                />

                <Route
                  path="/pengaturan"
                  component={Settings}
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
        </Suspense>
      </main>
    );
  }
}

const mapStateToProps = ({ session }) => ({
  role: session.user.role
});

export default connect(mapStateToProps, null)(withStyles(styles)(Content)); 