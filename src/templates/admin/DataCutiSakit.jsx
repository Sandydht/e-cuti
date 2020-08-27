import React, { Component } from 'react';

// Material UI
import Button from "@material-ui/core/Button";
import PageviewIcon from '@material-ui/icons/Pageview';

// React router dom
import { NavLink } from "react-router-dom";

// Molecules
import TabelDataPNS from "../../molecules/TabelDataPNS";

class DataCutiSakit extends Component {
  render() {
    return (
      <TabelDataPNS
        title="Cuti Sakit PNS"
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
                    component={NavLink}
                    to={`/data_cuti_sakit/${dataIndex}`}
                  >Riwayat</Button>
                );
              }
            }
          },
        ]}
      />
    );
  }
}

export default DataCutiSakit; 