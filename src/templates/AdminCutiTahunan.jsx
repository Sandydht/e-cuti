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
  }

  UNSAFE_componentWillMount() {
    pns.onSnapshot((querySnapshot) => {
      let data = [];
      querySnapshot.forEach(doc => {
        data.push(doc.data());
      });

      this.setState({
        isLoading: false,
        dataPNS: data
      });
    });
  };

  render() {
    const { dataPNS, isLoading } = this.state;

    return (

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
            name: "riwayatCuti",
            label: "Riwayat Cuti",
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
                      this.props.history.push(`/beranda/cuti_tahunan/${dataPNS[dataIndex].nip}`);
                    }}>Riwayat Cuti</Button>
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