import React, { Component } from 'react';

// Material UI
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

// Material icons
import FindInPageIcon from '@material-ui/icons/FindInPage';

// React router dom
import {
  NavLink
} from 'react-router-dom';

// Atoms
import DataTable from '../../atoms/DataTable';

// Firebase
import firebase from '../../config/firebase';

// Molecules
import TambahDataPNS from '../../molecules/TambahDataPNS';

class DataPNS extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: []
    };

    this.subscribe = false;
  }

  dataPNS = (data) => {
    this.setState({
      isLoading: false,
      data
    });
  };

  componentDidMount() {
    this.subscribe = true;
    return firebase
      .firestore()
      .collection('pns')
      .onSnapshot(querySnapshot => {
        let data = [];
        querySnapshot.forEach(doc => {
          data.push({
            pnsId: doc.id,
            nip: doc.data().nip,
            nik: doc.data().nik,
            nama: doc.data().nama,
            golongan: doc.data().golongan,
            unitKerja: doc.data().unitKerja,
            noTelp: doc.data().noTelp
          });
        });

        if (this.subscribe) {
          this.dataPNS(data);
        }
      }, () => {
        this.setState({
          isLoading: false,
          data: []
        });
      });
  }

  componentWillUnmount() {
    this.subscribe = false;
  }

  render() {
    const { isLoading, data } = this.state;

    return (
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <TambahDataPNS />
        </Grid>
        <Grid item xs={12} md={12}>
          <DataTable
            title='Data PNS'
            isLoading={isLoading}
            data={data}
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
                label: "NIk",
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
                name: "Detail",
                options: {
                  filter: false,
                  sort: false,
                  empty: true,
                  customBodyRenderLite: (dataIndex) => {
                    return (
                      <Button
                        color='primary'
                        variant='contained'
                        size='small'
                        startIcon={<FindInPageIcon />}
                        component={NavLink}
                        to={`/data_pns/${data[dataIndex].pnsId}`}
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
