import React, { Component } from 'react';
import Axios from "axios";

// Material UI
import Button from "@material-ui/core/Button";

// Icons
import FindInPageIcon from '@material-ui/icons/FindInPage';

// Atoms
import DataTable from "../../atoms/DataTable";

class RiwayatCLTN extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: [],
      notifikasiId: ''
    };

    this.__subscribe = false;
  }

  riwayatCuti = (data) => {
    this.setState({
      isLoading: false,
      data: data.filter(data => data.jenisCuti === 'Cuti Luar Tanggungan Negara')
    });
  };

  componentDidMount() {
    this.__subscribe = true;
    Axios.get('/dataUser')
      .then(res => {
        if (this.__subscribe) {
          this.riwayatCuti(res.data.cuti);
          this.setState({ notifikasiId: res.data.notifikasi.map(data => data.notifikasiId)[0] });
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
    const { isLoading, data, notifikasiId } = this.state;

    return (
      <DataTable
        title="Riwayat CLTN"
        isLoading={isLoading}
        data={data}
        columns={[
          {
            name: "tglPengajuan",
            label: "Tanggal Pengajuan",
            options: {
              filter: true,
              sort: false
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
                    onClick={() => {
                      Axios.post('/readNotifikasi', { notifikasiId }).then(() => this.props.history.push(`/riwayat_cltn/${data[dataIndex].cutiId}`));
                    }}
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

export default RiwayatCLTN;
