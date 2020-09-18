import React, { lazy, Suspense } from 'react';

// Material UI
import makeStyles from '@material-ui/core/styles/makeStyles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';

// React router dom
import {
  Switch,
  Route, Redirect
} from 'react-router-dom';

// Redux
import { connect } from 'react-redux';

// Molecules
import BreadcrumbsMap from '../molecules/BreadcrumbsMap';

// Styles
const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  content: {
    padding: theme.spacing(3)
  }
}));

// Pages
const AdminHome = lazy(() => import('../templates/admin/AdminHome'));
const UserHome = lazy(() => import('../templates/user/UserHome'));
const Profile = lazy(() => import('../pages/Profile'));
const Setting = lazy(() => import('../pages/Setting'));
const DetailCuti = lazy(() => import('../pages/DetailCuti'));

// User templates
const PengajuanCutiTahunan = lazy(() => import('../templates/user/PengajuanCutiTahunan'));
const PengajuanCutiBesar = lazy(() => import('../templates/user/PengajuanCutiBesar'));
const PengajuanCutiSakit = lazy(() => import('../templates/user/PengajuanCutiSakit'));
const PengajuanCutiBersalin = lazy(() => import('../templates/user/PengajuanCutiBersalin'));
const PengajuanCAP = lazy(() => import('../templates/user/PengajuanCAP'));
const PengajuanCLTN = lazy(() => import('../templates/user/PengajuanCLTN'));
const RiwayatCutiTahunan = lazy(() => import('../templates/user/RiwayatCutiTahunan'));
const RiwayatCutiBesar = lazy(() => import('../templates/user/RiwayatCutiBesar'));
const RiwayatCutiSakit = lazy(() => import('../templates/user/RiwayatCutiSakit'));
const RiwayatCutiBersalin = lazy(() => import('../templates/user/RiwayatCutiBersalin'));
const RiwayatCAP = lazy(() => import('../templates/user/RiwayatCAP'));
const RiwayatCLTN = lazy(() => import('../templates/user/RiwayatCLTN'));

// Admin templates
const DataPNS = lazy(() => import('../templates/admin/DataPNS'));
const DetailPNS = lazy(() => import('../templates/admin/DetailPNS'));
const DataCutiTahunan = lazy(() => import('../templates/admin/DataCutiTahunan'));
const DataCutiBesar = lazy(() => import('../templates/admin/DataCutiBesar'));
const DataCutiSakit = lazy(() => import('../templates/admin/DataCutiSakit'));
const DataCutiBersalin = lazy(() => import('../templates/admin/DataCutiBersalin'));
const DataCAP = lazy(() => import('../templates/admin/DataCAP'));
const DataCLTN = lazy(() => import('../templates/admin/DataCLTN'));
const RiwayatCutiTahunanPNS = lazy(() => import('../templates/admin/RiwayatCutiTahunanPNS'));
const RiwayatCutiBesarPNS = lazy(() => import('../templates/admin/RiwayatCutiBesarPNS'));
const RiwayatCutiSakitPNS = lazy(() => import('../templates/admin/RiwayatCutiSakitPNS'));
const RiwayatCutiBersalinPNS = lazy(() => import('../templates/admin/RiwayatCutiBersalinPNS'));
const RiwayatCAPPNS = lazy(() => import('../templates/admin/RiwayatCAPPNS'));
const RiwayatCLTNPNS = lazy(() => import('../templates/admin/RiwayatCLTNPNS'));

