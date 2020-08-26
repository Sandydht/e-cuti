import React, { Component } from 'react';

// Material UI
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import PersonAddIcon from '@material-ui/icons/PersonAdd';

// React router dom
import { NavLink } from "react-router-dom";

// Molecules
import TabelDataPNS from "../molecules/TabelDataPNS";

class DataPNS extends Component {
  render() {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Button startIcon={<PersonAddIcon />} color="primary" variant="contained" component={NavLink} to="/tambah_data_pns" >Tambah Data PNS</Button>
        </Grid>
        <Grid item xs={12} md={12}>
          <TabelDataPNS />
        </Grid>
      </Grid>
    );
  }
}
export default DataPNS; 