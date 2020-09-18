import React, { Component } from 'react';

// Molecules
import TabelRiwayatCutiPNS from '../../molecules/TabelRiwayatCutiPNS';

class RiwayatCutiBersalinPNS extends Component {
  render() {
    const { ...rest } = this.props;
    return (
      <TabelRiwayatCutiPNS
        {...rest}
        title='Riwayat Cuti Bersalin'
        jenisCuti='Cuti Bersalin'
        to='/data_cuti_bersalin'
      />
    );
  }
}

export default RiwayatCutiBersalinPNS;
