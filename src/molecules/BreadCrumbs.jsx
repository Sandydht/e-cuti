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
                const id1 = `/${pathnames.slice(1, 2).join('/')}`;
                const id2 = `/${pathnames.slice(2, 3).join('/')}`;

                const breadcrumbNameMap = {
                  '/beranda': 'Beranda',
                  '/pengaturan': "Pengaturan",
                  '/profil': "Profil",
                  '/data_cuti_tahunan': role === "admin" ? "Data Cuti Tahunan" : "Riwayat Cuti Tahunan",
                  '/data_cuti_besar': role === "admin" ? "Data Cuti Besar" : "Riwayat Cuti Besar",
                  '/data_cuti_sakit': role === "admin" ? "Data Cuti Sakit" : "Riwayat Cuti Sakit",
                  '/data_cuti_bersalin': role === "admin" ? "Data Cuti Bersalin" : "Riwayat Cuti Bersalin",
                  '/data_cuti_alasan_penting': role === "admin" ? "Data Cuti Alasan Penting" : "Riwayat Cuti Alasan Penting",
                  '/data_cltn': role === "admin" ? "Data Cuti Luar Tanggungan Negara" : "Riwayat Cuti Luar Tanggungan Negara",
                  '/pengajuan_cuti_tahunan': role === "admin" ? "404" : "Pengajuan Cuti Tahunan",
                  '/pengajuan_cuti_besar': role === "admin" ? "404" : "Pengajuan Cuti Besar",
                  '/pengajuan_cuti_sakit': role === "admin" ? "404" : "Pengajuan Cuti Sakit",
                  '/pengajuan_cuti_bersalin': role === "admin" ? "404" : "Pengajuan Cuti Bersalin",
                  '/pengajuan_cuti_alasan_penting': role === "admin" ? "404" : "Pengajuan Cuti Alasan Penting",
                  '/pengajuan_cltn': role === "admin" ? "404" : "Pengajuan Cuti Luar Tanggungan Negara",
                };

                breadcrumbNameMap[`/beranda${id1}`] = role === "admin" ? "Detail PNS" : "404";
                breadcrumbNameMap[`/beranda${id1}/edit`] = role === "admin" ? "Edit Data PNS" : "404";
                breadcrumbNameMap[`/data_cuti_tahunan${id1}`] = role === "admin" ? "Riwayat Cuti" : "Detail Cuti";
                breadcrumbNameMap[`/data_cuti_besar${id1}`] = role === "admin" ? "Riwayat Cuti" : "Detail Cuti";
                breadcrumbNameMap[`/data_cuti_sakit${id1}`] = role === "admin" ? "Riwayat Cuti" : "Detail Cuti";
                breadcrumbNameMap[`/data_cuti_bersalin${id1}`] = role === "admin" ? "Riwayat Cuti" : "Detail Cuti";
                breadcrumbNameMap[`/data_cuti_alasan_penting${id1}`] = role === "admin" ? "Riwayat Cuti" : "Detail Cuti";
                breadcrumbNameMap[`/data_cltn${id1}`] = role === "admin" ? "Riwayat Cuti" : "Detail Cuti";
                breadcrumbNameMap[`/data_cuti_tahunan${id1}${id2}`] = role === "admin" ? "Detail PNS" : "404";

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