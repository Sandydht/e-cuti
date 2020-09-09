import React, { Component, Fragment } from 'react';
import Axios from "axios";

// React router dom
import { NavLink } from "react-router-dom";

// Material UI
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

// Icons
import EditIcon from '@material-ui/icons/Edit';

import HapusDataPNS from "./HapusDataPNS";

class DetailPNS extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
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
    Axios.get(`/dataPNS/${this.props.match.params.pnsId}`)
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
    const { match, ...rest } = this.props;
    const { data, isLoading } = this.state;
    return (
      <Card>
        {isLoading ? (
          <Box p={10}>
            <Grid container justify="center">
              <Grid item>
                <CircularProgress />
              </Grid>
            </Grid>
          </Box>
        ) : (
            <Fragment>
              <CardHeader title="Detail PNS" />
              <Divider />
              <CardContent>
                <TextField
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  label="NIP"
                  value={data.nip}
                  disabled
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  label="NIK"
                  value={data.nik}
                  disabled
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  label="Nama"
                  value={data.nama}
                  disabled
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  label="Golongan"
                  value={data.golongan}
                  disabled
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  label="Unit Kerja"
                  value={data.unitKerja}
                  disabled
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  label="Nomor Telepon"
                  value={data.noTelp}
                  disabled
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  label="Status Registrasi"
                  value={data.register ? "Teregistrasi" : "Belum Teregistrasi"}
                  disabled
                  InputProps={{
                    readOnly: true,
                  }}
                />

                <Box mt={2}>
                  <Grid container spacing={2} justify="flex-end">
                    <Grid item>
                      <HapusDataPNS
                        disabled={data.register}
                        id={this.props.match.params.pnsId}
                        {...rest}
                      />
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<EditIcon />}
                        component={NavLink}
                        to={`${match.url}/edit`}
                      >Edit</Button>
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
            </Fragment>
          )}
      </Card>
    );
  }
}

export default DetailPNS;
