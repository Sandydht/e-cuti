import React, { Component } from 'react';

// Material UI
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

// Icons
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

// React router dom
import {
  NavLink,
  Route
} from "react-router-dom";

// Breadcrumbs map
const breadcrumbNameMap = {
  '/beranda': 'Beranda',
  '/pengaturan': 'Pengaturan',
  '/profil': 'Profil'
};

class BreadcrumbMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: "admin"
    };
  }

  render() {
    const { role } = this.state;

    return (
      <Route>
        {({ location }) => {
          const pathnames = location.pathname.split("/").filter(x => x);

          return (
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
              <Link color="inherit" component={NavLink} to="/">Dashboard</Link>
              {pathnames.map((value, index) => {
                const last = index === pathnames.length - 1;
                const to = `/${pathnames.slice(0, index + 1).join('/')}`;

                // Admin
                breadcrumbNameMap["/data_pns"] = role === "admin" ? "Data PNS" : "404";
                breadcrumbNameMap["/data_cuti_tahunan"] = role === "admin" ? "Data Cuti Tahunan" : "404";
                breadcrumbNameMap["/data_cuti_besar"] = role === "admin" ? "Data Cuti Besar" : "404";
                breadcrumbNameMap["/data_cuti_sakit"] = role === "admin" ? "Data Cuti Sakit" : "404";
                breadcrumbNameMap["/data_cuti_bersalin"] = role === "admin" ? "Data Cuti Bersalin" : "404";
                breadcrumbNameMap["/data_cuti_alasan_penting"] = role === "admin" ? "Data Cuti Alasan Penting" : "404";
                breadcrumbNameMap["/data_cltn"] = role === "admin" ? "Data CLTN" : "404";

                // User
                breadcrumbNameMap['/pengajuan_cuti_tahunan'] = role === "user" ? "Pengajuan Cuti Tahunan" : "404";
                breadcrumbNameMap['/pengajuan_cuti_besar'] = role === "user" ? "Pengajuan Cuti Besar" : "404";
                breadcrumbNameMap['/pengajuan_cuti_sakit'] = role === "user" ? "Pengajuan Cuti Sakit" : "404";
                breadcrumbNameMap['/pengajuan_cuti_bersalin'] = role === "user" ? "Pengajuan Cuti Bersalin" : "404";
                breadcrumbNameMap['/pengajuan_cuti_alasan_penting'] = role === "user" ? "Pengajuan Cuti Alasan Penting" : "404";
                breadcrumbNameMap['/pengajuan_cltn'] = role === "user" ? "Pengajuan CLTN" : "404";
                breadcrumbNameMap['/riwayat_cuti_tahunan'] = role === "user" ? "Riwayat Cuti Tahunan" : "404";
                breadcrumbNameMap['/riwayat_cuti_besar'] = role === "user" ? "Riwayat Cuti Besar" : "404";
                breadcrumbNameMap['/riwayat_cuti_sakit'] = role === "user" ? "Riwayat Cuti Sakit" : "404";
                breadcrumbNameMap['/riwayat_cuti_bersalin'] = role === "user" ? "Riwayat Cuti Bersalin" : "404";
                breadcrumbNameMap['/riwayat_cuti_alasan_penting'] = role === "user" ? "Riwayat Cuti Alasan Penting" : "404";
                breadcrumbNameMap['/riwayat_cltn'] = role === "user" ? "Riwayat CLTN" : "404";

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

export default BreadcrumbMap;
