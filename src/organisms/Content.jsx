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
    overflow: "auto"
  },
});

// Templates
const Home = lazy(() => import("../templates/Home"));
const Settings = lazy(() => import("../templates/Settings"));
const Profile = lazy(() => import("../templates/Profile"));
const CutiTahunan = lazy(() => import("../templates/CutiTahunan"));
const CutiBesar = lazy(() => import("../templates/CutiBesar"));
const CutiSakit = lazy(() => import("../templates/CutiSakit"));
const CutiBersalin = lazy(() => import("../templates/CutiBersalin"));
const CutiAlasanPenting = lazy(() => import("../templates/CutiAlasanPenting"));
const CLTN = lazy(() => import("../templates/CLTN"));
const DataPNS = lazy(() => import("../templates/DataPNS"));
const DetailPNS = lazy(() => import("../templates/DetailPNS"));
const EditDataPNS = lazy(() => import("../templates/EditDataPNS"));
const RiwayatCutiTahunan = lazy(() => import("../templates/RiwayatCutiTahunan"));
const DetailCuti = lazy(() => import("../templates/DetailCuti"));

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
                  path="/beranda/cuti_tahunan/:id/detail"
                  render={(routeProps) =>
                    role === "admin" ? (
                      <DetailCuti {...routeProps} />
                    ) : (
                        <div>Halaman tidak ditemukan...</div>
                      )
                  }
                />

                <Route
                  path="/beranda/cuti_tahunan/:id"
                  render={(routeProps) =>
                    role === "admin" ? (
                      <RiwayatCutiTahunan {...routeProps} />
                    ) : (
                        <div>Halaman tidak ditemukan...</div>
                      )
                  }
                />

                <Route
                  path="/beranda/data_pns/:id/edit"
                  render={(routeProps) =>
                    role === "admin" ? (
                      <EditDataPNS {...routeProps} />
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