import React, { Component, lazy, Suspense } from 'react';

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Grid from "@material-ui/core/Grid";

// React router dom
import {
  Switch,
  Route,
  Redirect,
  NavLink
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

// Breadcrumbs
const breadcrumbNameMap = {
  '/beranda': 'Beranda',
  '/pengaturan': 'Pengaturan',
  '/profil': 'Profil',
  '/beranda/cuti_tahunan': 'Cuti Tahunan',
  '/beranda/cuti_besar': 'Cuti Besar',
  '/beranda/cuti_sakit': 'Cuti Sakit',
  '/beranda/cuti_bersalin': 'Cuti Bersalin',
  '/beranda/cuti_alasan_penting': 'Cuti Alasan Penting',
  '/beranda/cltn': 'CLTN',
  '/beranda/data_pns': 'Data PNS',
  '/beranda/data_cuti': 'Data Cuti',
};

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
const DataCuti = lazy(() => import("../pages/DataCuti"));

class Content extends Component {
  render() {
    const { classes, role } = this.props;

    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Suspense fallback={<LinearProgress />}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <Route>
                {({ location }) => {
                  const pathnames = location.pathname.split('/').filter((x) => x);

                  return (
                    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                      <Link color="inherit" component={NavLink} to="/">Dashboard</Link>
                      {pathnames.map((value, index) => {
                        const last = index === pathnames.length - 1;
                        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                        const detail = `/${pathnames.slice(2, 3).join('/')}`;

                        breadcrumbNameMap[`/beranda/data_pns${detail}`] = "Detail PNS";
                        breadcrumbNameMap[`/beranda/data_pns${detail}/edit`] = "Edit Data PNS";

                        return last ? (
                          <Typography color="textPrimary" key={to}>
                            {breadcrumbNameMap[to]}
                          </Typography>
                        ) : (
                            <Link color="inherit" component={NavLink} to={to} key={to}>
                              {breadcrumbNameMap[to]}
                            </Link>
                          );
                      })}
                    </Breadcrumbs>
                  );
                }}
              </Route>
            </Grid>
            <Grid item xs={12} md={12}>
              <Switch>
                <Route
                  path="/beranda/data_cuti"
                  render={(routeProps) =>
                    role === "admin" ? (
                      <DataCuti {...routeProps} />
                    ) : (
                        <div>Halaman tidak ditemukan...</div>
                      )
                  }
                />

                <Route
                  path="/beranda/data_pns/:dataIndex/edit"
                  render={(routeProps) =>
                    role === "admin" ? (
                      <EditPNS {...routeProps} />
                    ) : (
                        <div>Halaman tidak ditemukan...</div>
                      )
                  }
                />

                <Route
                  path="/beranda/data_pns/:dataIndex"
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
                  render={(routeProps) =>
                    role === "user" ? (
                      <CLTN {...routeProps} />
                    ) : (
                        <div>Halaman tidak ditemukan...</div>
                      )}
                />

                <Route
                  path="/beranda/cuti_alasan_penting"
                  render={(routeProps) =>
                    role === "user" ? (
                      <CutiAlasanPenting  {...routeProps} />
                    ) : (
                        <div>Halaman tidak ditemukan...</div>
                      )}
                />

                <Route
                  path="/beranda/cuti_bersalin"
                  render={(routeProps) =>
                    role === "user" ? (
                      <CutiBersalin {...routeProps} />
                    ) : (
                        <div>Halaman tidak ditemukan...</div>
                      )}
                />

                <Route
                  path="/beranda/cuti_sakit"
                  render={(routeProps) =>
                    role === "user" ? (
                      <CutiSakit {...routeProps} />
                    ) : (
                        <div>Halaman tidak ditemukan...</div>
                      )}
                />

                <Route
                  path="/beranda/cuti_besar"
                  render={(routeProps) =>
                    role === "user" ? (
                      <CutiBesar {...routeProps} />
                    ) : (
                        <div>Halaman tidak ditemukan...</div>
                      )}
                />

                <Route
                  path="/beranda/cuti_tahunan"
                  render={(routeProps) =>
                    role === "user" ? (
                      <CutiTahunan {...routeProps} />
                    ) : (
                        <div>Halaman tidak ditemukan...</div>
                      )}
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