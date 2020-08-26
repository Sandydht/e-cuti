import React, { Component } from 'react';

// Molecules
import TabelDataRiwayatCutiPNS from "../molecules/TabelDataRiwayatCutiPNS";

class RiwayatCuti extends Component {
  render() {
    const { ...rest } = this.props;

    return (
      <TabelDataRiwayatCutiPNS
        {...rest}
        jenisCuti="Cuti Tahunan"
      />
    );
  }
}
export default RiwayatCuti; 