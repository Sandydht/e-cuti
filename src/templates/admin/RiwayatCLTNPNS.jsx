import React, { Component } from 'react';

// Molecules
import TabelRiwayatCutiPNS from '../../molecules/TabelRiwayatCutiPNS';

class RiwayatCLTNPNS extends Component {
  render() {
    const { ...rest } = this.props;
    return (
      <TabelRiwayatCutiPNS
        {...rest}
        title='Riwayat Cuti Luar Tanggungan Negara'
        jenisCuti='Cuti Luar Tanggungan Negara'
        to='/data_cltn'
      />
    );
  }
}

export default RiwayatCLTNPNS;
