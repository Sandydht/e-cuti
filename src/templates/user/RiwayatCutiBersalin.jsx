import React from 'react';

// Redux
import { connect } from 'react-redux';

// Molecules
import TabelRiwayatCuti from '../../molecules/TabelRiwayatCuti';

const RiwayatCutiBersalin = ({ nip }) => {
  return <TabelRiwayatCuti
    nip={nip}
    jenisCuti='Cuti Bersalin'
    title='Riwayat Cuti Bersalin'
  />;
};

const mapStateToProps = ({ session }) => ({
  nip: session.user.nip
});

export default connect(mapStateToProps)(RiwayatCutiBersalin);
