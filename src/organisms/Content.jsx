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

// Global templates
const Home = lazy(() => import("../templates/Home"));
const Settings = lazy(() => import("../templates/Settings"));
const Profile = lazy(() => import("../templates/Profile"));
// End global templates


// Admin templates
const DataPNS = lazy(() => import("../templates/admin/DataPNS"));
const DataCutiTahunan = lazy(() => import("../templates/admin/DataCutiTahunan"));
const DataCutiBesar = lazy(() => import("../templates/admin/DataCutiBesar"));
const DataCutiSakit = lazy(() => import("../templates/admin/DataCutiSakit"));
const DataCutiAlasanPenting = lazy(() => import("../templates/admin/DataCutiAlasanPenting"));
const DataCutiBersalin = lazy(() => import("../templates/admin/DataCutiBersalin"));
const DataCLTN = lazy(() => import("../templates/admin/DataCLTN"));
const RiwayatCutiTahunanPNS = lazy(() => import("../templates/admin/RiwayatCutiTahunanPNS"));
const RiwayatCutiBesarPNS = lazy(() => import("../templates/admin/RiwayatCutiBesarPNS"));
const RiwayatCutiSakitPNS = lazy(() => import("../templates/admin/RiwayatCutiSakitPNS"));
const RiwayatCutiBersalinPNS = lazy(() => import("../templates/admin/RiwayatCutiBersalinPNS"));
const RiwayatCutiAlasanPentingPNS = lazy(() => import("../templates/admin/RiwayatCutiAlasanPentingPNS"));
const RiwayatCLTNPNS = lazy(() => import("../templates/admin/RiwayatCLTNPNS"));
const TambahDataPNS = lazy(() => import("../templates/admin/TambahDataPNS"));
const DetailPNS = lazy(() => import("../templates/admin/DetailPNS"));
const EditDataPNS = lazy(() => import("../templates/admin/EditDataPNS"));
// End admin templates

// User templates
const RiwayatCutiTahunan = lazy(() => import("../templates/user/RiwayatCutiTahunan"));
const RiwayatCutiBesar = lazy(() => import("../templates/user/RiwayatCutiBesar"));
const RiwayatCutiSakit = lazy(() => import("../templates/user/RiwayatCutiSakit"));
const RiwayatCutiBersalin = lazy(() => import("../templates/user/RiwayatCutiBersalin"));
const RiwayatCutiAlasanPenting = lazy(() => import("../templates/user/RiwayatCutiAlasanPenting"));
const RiwayatCLTN = lazy(() => import("../templates/user/RiwayatCLTN"));
const PengajuanCutiTahunan = lazy(() => import("../templates/user/PengajuanCutiTahunan"));
const PengajuanCutiBesar = lazy(() => import("../templates/user/PengajuanCutiBesar"));
const PengajuanCutiSakit = lazy(() => import("../templates/user/PengajuanCutiSakit"));
const PengajuanCutiBersalin = lazy(() => import("../templates/user/PengajuanCutiBersalin"));
const PengajuanCutiAlasanPenting = lazy(() => import("../templates/user/PengajuanCutiAlasanPenting"));
const PengajuanCLTN = lazy(() => import("../templates/user/PengajuanCLTN"));
// Ens user templates

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
                  {/* Admin */}
                  <Route
                    path="/data_cuti_tahunan/:id"
                    render={(routeProps) =>
                      role === "admin" ? (
                        <RiwayatCutiTahunanPNS {...routeProps} />
                      ) : (
                          <div>Halaman tidak ditemukan...</div>
                        )}
                  />
                  <Route
                    path="/data_cuti_besar/:id"
                    render={(routeProps) =>
                      role === "admin" ? (
                        <RiwayatCutiBesarPNS {...routeProps} />
                      ) : (
                          <div>Halaman tidak ditemukan...</div>
                        )}
                  />
                  <Route
                    path="/data_cuti_sakit/:id"
                    render={(routeProps) =>
                      role === "admin" ? (
                        <RiwayatCutiSakitPNS {...routeProps} />
                      ) : (
                          <div>Halaman tidak ditemukan...</div>
                        )}
                  />
                  <Route
                    path="/data_cuti_bersalin/:id"
                    render={(routeProps) =>
                      role === "admin" ? (
                        <RiwayatCutiBersalinPNS {...routeProps} />
                      ) : (
                          <div>Halaman tidak ditemukan...</div>
                        )}
                  />
                  <Route
                    path="/data_cuti_alasan_penting/:id"
                    render={(routeProps) =>
                      role === "admin" ? (
                        <RiwayatCutiAlasanPentingPNS {...routeProps} />
                      ) : (
                          <div>Halaman tidak ditemukan...</div>
                        )}
                  />
                  <Route
                    path="/data_cltn/:id"
                    render={(routeProps) =>
                      role === "admin" ? (
                        <RiwayatCLTNPNS {...routeProps} />
                      ) : (
                          <div>Halaman tidak ditemukan...</div>
                        )}
                  />
                  <Route
                    path="/data_cltn"
                    render={(routeProps) =>
                      role === "admin" ? (
                        <DataCLTN {...routeProps} />
                      ) : (
                          <div>Halaman tidak ditemukan...</div>
                        )}
                  />
                  <Route
                    path="/data_cuti_alasan_penting"
                    render={(routeProps) =>
                      role === "admin" ? (
                        <DataCutiAlasanPenting {...routeProps} />
                      ) : (
                          <div>Halaman tidak ditemukan...</div>
                        )}
                  />
                  <Route
                    path="/data_cuti_bersalin"
                    render={(routeProps) =>
                      role === "admin" ? (
                        <DataCutiBersalin {...routeProps} />
                      ) : (
                          <div>Halaman tidak ditemukan...</div>
                        )}
                  />
                  <Route
                    path="/data_cuti_sakit"
                    render={(routeProps) =>
                      role === "admin" ? (
                        <DataCutiSakit {...routeProps} />
                      ) : (
                          <div>Halaman tidak ditemukan...</div>
                        )}
                  />
                  <Route
                    path="/data_cuti_besar"
                    render={(routeProps) =>
                      role === "admin" ? (
                        <DataCutiBesar {...routeProps} />
                      ) : (
                          <div>Halaman tidak ditemukan...</div>
                        )}
                  />
                  <Route
                    path="/data_cuti_tahunan"
                    render={(routeProps) =>
                      role === "admin" ? (
                        <DataCutiTahunan {...routeProps} />
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
                  {/* End admin */}

                  {/* User */}
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
                    path="/riwayat_cuti_tahunan"
                    render={(routeProps) =>
                      role === "user" ? (
                        <RiwayatCutiTahunan {...routeProps} />
                      ) : (
                          <div>Halaman tidak ditemukan...</div>
                        )}
                  />
                  {/* End user */}

                  {/* Global */}
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
                  {/* End global */}
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