const Main = ({ role }) => {
  const classes = useStyles();

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Suspense fallback={<LinearProgress />}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <BreadcrumbsMap />
          </Grid>
          <Grid item xs={12} md={12}>
            <Switch>
              {/* Admin templates */}
              <Route
                exact
                path='/beranda/:cutiId'
                render={(routeProps) =>
                  role === 'admin' ? (
                    <DetailCuti {...routeProps} />
                  ) : (
                      <div>Halaman tidak ditemukan</div>
                    )}
              />
              <Route
                exact
                path='/data_pns'
                render={(routeProps) =>
                  role === 'admin' ? (
                    <DataPNS {...routeProps} />
                  ) : (
                      <div>Halaman tidak ditemukan</div>
                    )}
              />
              <Route
                exact
                path='/data_pns/:pnsId'
                render={(routeProps) =>
                  role === 'admin' ? (
                    <DetailPNS {...routeProps} />
                  ) : (
                      <div>Halaman tidak ditemukan</div>
                    )}
              />
              <Route
                exact
                path='/data_cuti_tahunan'
                render={(routeProps) =>
                  role === 'admin' ? (
                    <DataCutiTahunan {...routeProps} />
                  ) : (
                      <div>Halaman tidak ditemukan</div>
                    )}
              />
              <Route
                exact
                path='/data_cuti_tahunan/:pnsId'
                render={(routeProps) =>
                  role === 'admin' ? (
                    <RiwayatCutiTahunanPNS {...routeProps} />
                  ) : (
                      <div>Halaman tidak ditemukan</div>
                    )}
              />
              <Route
                exact
                path='/data_cuti_tahunan/:pnsId/:cutiId'
                render={(routeProps) =>
                  role === 'admin' ? (
                    <DetailCuti {...routeProps} />
                  ) : (
                      <div>Halaman tidak ditemukan</div>
                    )}
              />
              <Route
                exact
                path='/data_cuti_besar'
                render={(routeProps) =>
                  role === 'admin' ? (
                    <DataCutiBesar {...routeProps} />
                  ) : (
                      <div>Halaman tidak ditemukan</div>
                    )}
              />
              <Route
                exact
                path='/data_cuti_besar/:pnsId'
                render={(routeProps) =>
                  role === 'admin' ? (
                    <RiwayatCutiBesarPNS {...routeProps} />
                  ) : (
                      <div>Halaman tidak ditemukan</div>
                    )}
              />
              <Route
                exact
                path='/data_cuti_besar/:pnsId/:cutiId'
                render={(routeProps) =>
                  role === 'admin' ? (
                    <DetailCuti {...routeProps} />
                  ) : (
                      <div>Halaman tidak ditemukan</div>
                    )}
              />
              <Route
                exact
                path='/data_cuti_sakit'
                render={(routeProps) =>
                  role === 'admin' ? (
                    <DataCutiSakit {...routeProps} />
                  ) : (
                      <div>Halaman tidak ditemukan</div>
                    )}
              />
              <Route
                exact
                path='/data_cuti_sakit/:pnsId'
                render={(routeProps) =>
                  role === 'admin' ? (
                    <RiwayatCutiSakitPNS {...routeProps} />
                  ) : (
                      <div>Halaman tidak ditemukan</div>
                    )}
              />
              <Route
                exact
                path='/data_cuti_sakit/:pnsId/:cutiId'
                render={(routeProps) =>
                  role === 'admin' ? (
                    <DetailCuti {...routeProps} />
                  ) : (
                      <div>Halaman tidak ditemukan</div>
                    )}
              />
              <Route
                exact
                path='/data_cuti_bersalin'
                render={(routeProps) =>
                  role === 'admin' ? (
                    <DataCutiBersalin {...routeProps} />
                  ) : (
                      <div>Halaman tidak ditemukan</div>
                    )}
              />
              <Route
                exact
                path='/data_cuti_bersalin/:pnsId'
                render={(routeProps) =>
                  role === 'admin' ? (
                    <RiwayatCutiBersalinPNS {...routeProps} />
                  ) : (
                      <div>Halaman tidak ditemukan</div>
                    )}
              />
              <Route
                exact
                path='/data_cuti_bersalin/:pnsId/:cutiId'
                render={(routeProps) =>
                  role === 'admin' ? (
                    <DetailCuti {...routeProps} />
                  ) : (
                      <div>Halaman tidak ditemukan</div>
                    )}
              />
              <Route
                exact
                path='/data_cap'
                render={(routeProps) =>
                  role === 'admin' ? (
                    <DataCAP {...routeProps} />
                  ) : (
                      <div>Halaman tidak ditemukan</div>
                    )}
              />
              <Route
                exact
                path='/data_cap/:pnsId'
                render={(routeProps) =>
                  role === 'admin' ? (
                    <RiwayatCAPPNS {...routeProps} />
                  ) : (
                      <div>Halaman tidak ditemukan</div>
                    )}
              />
              <Route
                exact
                path='/data_cap/:pnsId/:cutiId'
                render={(routeProps) =>
                  role === 'admin' ? (
                    <DetailCuti {...routeProps} />
                  ) : (
                      <div>Halaman tidak ditemukan</div>
                    )}
              />
              <Route
                exact
                path='/data_cltn'
                render={(routeProps) =>
                  role === 'admin' ? (
                    <DataCLTN {...routeProps} />
                  ) : (
                      <div>Halaman tidak ditemukan</div>
                    )}
              />
              <Route
                exact
                path='/data_cltn/:pnsId'
                render={(routeProps) =>
                  role === 'admin' ? (
                    <RiwayatCLTNPNS {...routeProps} />
                  ) : (
                      <div>Halaman tidak ditemukan</div>
                    )}
              />
              <Route
                exact
                path='/data_cltn/:pnsId/:cutiId'
                render={(routeProps) =>
                  role === 'admin' ? (
                    <DetailCuti {...routeProps} />
                  ) : (
                      <div>Halaman tidak ditemukan</div>
                    )}
              />

              {/* User templates */}
              <Route
                exact
                path='/pengajuan_cuti_tahunan'
                render={(routeProps) =>
                  role === 'user' ? (
                    <PengajuanCutiTahunan {...routeProps} />
                  ) : (
                      <div>Halaman tidak ditemukan</div>
                    )}
              />
              <Route
                exact
                path='/pengajuan_cuti_besar'
                render={(routeProps) =>
                  role === 'user' ? (
                    <PengajuanCutiBesar {...routeProps} />
                  ) : (
                      <div>Halaman tidak ditemukan</div>
                    )}
              />
              <Route
                exact
                path='/pengajuan_cuti_sakit'
                render={(routeProps) =>
                  role === 'user' ? (
                    <PengajuanCutiSakit {...routeProps} />
                  ) : (
                      <div>Halaman tidak ditemukan</div>
                    )}
              />
              <Route
                exact
                path='/pengajuan_cuti_bersalin'
                render={(routeProps) =>
                  role === 'user' ? (
                    <PengajuanCutiBersalin {...routeProps} />
                  ) : (
                      <div>Halaman tidak ditemukan</div>
                    )}
              />
              <Route
                exact
                path='/pengajuan_cap'
                render={(routeProps) =>
                  role === 'user' ? (
                    <PengajuanCAP {...routeProps} />
                  ) : (
                      <div>Halaman tidak ditemukan</div>
                    )}
              />
              <Route
                exact
                path='/pengajuan_cltn'
                render={(routeProps) =>
                  role === 'user' ? (
                    <PengajuanCLTN {...routeProps} />
                  ) : (
                      <div>Halaman tidak ditemukan</div>
                    )}
              />
              <Route
                exact
                path='/riwayat_cuti_tahunan'
                render={(routeProps) =>
                  role === 'user' ? (
                    <RiwayatCutiTahunan {...routeProps} />
                  ) : (
                      <div>Halaman tidak ditemukan</div>
                    )}
              />
              <Route
                exact
                path='/riwayat_cuti_tahunan/:cutiId'
                render={(routeProps) =>
                  role === 'user' ? (
                    <DetailCuti {...routeProps} />
                  ) : (
                      <div>Halaman tidak ditemukan</div>
                    )}
              />
              <Route
                exact
                path='/riwayat_cuti_besar'
                render={(routeProps) =>
                  role === 'user' ? (
                    <RiwayatCutiBesar {...routeProps} />
                  ) : (
                      <div>Halaman tidak ditemukan</div>
                    )}
              />
              <Route
                exact
                path='/riwayat_cuti_besar/:cutiId'
                render={(routeProps) =>
                  role === 'user' ? (
                    <DetailCuti {...routeProps} />
                  ) : (
                      <div>Halaman tidak ditemukan</div>
                    )}
              />
              <Route
                exact
                path='/riwayat_cuti_sakit'
                render={(routeProps) =>
                  role === 'user' ? (
                    <RiwayatCutiSakit {...routeProps} />
                  ) : (
                      <div>Halaman tidak ditemukan</div>
                    )}
              />
              <Route
                exact
                path='/riwayat_cuti_sakit/:cutiId'
                render={(routeProps) =>
                  role === 'user' ? (
                    <DetailCuti {...routeProps} />
                  ) : (
                      <div>Halaman tidak ditemukan</div>
                    )}
              />
              <Route
                exact
                path='/riwayat_cuti_bersalin'
                render={(routeProps) =>
                  role === 'user' ? (
                    <RiwayatCutiBersalin {...routeProps} />
                  ) : (
                      <div>Halaman tidak ditemukan</div>
                    )}
              />
              <Route
                exact
                path='/riwayat_cuti_bersalin/:cutiId'
                render={(routeProps) =>
                  role === 'user' ? (
                    <DetailCuti {...routeProps} />
                  ) : (
                      <div>Halaman tidak ditemukan</div>
                    )}
              />
              <Route
                exact
                path='/riwayat_cap'
                render={(routeProps) =>
                  role === 'user' ? (
                    <RiwayatCAP {...routeProps} />
                  ) : (
                      <div>Halaman tidak ditemukan</div>
                    )}
              />
              <Route
                exact
                path='/riwayat_cap/:cutiId'
                render={(routeProps) =>
                  role === 'user' ? (
                    <DetailCuti {...routeProps} />
                  ) : (
                      <div>Halaman tidak ditemukan</div>
                    )}
              />
              <Route
                exact
                path='/riwayat_cltn'
                render={(routeProps) =>
                  role === 'user' ? (
                    <RiwayatCLTN {...routeProps} />
                  ) : (
                      <div>Halaman tidak ditemukan</div>
                    )}
              />
              <Route
                exact
                path='/riwayat_cltn/:cutiId'
                render={(routeProps) =>
                  role === 'user' ? (
                    <DetailCuti {...routeProps} />
                  ) : (
                      <div>Halaman tidak ditemukan</div>
                    )}
              />

              {/* Pages */}
              <Route
                exact
                path='/beranda'
                render={(routeProps) =>
                  role === 'admin' ? (
                    <AdminHome {...routeProps} />
                  ) : (
                      <UserHome  {...routeProps} />
                    )}
              />

              <Route
                exact
                path='/profil'
                component={Profile}
              />

              <Route
                exact
                path='/pengaturan'
                component={Setting}
              />

              <Redirect
                from='/'
                to='/beranda'
              />
            </Switch>
          </Grid>
        </Grid>
      </Suspense>
    </main>
  );
};

const mapStateToProps = ({ session }) => ({
  role: session.user.role
});

export default connect(mapStateToProps)(Main);
