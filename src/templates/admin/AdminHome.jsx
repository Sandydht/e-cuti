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
  ["123456789012345678", "Sandy Dwi Handoko Trapsilo", "Pembina Utama (IV/e)", "Cuti Tahunan", "Menunggu"]
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
                name: "Nama",
                options: {
                  filter: true,
                  sort: false
                }
              },
              {
                name: "Golongan",
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
                      <Button
                        color="primary"
                        variant="contained"
                        size="small"
                        startIcon={<FindInPageIcon />}
                      >Detail</Button>
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
