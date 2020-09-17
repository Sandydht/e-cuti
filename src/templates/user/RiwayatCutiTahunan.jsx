import React from 'react';

// Redux
import { connect } from 'react-redux';

// Molecules
import TabelRiwayatCuti from '../../molecules/TabelRiwayatCuti';

const RiwayatCutiTahunan = ({ uid }) => {
  return <TabelRiwayatCuti
    uid={uid}
    jenisCuti='Cuti Tahunan'
    title='Riwayat Cuti Tahunan'
    to='/riwayat_cuti_tahunan'
  />;
};

const mapStateToProps = ({ session }) => ({
  uid: session.user.uid
});

export default connect(mapStateToProps)(RiwayatCutiTahunan);