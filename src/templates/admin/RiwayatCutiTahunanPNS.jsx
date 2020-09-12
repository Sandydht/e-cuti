import React, { Component } from 'react';
import Axios from "axios";

// React router dom
import { NavLink } from "react-router-dom";

// Material UI
import Button from "@material-ui/core/Button";

// Icons
import FindInPageIcon from '@material-ui/icons/FindInPage';

// Atoms
import DataTable from "../../atoms/DataTable";

class RiwayatCutiTahunanPNS extends Component {
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

    Axios.get(`/riwayatCutiPNS/${this.props.match.params.nip}`)
      .then(res => {
        if (this.__subscribe) {
          this.riwayatCuti(res.data);
        }
      })
      .catch(() => this.setState({
        isLoading: false,
        data: []
      }));
  }

  componentWillUnmount() {
    this.__subscribe = false;
  }

  render() {
    const { match } = this.props;
    const { data, isLoading } = this.state;

    return (
      <DataTable
        title={`Riwayat Cuti Tahunan : ${this.props.match.params.nip}`}
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
                    component={NavLink}
                    to={`${match.url}/${data[dataIndex].cutiId}`}
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

export default RiwayatCutiTahunanPNS;
