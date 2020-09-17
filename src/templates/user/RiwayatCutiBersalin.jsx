import React from 'react';

// Redux
import { connect } from 'react-redux';

// Molecules
import TabelRiwayatCuti from '../../molecules/TabelRiwayatCuti';

const RiwayatCutiBersalin = ({ uid }) => {
  return <TabelRiwayatCuti
    uid={uid}
    jenisCuti='Cuti Bersalin'
    title='Riwayat Cuti Bersalin'
    to='/riwayat_cuti_bersalin'
  />;
};

const mapStateToProps = ({ session }) => ({
  uid: session.user.uid
});

export default connect(mapStateToProps)(RiwayatCutiBersalin);
