import React, { Component } from 'react';

// Material UI
import Card from "@material-ui/core/Card";
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Button from "@material-ui/core/Button";

// Icons
import FindInPageIcon from '@material-ui/icons/FindInPage';

// Atoms
import DataTable from "../../atoms/DataTable";

const data = [
  ["123456789012345678", "2020-03-02", "Cuti Tahunan", "2020-03-02", "2020-03-02", "Menunggu"]
];

class AdminHome extends Component {
  render() {
    return (
      <Card>
        <CardHeader title="Admin Dashboard" />
        <Divider />
        <CardContent>
          <DataTable
            title="Data Pengajuan Cuti"
            data={data}
            columns={[
              {
                name: "NIP",
                options: {
                  filter: true,
                  sort: false
                }
              },
              {
                name: "Tanggal Pengajuan",
                options: {
                  filter: true,
                  sort: false
                }
              },
              {
                name: "Jenis Cuti",
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
                name: "Status Persetujuan",
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
                      <Button color="primary" variant="contained" size="small" startIcon={<FindInPageIcon />} >Detail</Button>
                    );
                  }
                }
              },
            ]}
          />
        </CardContent>
      </Card>
    );
  }
}

export default AdminHome;
