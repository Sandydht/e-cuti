import React from 'react';

// Redux
import { connect } from 'react-redux';

// Molecules
import TabelRiwayatCuti from '../../molecules/TabelRiwayatCuti';

const RiwayatCAP = ({ uid }) => {
  return <TabelRiwayatCuti
    uid={uid}
    jenisCuti='Cuti Alasan Penting'
    title='Riwayat Cuti Alasan Penting'
    to='/riwayat_cap'
  />;
};

const mapStateToProps = ({ session }) => ({
  uid: session.user.uid
});

export default connect(mapStateToProps)(RiwayatCAP);
