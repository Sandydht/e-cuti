import React from 'react';

// Redux
import { connect } from 'react-redux';

// Molecules
import TabelRiwayatCuti from '../../molecules/TabelRiwayatCuti';

const RiwayatCAP = ({ nip }) => {
  return <TabelRiwayatCuti
    nip={nip}
    jenisCuti='Cuti Alasan Penting'
    title='Riwayat Cuti Alasan Penting'
  />;
};

const mapStateToProps = ({ session }) => ({
  nip: session.user.nip
});

export default connect(mapStateToProps)(RiwayatCAP);
