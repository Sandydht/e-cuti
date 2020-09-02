import React, { Component } from 'react';

// Material UI
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

// Icons
import PersonAddIcon from '@material-ui/icons/PersonAdd';

class DataPNS extends Component {
  render() {
    return (
      <Grid container spacing={2}>
        <Grid item md={12} xs={12}>
          <Button color="primary" variant="contained" startIcon={<PersonAddIcon />}>Tambah Data PNS</Button>
        </Grid>
        <Grid item md={12} xs={12}>
          Data tabel
        </Grid>
      </Grid>
    );
  }
}

export default DataPNS;
