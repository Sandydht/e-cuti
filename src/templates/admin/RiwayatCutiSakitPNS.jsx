import React, { Component } from 'react';

// Molecules
import TabelRiwayatCutiPNS from '../../molecules/TabelRiwayatCutiPNS';

class RiwayatCutiSakitPNS extends Component {
  render() {
    const { ...rest } = this.props;
    return (
      <TabelRiwayatCutiPNS
        {...rest}
        title='Riwayat Cuti Sakit'
        jenisCuti='Cuti Sakit'
        to='/data_cuti_sakit'
      />
    );
  }
}

export default RiwayatCutiSakitPNS;
