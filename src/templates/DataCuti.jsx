import React, { Component, Fragment } from 'react';

// Material UI
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import PageviewIcon from '@material-ui/icons/Pageview';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

// // Atoms
// import TabelDataUser from "../molecules/TabelDataUser";

// Atoms
import DataTable from "../atoms/DataTable";

import firebase from "../api/Firebase";

class DataCuti extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: []
    };

    this.pns = firebase.firestore().collection("pns");
    this.cuti = firebase.firestore().collection("cuti");
  }

  UNSAFE_componentWillMount() {
    this.pns
      .where("nip", "==", "123456789012345611")
      .get()
      .then((querySnapshot) => {
        let nip;
        let dataPNS;
        let dataCuti;
        let data = [];
        querySnapshot.forEach(doc => {
          nip = doc.data().nip;
          dataPNS = doc.data();
        });
        this
          .cuti
          .where("nip", "==", nip)
          .where("status", "==", "Menunggu")
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach(doc => {
              dataCuti = doc.data();
            });
            console.log("Data PNS: ", dataPNS);
            console.log("Data Cuti: ", dataCuti);
            delete dataPNS.nik;
            delete dataPNS.uid;
            delete dataPNS.role;
            const infoCuti = Object.assign({}, dataPNS, dataCuti);
            data.push(infoCuti);
            console.log('Merger ', infoCuti);
            console.log("Data ", data);
            this.setState({
              isLoading: false,
              data
            });
          });
      });


  }

  render() {
    const { data, isLoading } = this.state;

    return (
      <DataTable
        isLoading={isLoading}
        data={data}
        columns={[
          {
            name: "tglPengajuan",
            label: "Tanggal Pengajuan",
            options: {
              filter: true,
              sort: false,
            }
          },
          {
            name: "nip",
            label: "NIP",
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
            name: "status",
            label: "Status Persetujuan",
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
                  >Detail</Button>
                );
              }
            }
          },
          {
            name: "setuju",
            label: "Setujui",
            options: {
              filter: true,
              sort: false,
              customBodyRenderLite: (dataIndex) => {
                return (
                  <IconButton>
                    <PageviewIcon />
                  </IconButton>
                );
              }
            }
          },
          {
            name: "tolak",
            label: "Tolak",
            options: {
              filter: true,
              sort: false,
              customBodyRenderLite: (dataIndex) => {
                return (
                  <IconButton>
                    <PageviewIcon />
                  </IconButton>
                );
              }
            }
          },
        ]}
      />
    );
  }
}
export default DataCuti;  