import React from 'react';

// Redux
import { connect } from 'react-redux';

// Molecules
import TabelRiwayatCuti from '../../molecules/TabelRiwayatCuti';

const RiwayatCLTN = ({ uid }) => {
  return <TabelRiwayatCuti
    uid={uid}
    jenisCuti='Cuti Luar Tanggungan Negara'
    title='Riwayat CLTN'
    to='/riwayat_cltn'
  />;
};

const mapStateToProps = ({ session }) => ({
  uid: session.user.uid
});

export default connect(mapStateToProps)(RiwayatCLTN);
