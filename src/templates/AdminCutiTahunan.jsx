import React, { Component } from 'react';

// Material UI
import Button from "@material-ui/core/Button";
import PageviewIcon from '@material-ui/icons/Pageview';

// Organisms
import DataTable from "../molecules/DataTable";

// Firebase
import { pns } from "../api/Firebase";

class DataPNS extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataPNS: [],
      isLoading: true
    };

    this.unsubscribe = null;
  }

  collectionOnSnapshot = (querySnapshot) => {
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
  };

  UNSAFE_componentWillMount() {
    this.unsubscribe = pns.onSnapshot(this.collectionOnSnapshot);
  };

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { dataPNS, isLoading } = this.state;

    return (

      <DataTable
        title="Data Pengajuan Cuti Tahunan PNS"
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
                    onClick={() => {
                      this.props.history.push(`/beranda/cuti_tahunan/${dataPNS[dataIndex].id}`);
                    }}>Detail</Button>
                );
              }
            }
          }
        ]}
      />
    );
  }
}
export default DataPNS; 