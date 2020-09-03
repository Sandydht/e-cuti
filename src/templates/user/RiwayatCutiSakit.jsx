import React, { Component } from 'react';


// React router dom
import { NavLink } from "react-router-dom";

// Material UI
import Button from "@material-ui/core/Button";

// Icons
import FindInPageIcon from '@material-ui/icons/FindInPage';

// Atoms
import DataTable from "../../atoms/DataTable";

const data = [
  ["04-09-2020", "3 hari", "05-09-2020", "07-09-2020"]
];

class RiwayatCutiSakit extends Component {
  render() {
    const { match } = this.props;
    return (
      <DataTable
        title="Riwayat Cuti Sakit"
        data={data}
        columns={[
          {
            name: "Tanggal Pengajuan",
            options: {
              filter: true,
              sort: false
            }
          },
          {
            name: "Lama Cuti",
            options: {
              filter: true,
              sort: false
            }
          },
          {
            name: "Tanggal Mulai",
            options: {
              filter: true,
              sort: false
            }
          },
          {
            name: "s/d Tanggal",
            options: {
              filter: true,
              sort: false
            }
          },
          {
            name: "Detail",
            options: {
              filter: true,
              sort: false,
              customBodyRenderLite: (dataIndex) => {
                return (
                  <Button
                    color="primary"
                    variant="contained"
                    size="small"
                    startIcon={<FindInPageIcon />}
                    component={NavLink}
                    to={`${match.url}/${dataIndex}`}
                  >Detail</Button>
                );
              }
            }
          },
        ]}
      />
    );
  }
}

export default RiwayatCutiSakit;
