import React from 'react';

// Material UI
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

// Material icons
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

// Redux
import { connect } from 'react-redux';

// React router dom
import {
  Route,
  NavLink
} from 'react-router-dom';

const BreadcrumbsMap = ({ role }) => {
  return (
    <Route>
      {({ location }) => {
        const pathnames = location.pathname.split('/').filter((x) => x);

        return (
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label='breadcrumbs'>
            <Link color='inherit' component={NavLink} to='/'>Dashboard</Link>

            {pathnames.map((value, index) => {
              const last = index === pathnames.length - 1;
              const to = `/${pathnames.slice(0, index + 1).join('/')}`;

              const breadcrumbNameMap = {
                '/beranda': 'Beranda',
                '/pengaturan': 'Pengaturan',
                '/profil': 'Profil',
                '/pengajuan_cuti_tahunan': role === 'user' ? 'Pengajuan Cuti Tahunan' : '404',
                '/pengajuan_cuti_besar': role === 'user' ? 'Pengajuan Cuti Besar' : '404',
                '/pengajuan_cuti_sakit': role === 'user' ? 'Pengajuan Cuti Sakit' : '404',
                '/pengajuan_cuti_bersalin': role === 'user' ? 'Pengajuan Cuti Bersalin' : '404',
                '/pengajuan_cap': role === 'user' ? 'Pengajuan Cuti Alasan Penting' : '404',
                '/pengajuan_cltn': role === 'user' ? 'Pengajuan CLTN' : '404',
                '/riwayat_cuti_tahunan': role === 'user' ? 'Riwayat Cuti Tahunan' : '404',
                '/riwayat_cuti_besar': role === 'user' ? 'Riwayat Cuti Besar' : '404',
                '/riwayat_cuti_sakit': role === 'user' ? 'Riwayat Cuti Sakit' : '404',
                '/riwayat_cuti_bersalin': role === 'user' ? 'Riwayat Cuti Bersalin' : '404',
                '/riwayat_cap': role === 'user' ? 'Riwayat Cuti Alasan Penting' : '404',
                '/riwayat_cltn': role === 'user' ? 'Riwayat CLTN' : '404',
              };

              return last ? (
                <Typography color='textPrimary' key={to}>{breadcrumbNameMap[to]}</Typography>
              ) : (
                  <Link color='inherit' component={NavLink} to={to} key={to}>{breadcrumbNameMap[to]}</Link>
                );
            })}
          </Breadcrumbs>
        );
      }}
    </Route>
  );
};

const mapStateToProps = ({ session }) => ({
  role: session.user.role
});

export default connect(mapStateToProps)(BreadcrumbsMap);
