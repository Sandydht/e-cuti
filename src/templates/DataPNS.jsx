import React, { Component } from 'react';

// Material UI
import Grid from "@material-ui/core/Grid";

// Molecules
import TambahDataPNS from "../molecules/TambahDataPNS";

import DataTable from "../atoms/DataTable";

class DataPNS extends Component {
  render() {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <TambahDataPNS />
        </Grid>
        <Grid item xs={12} md={12}>
          <DataTable />
        </Grid>
      </Grid>
    );
  }
}
export default DataPNS; 