import React, { Component } from 'react';

// Material UI
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

// Icons
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import FindInPageIcon from '@material-ui/icons/FindInPage';

// Atoms
import DataTable from "../../atoms/DataTable";

// React router dom
import { NavLink } from "react-router-dom";

const data = [
  ["123456789012345678", "Sandy Dwi Handoko Trapsilo", "Pembina Utama (IV/e)", "Badan Kepegawaian Daerah"]
];

class DataPNS extends Component {
  render() {
    return (
      <Grid container spacing={2}>
        <Grid item md={12} xs={12}>
          <Button color="primary" variant="contained" startIcon={<PersonAddIcon />}>Tambah Data PNS</Button>
        </Grid>
        <Grid item md={12} xs={12}>
          <DataTable
            title="Data PNS"
            data={data}
            columns={[
              {
                name: "NIP",
                options: {
                  filter: true,
                  sort: false
                }
              },
              {
                name: "Nama",
                options: {
                  filter: true,
                  sort: false
                }
              },
              {
                name: "Golongan",
                options: {
                  filter: true,
                  sort: false
                }
              },
              {
                name: "Unit Kerja",
                options: {
                  filter: true,
                  sort: false
                }
              },
              {
                name: "Detail",
                options: {
                  filter: true,
                  sort: false,
                  customBodyRenderLite: (dataIndex) => {
                    return (
                      <Button
                        color="primary"
                        variant="contained"
                        size="small"
                        startIcon={<FindInPageIcon />}
                        component={NavLink}
                        to={`/data_pns/${dataIndex}`}
                      >Detail</Button>
                    );
                  }
                }
              },
            ]}
          />
        </Grid>
      </Grid>
    );
  }
}

export default DataPNS;
