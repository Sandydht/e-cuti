import React, { Component } from 'react';

// Material UI
import Button from "@material-ui/core/Button";
import PageviewIcon from '@material-ui/icons/Pageview';

// React router dom
import { NavLink } from "react-router-dom";

// Redux
import { connect } from "react-redux";

// Molecules
import TabelDataUser from "../molecules/TabelDataUser";
import TabelDataRiwayatCuti from "../molecules/TabelDataRiwayatCuti";

class DataCutiSakit extends Component {
  render() {
    const { role } = this.props;
    return (
      role === "admin" ? (
        <TabelDataUser
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
                      component={NavLink}
                      to={`/data_cuti_tahunan/${dataIndex}`}
                    >Riwayat</Button>
                  );
                }
              }
            },
          ]}
        />
      ) : (
          <TabelDataRiwayatCuti
            title="Riwayat Cuti Sakit"
            jenisCuti="Cuti Sakit"
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
                        component={NavLink}
                        to={`/data_cuti_sakit/${dataIndex}`}
                      >Detail</Button>
                    );
                  }
                }
              }
            ]}
          />
        )
    );
  }
}

const mapStateToProps = ({ session }) => ({
  role: session.user.role
});

export default connect(mapStateToProps, null)(DataCutiSakit); 