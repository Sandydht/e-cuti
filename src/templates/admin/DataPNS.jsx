import React, { Component } from 'react';
import Axios from "axios";

// Material UI
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

// Icons
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import FindInPageIcon from '@material-ui/icons/FindInPage';

// Atoms
import DataTable from "../../atoms/DataTable";

// React router dom
import { NavLink } from "react-router-dom";

class DataPNS extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: true
    };
    this.__subscribe = false;
  }

  dataPNS = (data) => {
    this.setState({
      data,
      isLoading: false
    });
  };

  componentDidMount() {
    this.__subscribe = true;
    Axios.get("/dataPNS")
      .then(res => {
        if (this.__subscribe) {
          this.dataPNS(res.data);
        }
      });
  }

  componentWillUnmount() {
    this.__subscribe = false;
  }

  render() {
    const { match } = this.props;
    const { data, isLoading } = this.state;
    return (
      <Grid container spacing={2}>
        <Grid item md={12} xs={12}>
          <Button color="primary" variant="contained" startIcon={<PersonAddIcon />} component={NavLink} to="/tambah_data_pns" >Tambah Data PNS</Button>
        </Grid>
        <Grid item md={12} xs={12}>
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
                        to={`${match.url}/${data[dataIndex].pnsId}`}
                      >Detail</Button>
                    );
                  }
                }
              },
            ]}
          />
        </Grid>
      </Grid>
    );
  }
}

export default DataPNS;
