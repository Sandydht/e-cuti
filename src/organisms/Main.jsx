import React, { lazy, Suspense } from 'react';

// Material UI
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";

// React router dom
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";

// Molecules
import BreadcrumbMap from "../molecules/BreadcrumbMap";

// Styles
const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  main: {
    padding: theme.spacing(3)
  }
}));

// Pages
const Home = lazy(() => import("../pages/Home"));
const Setting = lazy(() => import("../pages/Setting"));
const Profile = lazy(() => import("../pages/Profile"));

// Global templates
const DetailCuti = lazy(() => import("../templates/DetailCuti"));

// Admin templates
const DataPNS = lazy(() => import("../templates/admin/DataPNS"));
const Aproval = lazy(() => import("../templates/admin/Aproval"));
const DetailPNS = lazy(() => import("../templates/admin/DetailPNS"));
const EditDataPNS = lazy(() => import("../templates/admin/EditDataPNS"));
const TambahDataPNS = lazy(() => import("../templates/admin/TambahDataPNS"));
const DataCutiTahunan = lazy(() => import("../templates/admin/DataCutiTahunan"));
const DataCutiBesar = lazy(() => import("../templates/admin/DataCutiBesar"));
const DataCutiSakit = lazy(() => import("../templates/admin/DataCutiSakit"));
const DataCutiBersalin = lazy(() => import("../templates/admin/DataCutiBersalin"));
const DataCutiAlasanPenting = lazy(() => import("../templates/admin/DataCutiAlasanPenting"));
const DataCLTN = lazy(() => import("../templates/admin/DataCLTN"));

// User templates
const PengajuanCutiTahunan = lazy(() => import("../templates/user/PengajuanCutiTahunan"));
const PengajuanCutiBesar = lazy(() => import("../templates/user/PengajuanCutiBesar"));
const PengajuanCutiSakit = lazy(() => import("../templates/user/PengajuanCutiSakit"));
const PengajuanCutiBersalin = lazy(() => import("../templates/user/PengajuanCutiBersalin"));
const PengajuanCutiAlasanPenting = lazy(() => import("../templates/user/PengajuanCutiAlasanPenting"));
const PengajuanCLTN = lazy(() => import("../templates/user/PengajuanCLTN"));
const RiwayatCutiTahunan = lazy(() => import("../templates/user/RiwayatCutiTahunan"));
const RiwayatCutiBesar = lazy(() => import("../templates/user/RiwayatCutiBesar"));
const RiwayatCutiSakit = lazy(() => import("../templates/user/RiwayatCutiSakit"));
const RiwayatCutiBersalin = lazy(() => import("../templates/user/RiwayatCutiBersalin"));
const RiwayatCutiAlasanPenting = lazy(() => import("../templates/user/RiwayatCutiAlasanPenting"));
const RiwayatCLTN = lazy(() => import("../templates/user/RiwayatCLTN"));

