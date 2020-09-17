import React from 'react';

// Redux
import { connect } from 'react-redux';

// Molecules
import TabelRiwayatCuti from '../../molecules/TabelRiwayatCuti';

const RiwayatCutiBesar = ({ nip }) => {
  return <TabelRiwayatCuti
    nip={nip}
    jenisCuti='Cuti Besar'
    title='Riwayat Cuti Besar'
  />;
};

const mapStateToProps = ({ session }) => ({
  nip: session.user.nip
});

export default connect(mapStateToProps)(RiwayatCutiBesar);
