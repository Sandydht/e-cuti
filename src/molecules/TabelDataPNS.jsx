import React, { Component } from 'react';

// Material UI
import Button from "@material-ui/core/Button";
import PageviewIcon from '@material-ui/icons/Pageview';

// Atoms
import DataTable from "../atoms/DataTable";

// Firebase
import { pns } from "../api/Firebase";

class TabelDataPNS extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: true
    };
  }

  UNSAFE_componentWillMount() {
    pns
      .onSnapshot((querySnapshot) => {
        let data = [];
        querySnapshot.forEach(doc => {
          data.push({
            id: doc.id,
            data: doc.data()
          });
        });

        this.setState({
          isLoading: false,
          data
        });
      }, () => {
        this.setState({
          isLoading: false
        });
      });
  }

  render() {
    const { data, isLoading } = this.state;

    return (
      <DataTable
        title="Data PNS"
        isLoading={isLoading}
        data={data}
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
                  >
                    Detail
                  </Button>
                );
              }
            }
          }
        ]}
      />
    );
  }
}
export default TabelDataPNS; 