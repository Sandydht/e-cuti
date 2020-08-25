import React, { Component } from 'react';

// Material UI
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

// Redux
import { connect } from "react-redux";

// React router dom
import { Route, NavLink } from "react-router-dom";

class BreadCrumbs extends Component {
  render() {
    const { role } = this.props;

    return (
      <Route>
        {({ location }) => {
          const pathnames = location.pathname.split('/').filter((x) => x);

          return (
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
              <Link color="inherit" component={NavLink} to="/">Dashboard</Link>

              {pathnames.map((value, index) => {
                const last = index === pathnames.length - 1;
                const to = `/${pathnames.slice(0, index + 1).join('/')}`;

                const breadcrumbNameMap = {
                  '/data_pns': "Data PNS",
                  '/beranda': 'Beranda',
                  '/beranda/cuti_tahunan': 'Cuti Tahunan',
                  '/beranda/cuti_besar': 'Cuti Besar',
                  '/beranda/cuti_sakit': 'Cuti Sakit',
                  '/beranda/cuti_bersalin': 'Cuti Bersalin',
                  '/beranda/cuti_alasan_penting': 'Cuti Alasan Penting',
                  '/beranda/cltn': 'CLTN',
                  '/cuti_tahunan': role === "admin" ? "Data Cuti Tahunan" : "Riwayat Cuti Tahunan",
                  '/cuti_besar': role === "admin" ? "Data Cuti Besar" : "Riwayat Cuti Besar",
                  '/cuti_sakit': role === "admin" ? "Data Cuti Sakit" : "Riwayat Cuti Sakit",
                  '/cuti_bersalin': role === "admin" ? "Data Cuti Bersalin" : "Riwayat Cuti Bersalin",
                  '/cuti_alasan_penting': role === "admin" ? "Data Cuti Alasan Penting" : "Riwayat Cuti Alasan Penting",
                  '/cltn': role === "admin" ? "Data CLTN" : "Riwayat CLTN",
                  '/pengaturan': "Pengaturan",
                  '/profil': "Profil",
                };

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
    );
  }
}

const mapStateToProps = ({ session }) => ({
  role: session.user.role
});

export default connect(mapStateToProps, null)(BreadCrumbs); 