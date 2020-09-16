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
                path='/riwayat_cltn'
                render={(routeProps) =>
                  role === 'user' ? (
                    <RiwayatCLTN {...routeProps} />
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
