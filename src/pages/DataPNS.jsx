import React, { Component } from 'react';

// Material UI
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PageviewIcon from '@material-ui/icons/Pageview';

// Templates
import DataTable from "../templates/DataTable";
import TambahDataPNS from "../templates/TambahDataPNS";

// Firebase
import firebase from "../api/Firebase";

// React router dom
import { NavLink } from "react-router-dom";

class DataPNS extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataPNS: [],
      isLoading: true,
      openDialog: false
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection("pns");
    ref
      .onSnapshot((querySnapshot) => {
        let data = [];
        querySnapshot.forEach(doc => data.push(doc.data()));
        this.setState({
          dataPNS: data,
          isLoading: false
        });
      });
  }

  componentWillUnmount() {
    firebase.firestore().collection("pns");
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
                      <Button startIcon={<PageviewIcon />} color="primary" variant="contained" size="small" component={NavLink} to={`/beranda/data_pns/${dataIndex}`}>Detail</Button>
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