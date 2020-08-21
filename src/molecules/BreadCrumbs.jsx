import React, { Component } from 'react';

// Material UI
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

// React router dom
import {
  Route,
  NavLink
} from "react-router-dom";

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
  '/beranda/data_pns': 'Data PNS'
};

class BreadCrumbs extends Component {
  render() {
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
    );
  }
}

export default BreadCrumbs; 