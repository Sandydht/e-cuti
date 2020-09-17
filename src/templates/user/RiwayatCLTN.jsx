import React from 'react';

// Redux
import { connect } from 'react-redux';

// Molecules
import TabelRiwayatCuti from '../../molecules/TabelRiwayatCuti';

const RiwayatCLTN = ({ nip }) => {
  return <TabelRiwayatCuti
    nip={nip}
    jenisCuti='Cuti Luar Tanggungan Negara'
    title='Riwayat CLTN'
  />;
};

const mapStateToProps = ({ session }) => ({
  nip: session.user.nip
});

export default connect(mapStateToProps)(RiwayatCLTN);
