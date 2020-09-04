import React, { Component } from 'react';

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

// Redux
import { connect } from "react-redux";
import { getAllDataPNS } from "../../redux/actions/pnsAction";

import Axios from "axios";

class DataPNS extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataPNS: [],
      isLoading: true
    };
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    Axios
      .get("/dataPNS")
      .then(res => {
        if (this._isMounted) {
          this.setState({
            isLoading: false,
            dataPNS: res.data
          });
        }
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { match } = this.props;
    const { dataPNS, isLoading } = this.state;
    return (
      <Grid container spacing={2}>
        <Grid item md={12} xs={12}>
          <Button color="primary" variant="contained" startIcon={<PersonAddIcon />}>Tambah Data PNS</Button>
        </Grid>
        <Grid item md={12} xs={12}>
          <DataTable
            title="Data PNS"
            isLoading={isLoading}
            data={dataPNS}
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
                name: "unitKerja",
                label: "Unit Kerja",
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
                        to={`${match.url}/${dataPNS[dataIndex].pnsId}`}
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

const mapStateToProps = (state) => ({
  isLoading: state.pns.isLoading,
  dataPNS: state.pns.dataPNS
});

const mapDispatchToProps = (dispatch) => ({
  getAllDataPNS: () => dispatch(getAllDataPNS())
});

export default connect(mapStateToProps, mapDispatchToProps)(DataPNS);
