import React, { Component } from 'react';

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";

// React router dom
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";

// Pages
import Home from "../pages/Home";
import Setting from "../pages/Setting";
import Profile from "../pages/Profile";

// Admin templates
import DataPNS from "../templates/admin/DataPNS";
import DetailPNS from "../templates/admin/DetailPNS";
import Aproval from "../templates/admin/Aproval";

// User templates
import PengajuanCutiTahunan from "../templates/user/PengajuanCutiTahunan";
import PengajuanCutiBesar from "../templates/user/PengajuanCutiBesar";
import PengajuanCutiSakit from "../templates/user/PengajuanCutiSakit";
import PengajuanCutiBersalin from "../templates/user/PengajuanCutiBersalin";
import PengajuanCutiAlasanPenting from "../templates/user/PengajuanCutiAlasanPenting";
import PengajuanCLTN from "../templates/user/PengajuanCLTN";
import RiwayatCutiTahunan from "../templates/user/RiwayatCutiTahunan";
import RiwayatCutiBesar from "../templates/user/RiwayatCutiBesar";
import RiwayatCutiSakit from "../templates/user/RiwayatCutiSakit";
import RiwayatCutiBersalin from "../templates/user/RiwayatCutiBersalin";
import RiwayatCutiAlasanPenting from "../templates/user/RiwayatCutiAlasanPenting";
import RiwayatCLTN from "../templates/user/RiwayatCLTN";

// Molecules
import BreadcrumbMap from "../molecules/BreadcrumbMap";

// Styles
const styles = (theme) => ({
  toolbar: theme.mixins.toolbar,
  main: {
    padding: theme.spacing(3),
  }
});

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: "admin"
    };
  }

  render() {
    const { classes, match } = this.props;
    const { role } = this.state;
    return (
      <main className={classes.main} >
        <div className={classes.toolbar} />
        <Grid container spacing={2}>
          <Grid item md={12} xs={12}>
            <BreadcrumbMap />
          </Grid>
          <Grid item md={12} xs={12}>
            <Switch>
              {/* User templates */}
              <Route
                path={`${match.path}pengajuan_cuti_tahunan`}
                render={(props) =>
                  role === "user" ? (
                    <PengajuanCutiTahunan {...props} />
                  ) : (
                      <div>Halaman Tidak Ditemukan</div>
                    )}
              />
              <Route
                path={`${match.path}pengajuan_cuti_besar`}
                render={(props) =>
                  role === "user" ? (
                    <PengajuanCutiBesar {...props} />
                  ) : (
                      <div>Halaman Tidak Ditemukan</div>
                    )}
              />
              <Route
                path={`${match.path}pengajuan_cuti_sakit`}
                render={(props) =>
                  role === "user" ? (
                    <PengajuanCutiSakit {...props} />
                  ) : (
                      <div>Halaman Tidak Ditemukan</div>
                    )}
              />
              <Route
                path={`${match.path}pengajuan_cuti_bersalin`}
                render={(props) =>
                  role === "user" ? (
                    <PengajuanCutiBersalin {...props} />
                  ) : (
                      <div>Halaman Tidak Ditemukan</div>
                    )}
              />
              <Route
                path={`${match.path}pengajuan_cuti_alasan_penting`}
                render={(props) =>
                  role === "user" ? (
                    <PengajuanCutiAlasanPenting {...props} />
                  ) : (
                      <div>Halaman Tidak Ditemukan</div>
                    )}
              />
              <Route
                path={`${match.path}pengajuan_cltn`}
                render={(props) =>
                  role === "user" ? (
                    <PengajuanCLTN {...props} />
                  ) : (
                      <div>Halaman Tidak Ditemukan</div>
                    )}
              />
              <Route
                path={`${match.path}riwayat_cuti_tahunan`}
                render={(props) =>
                  role === "user" ? (
                    <RiwayatCutiTahunan {...props} />
                  ) : (
                      <div>Halaman Tidak Ditemukan</div>
                    )}
              />
              <Route
                path={`${match.path}riwayat_cuti_besar`}
                render={(props) =>
                  role === "user" ? (
                    <RiwayatCutiBesar {...props} />
                  ) : (
                      <div>Halaman Tidak Ditemukan</div>
                    )}
              />
              <Route
                path={`${match.path}riwayat_cuti_sakit`}
                render={(props) =>
                  role === "user" ? (
                    <RiwayatCutiSakit {...props} />
                  ) : (
                      <div>Halaman Tidak Ditemukan</div>
                    )}
              />
              <Route
                path={`${match.path}riwayat_cuti_bersalin`}
                render={(props) =>
                  role === "user" ? (
                    <RiwayatCutiBersalin {...props} />
                  ) : (
                      <div>Halaman Tidak Ditemukan</div>
                    )}
              />
              <Route
                path={`${match.path}riwayat_cuti_alasan_penting`}
                render={(props) =>
                  role === "user" ? (
                    <RiwayatCutiAlasanPenting {...props} />
                  ) : (
                      <div>Halaman Tidak Ditemukan</div>
                    )}
              />
              <Route
                path={`${match.path}riwayat_cltn`}
                render={(props) =>
                  role === "user" ? (
                    <RiwayatCLTN {...props} />
                  ) : (
                      <div>Halaman Tidak Ditemukan</div>
                    )}
              />

              {/* Admin templates */}
              <Route
                path={`${match.path}data_pns`}
                render={(props) =>
                  role === "admin" ? (
                    <DataPNS {...props} />
                  ) : (
                      <div>Halaman Tidak Ditemukan</div>
                    )}
              />
              <Route
                path={`${match.path}detail_pns`}
                render={(props) =>
                  role === "admin" ? (
                    <DetailPNS {...props} />
                  ) : (
                      <div>Halaman Tidak Ditemukan</div>
                    )}
              />
              <Route
                path={`${match.path}beranda/:cutiId`}
                render={(props) =>
                  role === "admin" ? (
                    <Aproval {...props} />
                  ) : (
                      <div>Halaman Tidak Ditemukan</div>
                    )}
              />

              {/* Global */}
              <Route
                path={`${match.path}profil`}
                component={Profile}
              />
              <Route
                path={`${match.path}pengaturan`}
                component={Setting}
              />
              <Route
                exact
                path={`${match.path}beranda`}
                component={Home}
              />
              <Redirect
                from={`${match.path}`}
                to={`${match.path}beranda`}
              />
            </Switch>
          </Grid>
        </Grid>
      </main>
    );
  }
}

export default withStyles(styles)(Main);