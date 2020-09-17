import React from 'react';

// Redux
import { connect } from 'react-redux';

// Molecules
import TabelRiwayatCuti from '../../molecules/TabelRiwayatCuti';

const RiwayatCutiSakit = ({ nip }) => {
  return <TabelRiwayatCuti
    nip={nip}
    jenisCuti='Cuti Sakit'
    title='Riwayat Cuti Sakit'
  />;
};

const mapStateToProps = ({ session }) => ({
  nip: session.user.nip
});

export default connect(mapStateToProps)(RiwayatCutiSakit);
