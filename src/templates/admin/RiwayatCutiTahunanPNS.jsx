import React, { Component } from 'react';

// Molecules
import TabelRiwayatCutiPNS from '../../molecules/TabelRiwayatCutiPNS';

class RiwayatCutiTahunanPNS extends Component {
  render() {
    const { ...rest } = this.props;
    return (
      <TabelRiwayatCutiPNS
        {...rest}
        title='Riwayat Cuti Tahunan'
        jenisCuti='Cuti Tahunan'
        to='/data_cuti_tahunan'
      />
    );
  }
}

export default RiwayatCutiTahunanPNS;
