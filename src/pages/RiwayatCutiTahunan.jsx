import React, { Component, Fragment } from 'react';

// Material UI
import Button from "@material-ui/core/Button";
import PageviewIcon from '@material-ui/icons/Pageview';

// Molecules
import DataTable from "../atoms/DataTable";

// Firebase
import { pns, cuti } from "../api/Firebase";

class RiwayatCutiTahunan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataCuti: [],
      isLoading: true,
      nama: ""
    };
  }

  UNSAFE_componentWillMount() {
    const { match } = this.props;
    pns
      .where("nip", "==", match.params.id)
      .onSnapshot((pnsSnapshot) => {
        pnsSnapshot.forEach(doc => console.log(doc.data()));
      });
  }

  render() {
    const { isLoading, dataCuti, nama } = this.state;

    return (
      <Fragment>
        <DataTable
          title={`Riwayat Cuti Tahunan: ${nama}`}
          isLoading={isLoading}
          data={dataCuti}
          columns={[
            {
              name: "data.tglPengajuan",
              label: "Tanggal Pengajuan",
              options: {
                filter: true,
                sort: false,
              }
            },
            {
              name: "data.tglMulai",
              label: "Tanggal Mulai",
              options: {
                filter: true,
                sort: false,
              }
            },
            {
              name: "data.tglSelesai",
              label: "s.d Tanggal",
              options: {
                filter: true,
                sort: false,
              }
            },
            {
              name: "data.lamaCuti",
              label: "Lama Cuti",
              options: {
                filter: true,
                sort: false,
              }
            },
            {
              name: "data.status",
              label: "Status Persetujuan",
              options: {
                filter: true,
                sort: false,
              }
            },
            {
              name: "detailCuti",
              label: "Detail Cuti",
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
                        this.props.history.push(`/beranda/cuti_tahunan/${dataCuti[dataIndex].id}/detail`);
                      }}
                    >Detail</Button>
                  );
                }
              }
            }
          ]}
        />
      </Fragment>
    );
  }
}

export default RiwayatCutiTahunan;