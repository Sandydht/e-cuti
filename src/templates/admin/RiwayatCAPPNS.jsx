import React, { Component } from 'react';

// Molecules
import TabelRiwayatCutiPNS from '../../molecules/TabelRiwayatCutiPNS';

class RiwayatCAPPNS extends Component {
  render() {
    const { ...rest } = this.props;
    return (
      <TabelRiwayatCutiPNS
        {...rest}
        title='Riwayat Cuti Alasan Penting'
        jenisCuti='Cuti Alasan Penting'
        to='/data_cap'
      />
    );
  }
}

export default RiwayatCAPPNS;
