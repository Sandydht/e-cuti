import React from 'react';

// Redux
import { connect } from 'react-redux';

// Molecules
import TabelRiwayatCuti from '../../molecules/TabelRiwayatCuti';

const RiwayatCutiBesar = ({ uid }) => {
  return <TabelRiwayatCuti
    uid={uid}
    jenisCuti='Cuti Besar'
    title='Riwayat Cuti Besar'
    to='/riwayat_cuti_besar'
  />;
};

const mapStateToProps = ({ session }) => ({
  uid: session.user.uid
});

export default connect(mapStateToProps)(RiwayatCutiBesar);
