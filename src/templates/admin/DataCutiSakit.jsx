import React, { Component } from 'react';
import Axios from "axios";

// Material UI
import Button from "@material-ui/core/Button";

// Icons
import FindInPageIcon from '@material-ui/icons/FindInPage';

// Atoms
import DataTable from "../../atoms/DataTable";

// React router dom
import { NavLink } from "react-router-dom";

class DataCutiSakit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: []
    };

    this.__subscribe = false;
  }

  dataCuti = (data) => {
    this.setState({
      isLoading: false,
      data
    });
  };

  componentDidMount() {
    this.__subscribe = true;
    Axios.get("/dataCutiSakit")
      .then(res => {
        if (this.__subscribe) {
          this.dataCuti(res.data);
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
    const { data, isLoading } = this.state;

    return (
      <DataTable
        title="Data Cuti Sakit"
        isLoading={isLoading}
        data={data}
        columns={[
          {
            name: "nip",
            label: "NIP",
            options: {
              filter: true,
              sort: false
            }
          },
          {
            name: "nama",
            label: "Nama",
            options: {
              filter: true,
              sort: false
            }
          },
          {
            name: "golongan",
            label: "Golongan",
            options: {
              filter: true,
              sort: false
            }
          },
          {
            name: "jenisCuti",
            label: "Jenis Cuti",
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
                    to={`/beranda/${data[dataIndex].cutiId}`}
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

export default DataCutiSakit;
