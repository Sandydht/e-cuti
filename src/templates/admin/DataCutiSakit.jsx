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
      data: [],
      isLoading: true
    };
    this.__subscribe = false;
  }

  dataPNS = (data) => {
    const user = data.filter(data => data.register).filter(data => data.role === 'user');
    this.setState({
      isLoading: false,
      data: user
    });
  };

  componentDidMount() {
    this.__subscribe = true;
    Axios.get("/dataPNS")
      .then(res => {
        if (this.__subscribe) {
          this.dataPNS(res.data);
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
    const { match } = this.props;
    const { data, isLoading } = this.state;
    return (
      <DataTable
        title="Data PNS"
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
            name: "nik",
            label: "NIK",
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
            name: "Riwayat Cuti",
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
                    to={`${match.url}/${data[dataIndex].nip}`}
                  >Riwayat</Button>
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
