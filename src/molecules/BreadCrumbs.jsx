import React, { Component, Fragment } from 'react';

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
                const id = `/${pathnames.slice(1, 3).join('/')}`;

                const breadcrumbNameMap = {
                  '/beranda': 'Beranda',
                  '/pengaturan': "Pengaturan",
                  '/profil': "Profil",
                  '/cuti_tahunan': role === "admin" ? "Data Cuti Tahunan" : "Riwayat Cuti Tahunan",
                  '/cuti_besar': role === "admin" ? "Data Cuti Besar" : "Riwayat Cuti Besar",
                  '/cuti_sakit': role === "admin" ? "Data Cuti Sakit" : "Riwayat Cuti Sakit",
                  '/cuti_bersalin': role === "admin" ? "Data Cuti Bersalin" : "Riwayat Cuti Bersalin",
                  '/cuti_alasan_penting': role === "admin" ? "Data Cuti Alasan Penting" : "Riwayat Cuti Alasan Penting",
                  '/cltn': role === "admin" ? "Data Cuti Luar Tanggungan Negara" : "Riwayat Cuti Luar Tanggungan Negara",
                  '/pengajuan_cuti_tahunan': role === "admin" ? "404" : "Pengajuan Cuti Tahunan",
                  '/pengajuan_cuti_besar': role === "admin" ? "404" : "Pengajuan Cuti Besar",
                  '/pengajuan_cuti_sakit': role === "admin" ? "404" : "Pengajuan Cuti Sakit",
                  '/pengajuan_cuti_bersalin': role === "admin" ? "404" : "Pengajuan Cuti Bersalin",
                  '/pengajuan_cuti_alasan_penting': role === "admin" ? "404" : "Pengajuan Cuti Alasan Penting",
                  '/pengajuan_cltn': role === "admin" ? "404" : "Pengajuan Cuti Luar Tanggungan Negara",
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