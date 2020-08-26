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
    // overflow: "auto"
  },
});

// Templates 
const DetailPNS = lazy(() => import("../templates/DetailPNS"));
const EditDataPNS = lazy(() => import("../templates/EditDataPNS"));
const Home = lazy(() => import("../templates/Home"));
const Settings = lazy(() => import("../templates/Settings"));
const Profile = lazy(() => import("../templates/Profile"));
const DataCutiTahunan = lazy(() => import("../templates/DataCutiTahunan"));
const DataCutiBesar = lazy(() => import("../templates/DataCutiBesar"));
const DataCutiSakit = lazy(() => import("../templates/DataCutiSakit"));
const DataCutiBersalin = lazy(() => import("../templates/DataCutiBersalin"));
const DataCutiAlasanPenting = lazy(() => import("../templates/DataCutiAlasanPenting"));
const DataCLTN = lazy(() => import("../templates/DataCLTN"));
const PengajuanCutiTahunan = lazy(() => import("../templates/PengajuanCutiTahunan"));
const PengajuanCutiBesar = lazy(() => import("../templates/PengajuanCutiBesar"));
const PengajuanCutiSakit = lazy(() => import("../templates/PengajuanCutiSakit"));
const PengajuanCutiBersalin = lazy(() => import("../templates/PengajuanCutiBersalin"));
const PengajuanCutiAlasanPenting = lazy(() => import("../templates/PengajuanCutiAlasanPenting"));
const PengajuanCLTN = lazy(() => import("../templates/PengajuanCLTN"));
const DetailCuti = lazy(() => import("../templates/DetailCuti"));
const RiwayatCuti = lazy(() => import("../templates/RiwayatCuti"));

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
                  path="/data_cuti_tahunan/:id/:id"
                  render={(routeProps) =>
                    role === "admin" ? (
                      <DetailCuti {...routeProps} />
                    ) : (
                        <div>Halaman tidak ditemukan...</div>
                      )}
                />
                <Route
                  path="/data_cltn/:id"
                  render={(routeProps) =>
                    role === "admin" ? (
                      <RiwayatCuti {...routeProps} />
                    ) : (
                        <DetailCuti {...routeProps} />
                      )}
                />
                <Route
                  path="/data_cuti_alasan_penting/:id"
                  render={(routeProps) =>
                    role === "admin" ? (
                      <RiwayatCuti {...routeProps} />
                    ) : (
                        <DetailCuti {...routeProps} />
                      )}
                />
                <Route
                  path="/data_cuti_bersalin/:id"
                  render={(routeProps) =>
                    role === "admin" ? (
                      <RiwayatCuti {...routeProps} />
                    ) : (
                        <DetailCuti {...routeProps} />
                      )}
                />
                <Route
                  path="/data_cuti_sakit/:id"
                  render={(routeProps) =>
                    role === "admin" ? (
                      <RiwayatCuti {...routeProps} />
                    ) : (
                        <DetailCuti {...routeProps} />
                      )}
                />
                <Route
                  path="/data_cuti_besar/:id"
                  render={(routeProps) =>
                    role === "admin" ? (
                      <RiwayatCuti {...routeProps} />
                    ) : (
                        <DetailCuti {...routeProps} />
                      )}
                />
                <Route
                  path="/data_cuti_tahunan/:id"
                  render={(routeProps) =>
                    role === "admin" ? (
                      <RiwayatCuti {...routeProps} />
                    ) : (
                        <DetailCuti {...routeProps} />
                      )}
                />
                <Route
                  path="/beranda/:id/edit"
                  render={(routeProps) =>
                    role === "admin" ? (
                      <EditDataPNS {...routeProps} />
                    ) : (
                        <div>Halaman tidak ditemukan...</div>
                      )}
                />
                <Route
                  path="/beranda/:id"
                  render={(routeProps) =>
                    role === "admin" ? (
                      <DetailPNS {...routeProps} />
                    ) : (
                        <div>Halaman tidak ditemukan...</div>
                      )}
                />
                <Route
                  path="/pengajuan_cltn"
                  render={(routeProps) =>
                    role === "user" ? (
                      <PengajuanCLTN {...routeProps} />
                    ) : (
                        <div>Halaman tidak ditemukan...</div>
                      )}
                />
                <Route
                  path="/pengajuan_cuti_alasan_penting"
                  render={(routeProps) =>
                    role === "user" ? (
                      <PengajuanCutiAlasanPenting {...routeProps} />
                    ) : (
                        <div>Halaman tidak ditemukan...</div>
                      )}
                />
                <Route
                  path="/pengajuan_cuti_bersalin"
                  render={(routeProps) =>
                    role === "user" ? (
                      <PengajuanCutiBersalin {...routeProps} />
                    ) : (
                        <div>Halaman tidak ditemukan...</div>
                      )}
                />
                <Route
                  path="/pengajuan_cuti_sakit"
                  render={(routeProps) =>
                    role === "user" ? (
                      <PengajuanCutiSakit {...routeProps} />
                    ) : (
                        <div>Halaman tidak ditemukan...</div>
                      )}
                />
                <Route
                  path="/pengajuan_cuti_besar"
                  render={(routeProps) =>
                    role === "user" ? (
                      <PengajuanCutiBesar {...routeProps} />
                    ) : (
                        <div>Halaman tidak ditemukan...</div>
                      )}
                />
                <Route
                  path="/pengajuan_cuti_tahunan"
                  render={(routeProps) =>
                    role === "user" ? (
                      <PengajuanCutiTahunan {...routeProps} />
                    ) : (
                        <div>Halaman tidak ditemukan...</div>
                      )}
                />
                <Route
                  path="/data_cltn"
                  component={DataCLTN}
                />
                <Route
                  path="/data_cuti_alasan_penting"
                  component={DataCutiAlasanPenting}
                />
                <Route
                  path="/data_cuti_bersalin"
                  component={DataCutiBersalin}
                />
                <Route
                  path="/data_cuti_sakit"
                  component={DataCutiSakit}
                />
                <Route
                  path="/data_cuti_besar"
                  component={DataCutiBesar}
                />
                <Route
                  path="/data_cuti_tahunan"
                  component={DataCutiTahunan}
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