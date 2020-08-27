import React, { Component } from 'react';

// Material UI
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PageviewIcon from '@material-ui/icons/Pageview';

// React router dom
import { NavLink } from "react-router-dom";

// Molecules
import TabelDataPNS from "../../molecules/TabelDataPNS";

class DataPNS extends Component {
  render() {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Button startIcon={<PersonAddIcon />} color="primary" variant="contained" component={NavLink} to="/tambah_data_pns" >Tambah Data PNS</Button>
        </Grid>
        <Grid item xs={12} md={12}>
          <TabelDataPNS
            title="Data PNS"
            columns={[
              {
                name: "nip",
                label: "NIP",
                options: {
                  filter: true,
                  sort: false,
                }
              },
              {
                name: "nik",
                label: "NIK",
                options: {
                  filter: true,
                  sort: false,
                }
              },
              {
                name: "nama",
                label: "Nama",
                options: {
                  filter: true,
                  sort: false,
                }
              },
              {
                name: "golongan",
                label: "Golongan",
                options: {
                  filter: true,
                  sort: false,
                }
              },
              {
                name: "unitKerja",
                label: "Unit Kerja",
                options: {
                  filter: true,
                  sort: false,
                }
              },
              {
                name: "detail",
                label: "Detail",
                options: {
                  filter: true,
                  sort: false,
                  customBodyRenderLite: (dataIndex) => {
                    return (
                      <Button
                        startIcon={<PageviewIcon />}
                        color="primary"
                        variant="contained"
                        size="small"
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