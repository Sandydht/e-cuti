import React, { Component } from 'react';

// Molecules
import TabelDataRiwayatCutiPNS from "../molecules/TabelDataRiwayatCutiPNS";

// Material UI
import Button from "@material-ui/core/Button";
import PageviewIcon from '@material-ui/icons/Pageview';

// React router dom
import { NavLink } from "react-router-dom";

class RiwayatCuti extends Component {
  render() {
    const { ...rest } = this.props;

    return (
      <TabelDataRiwayatCutiPNS
        {...rest}
        jenisCuti="Cuti Tahunan"
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
            name: "tglMulai",
            label: "Tanggal Mulai",
            options: {
              filter: true,
              sort: false,
            }
          },
          {
            name: "tglSelesai",
            label: "s/d Tanggal",
            options: {
              filter: true,
              sort: false,
            }
          },
          {
            name: "lamaCuti",
            label: "Lama Cuti",
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
          }
        ]}
      />
    );
  }
}
export default RiwayatCuti; 