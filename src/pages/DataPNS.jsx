import React, { Component } from 'react';

// Material UI
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PageviewIcon from '@material-ui/icons/Pageview';

// Organisms
import DataTable from "../molecules/DataTable";
import TambahDataPNS from "../molecules/TambahDataPNS";

// Firebase
import { pns } from "../api/Firebase";

class DataPNS extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataPNS: [],
      isLoading: true,
      openDialog: false
    };
  }

  UNSAFE_componentWillMount() {
    pns.onSnapshot((querySnapshot) => {
      let data = [];
      querySnapshot.forEach(doc => {
        data.push({
          id: doc.id,
          data: doc.data()
        });
      });

      this.setState({
        isLoading: false,
        dataPNS: data
      });
    });
  };

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
    const { dataPNS, isLoading, openDialog } = this.state;

    return (
      <Grid container spacing={1}>
        <Grid item xs={12} md={12}>
          <TambahDataPNS open={openDialog} onClose={this.handleCloseDialog} />

          <Button startIcon={<PersonAddIcon />} color="primary" variant="contained" onClick={this.handleOpenDialog} >Tambah Data PNS</Button>
        </Grid>
        <Grid item xs={12} md={12}>
          <DataTable
            title="Data PNS"
            isLoading={isLoading}
            data={dataPNS}
            columns={[
              {
                name: "data.nip",
                label: "NIP",
                options: {
                  filter: true,
                  sort: false,
                }
              },
              {
                name: "data.nik",
                label: "NIK",
                options: {
                  filter: true,
                  sort: false,
                }
              },
              {
                name: "data.nama",
                label: "Nama",
                options: {
                  filter: true,
                  sort: false,
                }
              },
              {
                name: "data.golongan",
                label: "Golongan",
                options: {
                  filter: true,
                  sort: false,
                }
              },
              {
                name: "data.unitKerja",
                label: "Unit Kerja",
                options: {
                  filter: true,
                  sort: false,
                }
              },
              {
                name: "detailPNS",
                label: "Detail PNS",
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
                        onClick={() => {
                          this.props.history.push(`/beranda/data_pns/${dataPNS[dataIndex].id}`);
                        }}>Detail</Button>
                    );
                  }
                }
              }
            ]}
          />
        </Grid>
      </Grid>
    );
  }
}
export default DataPNS; 