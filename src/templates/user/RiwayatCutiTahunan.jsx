import React, { Component } from 'react';
import Axios from "axios";

// Material UI
import Button from "@material-ui/core/Button";

// Icons
import FindInPageIcon from '@material-ui/icons/FindInPage';

// React router dom
import { NavLink } from 'react-router-dom';

// Atoms
import DataTable from "../../atoms/DataTable";

class RiwayatCutiTahunan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: []
    };

    this.__subscribe = false;
  }

  riwayatCuti = (data) => {
    this.setState({
      isLoading: false,
      data: data.filter(data => data.jenisCuti === 'Cuti Tahunan')
    });
  };

  componentDidMount() {
    this.__subscribe = true;
    Axios.get('/dataUser')
      .then(res => {
        if (this.__subscribe) {
          this.riwayatCuti(res.data.cuti);
        }
      })
      .catch(() => {
        this.setState({
          isLoading: false,
          data: []
        });
      });
  }

  componentWillUnmount() {
    this.__subscribe = false;
  }

  render() {
    const { isLoading, data } = this.state;

    return (
      <DataTable
        title="Riwayat Cuti Tahunan"
        isLoading={isLoading}
        data={data}
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
            name: "lamaCuti",
            label: "Lama Cuti",
            options: {
              filter: true,
              sort: false
            }
          },
          {
            name: "tglMulai",
            label: "Tanggal Mulai",
            options: {
              filter: true,
              sort: false
            }
          },
          {
            name: "tglSelesai",
            label: "s/d Tanggal",
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
                    to={`/riwayat_cuti_tahunan/${data[dataIndex].cutiId}`}
                  >Detail</Button>
                );
              },
              sortOrder: {
                name: 'tglPengajuan',
                direction: 'desc'
              }
            }
          },
        ]}
      />
    );
  }
}

export default RiwayatCutiTahunan;
