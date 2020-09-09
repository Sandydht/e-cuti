import React from 'react';

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

const BreadcrumbMap = ({ role }) => {
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
              const params = `/${pathnames.slice(1, 2).join('/')}`;
              const params2 = `/${pathnames.slice(2, 3).join('/')}`;

              // Admin
              breadcrumbNameMap[`/beranda${params}`] = role === "admin" ? "Detail Cuti" : "404";
              breadcrumbNameMap["/data_pns"] = role === "admin" ? "Data PNS" : "404";
              breadcrumbNameMap[`/tambah_data_pns`] = role === "admin" ? "Tambah Data PNS" : "404";
              breadcrumbNameMap[`/data_pns${params}`] = role === "admin" ? "Detail PNS" : "404";
              breadcrumbNameMap[`/data_pns${params}/edit`] = role === "admin" ? "Edit Data PNS" : "404";
              breadcrumbNameMap['/data_cuti_tahunan'] = role === "admin" ? "Cuti Tahunan" : "404";
              breadcrumbNameMap[`/data_cuti_tahunan${params}`] = role === "admin" ? "Riwayat Cuti" : "404";
              breadcrumbNameMap[`/data_cuti_tahunan${params}${params2}`] = role === "admin" ? "Detail Cuti" : "404";
              breadcrumbNameMap['/data_cuti_besar'] = role === "admin" ? "Cuti Besar" : "404";
              breadcrumbNameMap[`/data_cuti_besar${params}`] = role === "admin" ? "Riwayat Cuti" : "404";
              breadcrumbNameMap[`/data_cuti_besar${params}${params2}`] = role === "admin" ? "Detail Cuti" : "404";
              breadcrumbNameMap['/data_cuti_sakit'] = role === "admin" ? "Cuti Sakit" : "404";
              breadcrumbNameMap[`/data_cuti_sakit${params}`] = role === "admin" ? "Riwayat Cuti" : "404";
              breadcrumbNameMap[`/data_cuti_sakit${params}${params2}`] = role === "admin" ? "Detail Cuti" : "404";
              breadcrumbNameMap['/data_cuti_bersalin'] = role === "admin" ? "Cuti Bersalin" : "404";
              breadcrumbNameMap[`/data_cuti_bersalin${params}`] = role === "admin" ? "Riwayat Cuti" : "404";
              breadcrumbNameMap[`/data_cuti_bersalin${params}${params2}`] = role === "admin" ? "Detail Cuti" : "404";
              breadcrumbNameMap['/data_cuti_alasan_penting'] = role === "admin" ? "Cuti Alasan Penting" : "404";
              breadcrumbNameMap[`/data_cuti_alasan_penting${params}`] = role === "admin" ? "Riwayat Cuti" : "404";
              breadcrumbNameMap[`/data_cuti_alasan_penting${params}${params2}`] = role === "admin" ? "Detail Cuti" : "404";
              breadcrumbNameMap['/data_cltn'] = role === "admin" ? "CLTN" : "404";
              breadcrumbNameMap[`/data_cltn${params}`] = role === "admin" ? "Riwayat Cuti" : "404";
              breadcrumbNameMap[`/data_cltn${params}${params2}`] = role === "admin" ? "Detail Cuti" : "404";

              // User
              breadcrumbNameMap['/pengajuan_cuti_tahunan'] = role === "user" ? "Pengajuan Cuti Tahunan" : "404";
              breadcrumbNameMap['/pengajuan_cuti_besar'] = role === "user" ? "Pengajuan Cuti Besar" : "404";
              breadcrumbNameMap['/pengajuan_cuti_sakit'] = role === "user" ? "Pengajuan Cuti Sakit" : "404";
              breadcrumbNameMap['/pengajuan_cuti_bersalin'] = role === "user" ? "Pengajuan Cuti Bersalin" : "404";
              breadcrumbNameMap['/pengajuan_cuti_alasan_penting'] = role === "user" ? "Pengajuan Cuti Alasan Penting" : "404";
              breadcrumbNameMap['/pengajuan_cltn'] = role === "user" ? "Pengajuan CLTN" : "404";
              breadcrumbNameMap['/riwayat_cuti_tahunan'] = role === "user" ? "Cuti Tahunan" : "404";
              breadcrumbNameMap[`/riwayat_cuti_tahunan${params}`] = role === "user" ? "Detail Cuti" : "404";
              breadcrumbNameMap['/riwayat_cuti_besar'] = role === "user" ? "Cuti Besar" : "404";
              breadcrumbNameMap[`/riwayat_cuti_besar${params}`] = role === "user" ? "Detail Cuti" : "404";
              breadcrumbNameMap['/riwayat_cuti_sakit'] = role === "user" ? "Cuti Sakit" : "404";
              breadcrumbNameMap[`/riwayat_cuti_sakit${params}`] = role === "user" ? "Detail Cuti" : "404";
              breadcrumbNameMap['/riwayat_cuti_bersalin'] = role === "user" ? "Cuti Bersalin" : "404";
              breadcrumbNameMap[`/riwayat_cuti_bersalin${params}`] = role === "user" ? "Detail Cuti" : "404";
              breadcrumbNameMap['/riwayat_cuti_alasan_penting'] = role === "user" ? "Cuti Alasan Penting" : "404";
              breadcrumbNameMap[`/riwayat_cuti_alasan_penting${params}`] = role === "user" ? "Detail Cuti" : "404";
              breadcrumbNameMap['/riwayat_cltn'] = role === "user" ? "CLTN" : "404";
              breadcrumbNameMap[`/riwayat_cltn${params}`] = role === "user" ? "Detail Cuti" : "404";

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
};

export default BreadcrumbMap;
