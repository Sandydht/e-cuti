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

// Atoms
import Copyright from "../atoms/Copyright";

// Styles
const styles = (theme) => ({
  toolbar: theme.mixins.toolbar,
  root: {
    flexGrow: 1,
    display: "flex",
    flexDirection: 'column',
    minHeight: '100vh',
    overflow: "auto"
  },
  main: {
    padding: theme.spacing(3)
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
  }
});

// Templates 
const DataPNS = lazy(() => import("../templates/DataPNS"));
const TambahDataPNS = lazy(() => import("../templates/TambahDataPNS"));
const DetailPNS = lazy(() => import("../templates/DetailPNS"));
const EditDataPNS = lazy(() => import("../templates/EditDataPNS"));
const Home = lazy(() => import("../templates/Home"));
const Settings = lazy(() => import("../templates/Settings"));
const Profile = lazy(() => import("../templates/Profile"));
const RiwayatCutiTahunan = lazy(() => import("../templates/RiwayatCutiTahunan"));
const RiwayatCutiBesar = lazy(() => import("../templates/RiwayatCutiBesar"));
const RiwayatCutiSakit = lazy(() => import("../templates/RiwayatCutiSakit"));
const RiwayatCutiBersalin = lazy(() => import("../templates/RiwayatCutiBersalin"));
const RiwayatCutiAlasanPenting = lazy(() => import("../templates/RiwayatCutiAlasanPenting"));
const RiwayatCLTN = lazy(() => import("../templates/RiwayatCLTN"));
const PengajuanCutiTahunan = lazy(() => import("../templates/PengajuanCutiTahunan"));
const PengajuanCutiBesar = lazy(() => import("../templates/PengajuanCutiBesar"));
const PengajuanCutiSakit = lazy(() => import("../templates/PengajuanCutiSakit"));
const PengajuanCutiBersalin = lazy(() => import("../templates/PengajuanCutiBersalin"));
const PengajuanCutiAlasanPenting = lazy(() => import("../templates/PengajuanCutiAlasanPenting"));
const PengajuanCLTN = lazy(() => import("../templates/PengajuanCLTN"));
const DataCuti = lazy(() => import("../templates/DataCuti"));
const DetailCuti = lazy(() => import("../templates/DetailCuti"));

class Content extends Component {
  render() {
    const { classes, role } = this.props;

    return (
      <main className={classes.root}>
        <div className={classes.main}>
          <div className={classes.toolbar} />
          <Suspense fallback={<LinearProgress />}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <BreadCrumbs />
              </Grid>
              <Grid item xs={12} md={12}>
                <Switch>
                  {/* Admin only */}
                  <Route
                    path="/data_cuti"
                    render={(routeProps) =>
                      role === "admin" ? (
                        <DataCuti {...routeProps} />
                      ) : (
                          <div>Halaman tidak ditemukan...</div>
                        )}
                  />
                  <Route
                    path="/data_pns/:id/edit_data_pns"
                    render={(routeProps) =>
                      role === "admin" ? (
                        <EditDataPNS {...routeProps} />
                      ) : (
                          <div>Halaman tidak ditemukan...</div>
                        )}
                  />
                  <Route
                    path="/data_pns/:id"
                    render={(routeProps) =>
                      role === "admin" ? (
                        <DetailPNS {...routeProps} />
                      ) : (
                          <div>Halaman tidak ditemukan...</div>
                        )}
                  />
                  <Route
                    path="/tambah_data_pns"
                    render={(routeProps) =>
                      role === "admin" ? (
                        <TambahDataPNS {...routeProps} />
                      ) : (
                          <div>Halaman tidak ditemukan...</div>
                        )}
                  />
                  <Route
                    path="/data_pns"
                    render={(routeProps) =>
                      role === "admin" ? (
                        <DataPNS {...routeProps} />
                      ) : (
                          <div>Halaman tidak ditemukan...</div>
                        )}
                  />
                  {/* End admin only */}

                  {/* Halaman pengajuan cuti */}
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
                    path="/pengajuan_cuti_tahunan"
                    render={(routeProps) =>
                      role === "user" ? (
                        <PengajuanCutiTahunan {...routeProps} />
                      ) : (
                          <div>Halaman tidak ditemukan...</div>
                        )}
                  />
                  {/* End halaman pengajuan cuti */}

                  {/* Halaman riwayat cuti */}

                  <Route
                    path="/riwayat_cltn"
                    render={(routeProps) =>
                      role === "user" ? (
                        <RiwayatCLTN {...routeProps} />
                      ) : (
                          <div>Halaman tidak ditemukan...</div>
                        )}
                  />
                  <Route
                    path="/riwayat_cuti_alasan_penting"
                    render={(routeProps) =>
                      role === "user" ? (
                        <RiwayatCutiAlasanPenting {...routeProps} />
                      ) : (
                          <div>Halaman tidak ditemukan...</div>
                        )}
                  />
                  <Route
                    path="/riwayat_cuti_bersalin"
                    render={(routeProps) =>
                      role === "user" ? (
                        <RiwayatCutiBersalin {...routeProps} />
                      ) : (
                          <div>Halaman tidak ditemukan...</div>
                        )}
                  />
                  <Route
                    path="/riwayat_cuti_sakit"
                    render={(routeProps) =>
                      role === "user" ? (
                        <RiwayatCutiSakit {...routeProps} />
                      ) : (
                          <div>Halaman tidak ditemukan...</div>
                        )}
                  />
                  <Route
                    path="/riwayat_cuti_besar"
                    render={(routeProps) =>
                      role === "user" ? (
                        <RiwayatCutiBesar {...routeProps} />
                      ) : (
                          <div>Halaman tidak ditemukan...</div>
                        )}
                  />
                  <Route
                    path="/riwayat_cuti_tahunan/:id"
                    render={(routeProps) =>
                      role === "user" ? (
                        <DetailCuti {...routeProps} />
                      ) : (
                          <div>Halaman tidak ditemukan...</div>
                        )}
                  />
                  <Route
                    path="/riwayat_cuti_tahunan"
                    render={(routeProps) =>
                      role === "user" ? (
                        <RiwayatCutiTahunan {...routeProps} />
                      ) : (
                          <div>Halaman tidak ditemukan...</div>
                        )}
                  />
                  {/* End halaman riwayat cuti */}

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
        </div>
        <footer className={classes.footer}>
          <Copyright />
        </footer>
      </main>
    );
  }
}

const mapStateToProps = ({ session }) => ({
  role: session.user.role
});

export default connect(mapStateToProps, null)(withStyles(styles)(Content)); 