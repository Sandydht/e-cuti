import React, { Component } from 'react';

// Material UI
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import PostAddIcon from '@material-ui/icons/PostAdd';

// Templates
import DataTable from "../templates/DataTable";
import FormPengajuan from "../templates/FormPengajuan";

const columns = ["Tgl Pengajuan", "Tgl Mulai", "Tgl Selesai", "Lama Cuti", "Status Persetujuan", "Detail"];

const data = [
  ["Joe James", "Test Corp", "Yonkers", "NY"],
  ["John Walsh", "Test Corp", "Hartford", "CT"],
  ["Bob Herm", "Test Corp", "Tampa", "FL"],
  ["James Houston", "Test Corp", "Dallas", "TX"],
];

const options = {
  filterType: 'checkbox',
};

class CutiTahunan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDialog: false
    };
  }

  handleOpenDialog = () => {
    this.setState({
      openDialog: true
    });
  };

  handleCloseDialog = () => {
    this.setState({
      openDialog: false
    });
  };

  render() {
    const { openDialog } = this.state;

    return (
      <Grid container spacing={1}>
        <Grid item xs={12} md={12}>
          <FormPengajuan
            open={openDialog}
            onClose={this.handleCloseDialog}
            title="Pengajuan Cuti Tahunan"
          />

          <Button startIcon={<PostAddIcon />} color="primary" variant="contained" onClick={this.handleOpenDialog}>Ajukan Cuti Tahunan</Button>
        </Grid>
        <Grid item xs={12} md={12}>
          <DataTable
            title="Data Cuti Tahunan"
            columns={columns}
            data={data}
            options={options}
          />
        </Grid>
      </Grid>
    );
  }
}

export default CutiTahunan; 