const Main = ({ role, match }) => {
  const classes = useStyles();
  return (
    <main className={classes.main}>
      <div className={classes.toolbar} />
      <Suspense fallback={<LinearProgress />}>
        <Grid container spacing={2}>
          <Grid item md={12} xs={12}>
            <BreadcrumbMap role={role} />
          </Grid>
          <Grid item md={12} xs={12}>
            <Switch>
              {/* User templates */}
              <Route
                exact
                path={`${match.path}pengajuan_cuti_tahunan`}
                render={(props) =>
                  role === "user" ? (
                    <PengajuanCutiTahunan {...props} />
                  ) : (
                      <div>Halaman Tidak Ditemukan</div>
                    )}
              />

              <Route
                exact
                path={`${match.path}pengajuan_cuti_besar`}
                render={(props) =>
                  role === "user" ? (
                    <PengajuanCutiBesar {...props} />
                  ) : (
                      <div>Halaman Tidak Ditemukan</div>
                    )}
              />

              <Route
                exact
                path={`${match.path}pengajuan_cuti_sakit`}
                render={(props) =>
                  role === "user" ? (
                    <PengajuanCutiSakit {...props} />
                  ) : (
                      <div>Halaman Tidak Ditemukan</div>
                    )}
              />

              <Route
                exact
                path={`${match.path}pengajuan_cuti_bersalin`}
                render={(props) =>
                  role === "user" ? (
                    <PengajuanCutiBersalin {...props} />
                  ) : (
                      <div>Halaman Tidak Ditemukan</div>
                    )}
              />

              <Route
                exact
                path={`${match.path}pengajuan_cuti_alasan_penting`}
                render={(props) =>
                  role === "user" ? (
                    <PengajuanCutiAlasanPenting {...props} />
                  ) : (
                      <div>Halaman Tidak Ditemukan</div>
                    )}
              />

              <Route
                exact
                path={`${match.path}pengajuan_cltn`}
                render={(props) =>
                  role === "user" ? (
                    <PengajuanCLTN {...props} />
                  ) : (
                      <div>Halaman Tidak Ditemukan</div>
                    )}
              />

              <Route
                exact
                path={`${match.path}riwayat_cuti_tahunan`}
                render={(props) =>
                  role === "user" ? (
                    <RiwayatCutiTahunan {...props} />
                  ) : (
                      <div>Halaman Tidak Ditemukan</div>
                    )}
              />

              <Route
                exact
                path={`${match.path}riwayat_cuti_tahunan/:cutiId`}
                render={(props) =>
                  role === "user" ? (
                    <DetailCuti {...props} />
                  ) : (
                      <div>Halaman Tidak Ditemukan</div>
                    )}
              />

              <Route
                exact
                path={`${match.path}riwayat_cuti_besar`}
                render={(props) =>
                  role === "user" ? (
                    <RiwayatCutiBesar {...props} />
                  ) : (
                      <div>Halaman Tidak Ditemukan</div>
                    )}
              />

              <Route
                exact
                path={`${match.path}riwayat_cuti_besar/:cutiId`}
                render={(props) =>
                  role === "user" ? (
                    <DetailCuti {...props} />
                  ) : (
                      <div>Halaman Tidak Ditemukan</div>
                    )}
              />

              <Route
                exact
                path={`${match.path}riwayat_cuti_sakit`}
                render={(props) =>
                  role === "user" ? (
                    <RiwayatCutiSakit {...props} />
                  ) : (
                      <div>Halaman Tidak Ditemukan</div>
                    )}
              />

              <Route
                exact
                path={`${match.path}riwayat_cuti_sakit/:cutiId`}
                render={(props) =>
                  role === "user" ? (
                    <DetailCuti {...props} />
                  ) : (
                      <div>Halaman Tidak Ditemukan</div>
                    )}
              />

              <Route
                exact
                path={`${match.path}riwayat_cuti_bersalin`}
                render={(props) =>
                  role === "user" ? (
                    <RiwayatCutiBersalin {...props} />
                  ) : (
                      <div>Halaman Tidak Ditemukan</div>
                    )}
              />

              <Route
                exact
                path={`${match.path}riwayat_cuti_bersalin/:cutiId`}
                render={(props) =>
                  role === "user" ? (
                    <DetailCuti {...props} />
                  ) : (
                      <div>Halaman Tidak Ditemukan</div>
                    )}
              />

              <Route
                exact
                path={`${match.path}riwayat_cuti_alasan_penting`}
                render={(props) =>
                  role === "user" ? (
                    <RiwayatCutiAlasanPenting {...props} />
                  ) : (
                      <div>Halaman Tidak Ditemukan</div>
                    )}
              />

              <Route
                exact
                path={`${match.path}riwayat_cuti_alasan_penting/:cutiId`}
                render={(props) =>
                  role === "user" ? (
                    <DetailCuti {...props} />
                  ) : (
                      <div>Halaman Tidak Ditemukan</div>
                    )}
              />

              <Route
                exact
                path={`${match.path}riwayat_cltn`}
                render={(props) =>
                  role === "user" ? (
                    <RiwayatCLTN {...props} />
                  ) : (
                      <div>Halaman Tidak Ditemukan</div>
                    )}
              />

              <Route
                exact
                path={`${match.path}riwayat_cltn/:cutiId`}
                render={(props) =>
                  role === "user" ? (
                    <DetailCuti {...props} />
                  ) : (
                      <div>Halaman Tidak Ditemukan</div>
                    )}
              />

              {/* Admin templates */}
              <Route
                exact
                path={`${match.path}beranda/:cutiId/aproval`}
                render={(props) =>
                  role === "admin" ? (
                    <Aproval {...props} />
                  ) : (
                      <div>Halaman Tidak Ditemukan</div>
                    )}
              />

              <Route
                exact
                path={`${match.path}data_cltn`}
                render={(props) =>
                  role === "admin" ? (
                    <DataCLTN {...props} />
                  ) : (
                      <div>Halaman Tidak Ditemukan</div>
                    )}
              />

              <Route
                exact
                path={`${match.path}data_cuti_alasan_penting`}
                render={(props) =>
                  role === "admin" ? (
                    <DataCutiAlasanPenting {...props} />
                  ) : (
                      <div>Halaman Tidak Ditemukan</div>
                    )}
              />

              <Route
                exact
                path={`${match.path}data_cuti_bersalin`}
                render={(props) =>
                  role === "admin" ? (
                    <DataCutiBersalin {...props} />
                  ) : (
                      <div>Halaman Tidak Ditemukan</div>
                    )}
              />

              <Route
                exact
                path={`${match.path}data_cuti_sakit`}
                render={(props) =>
                  role === "admin" ? (
                    <DataCutiSakit {...props} />
                  ) : (
                      <div>Halaman Tidak Ditemukan</div>
                    )}
              />

              <Route
                exact
                path={`${match.path}data_cuti_besar`}
                render={(props) =>
                  role === "admin" ? (
                    <DataCutiBesar {...props} />
                  ) : (
                      <div>Halaman Tidak Ditemukan</div>
                    )}
              />

              <Route
                exact
                path={`${match.path}data_cuti_tahunan`}
                render={(props) =>
                  role === "admin" ? (
                    <DataCutiTahunan {...props} />
                  ) : (
                      <div>Halaman Tidak Ditemukan</div>
                    )}
              />

              <Route
                exact
                path={`${match.path}tambah_data_pns`}
                render={(props) =>
                  role === "admin" ? (
                    <TambahDataPNS {...props} />
                  ) : (
                      <div>Halaman Tidak Ditemukan</div>
                    )}
              />

              <Route
                exact
                path={`${match.path}data_pns`}
                render={(props) =>
                  role === "admin" ? (
                    <DataPNS {...props} />
                  ) : (
                      <div>Halaman Tidak Ditemukan</div>
                    )}
              />

              <Route
                exact
                path={`${match.path}data_pns/:pnsId`}
                render={(props) =>
                  role === "admin" ? (
                    <DetailPNS {...props} />
                  ) : (
                      <div>Halaman Tidak Ditemukan</div>
                    )}
              />

              <Route
                exact
                path={`${match.path}data_pns/:pnsId/edit`}
                render={(props) =>
                  role === "admin" ? (
                    <EditDataPNS {...props} />
                  ) : (
                      <div>Halaman Tidak Ditemukan</div>
                    )}
              />

              <Route
                exact
                path={`${match.path}beranda/:cutiId`}
                render={(props) =>
                  role === "admin" ? (
                    <DetailCuti {...props} />
                  ) : (
                      <div>Halaman Tidak Ditemukan</div>
                    )}
              />

              {/* Global */}
              <Route
                exact
                path={`${match.path}profil`}
                render={(props) => <Profile {...props} />}
              />
              <Route
                exact
                path={`${match.path}pengaturan`}
                render={(props) => <Setting {...props} />}
              />
              <Route
                exact
                path={`${match.path}beranda`}
                render={(props) => <Home role={role} {...props} />}
              />
              <Redirect
                from={`${match.path}`}
                to={`${match.path}beranda`}
              />
            </Switch>
          </Grid>
        </Grid>
      </Suspense>
    </main >
  );
};

export default Main;