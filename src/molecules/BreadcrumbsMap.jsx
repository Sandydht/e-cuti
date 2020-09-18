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
              const params1 = `/${pathnames.slice(1, 2).join('/')}`;

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
                '/data_pns': role === 'admin' ? 'Data PNS' : '404',
                '/data_cuti_tahunan': role === 'admin' ? 'Data Cuti Tahunan' : '404',
                '/data_cuti_besar': role === 'admin' ? 'Data Cuti Besar' : '404',
                '/data_cuti_sakit': role === 'admin' ? 'Data Cuti Sakit' : '404',
                '/data_cuti_bersalin': role === 'admin' ? 'Data Cuti Bersalin' : '404',
                '/data_cap': role === 'admin' ? 'Data Cuti Alasan Penting' : '404',
                '/data_cltn': role === 'admin' ? 'Data CLTN' : '404',
              };

              breadcrumbNameMap[`/beranda${params1}`] = role === 'admin' ? 'Detail Cuti' : '404';
              breadcrumbNameMap[`/data_pns${params1}`] = role === 'admin' ? 'Detail PNS' : '404';

              breadcrumbNameMap[`/riwayat_cuti_tahunan${params1}`] = role === 'user' ? 'Detail Cuti' : '404';
              breadcrumbNameMap[`/riwayat_cuti_besar${params1}`] = role === 'user' ? 'Detail Cuti' : '404';
              breadcrumbNameMap[`/riwayat_cuti_sakit${params1}`] = role === 'user' ? 'Detail Cuti' : '404';
              breadcrumbNameMap[`/riwayat_cuti_bersalin${params1}`] = role === 'user' ? 'Detail Cuti' : '404';
              breadcrumbNameMap[`/riwayat_cap${params1}`] = role === 'user' ? 'Detail Cuti' : '404';
              breadcrumbNameMap[`/riwayat_cltn${params1}`] = role === 'user' ? 'Detail Cuti' : '404';

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
