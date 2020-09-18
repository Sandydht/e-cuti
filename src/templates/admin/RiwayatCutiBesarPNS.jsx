import React, { Component } from 'react';

// Molecules
import TabelRiwayatCutiPNS from '../../molecules/TabelRiwayatCutiPNS';

class RiwayatCutiBesarPNS extends Component {
  render() {
    const { ...rest } = this.props;
    return (
      <TabelRiwayatCutiPNS
        {...rest}
        title='Riwayat Cuti Besar'
        jenisCuti='Cuti Besar'
        to='/data_cuti_besar'
      />
    );
  }
}

export default RiwayatCutiBesarPNS;
