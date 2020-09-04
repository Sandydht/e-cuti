import React, { Component, Fragment } from 'react';

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
import DeleteIcon from '@material-ui/icons/Delete';

// Redux
import { connect } from "react-redux";
import { getDetailPNS } from "../../redux/actions/pnsAction";

import Axios from "axios";

class DetailPNS extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailPNS: {},
      isLoading: true
    };
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    const { match } = this.props;
    Axios.get(`/dataPNS/${match.params.pnsId}`)
      .then((res) => {
        if (this._isMounted) {
          this.setState({
            detailPNS: res.data,
            isLoading: false
          });
        }
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { match } = this.props;
    const { detailPNS, isLoading } = this.state;
    return (
      <Card>
        <CardHeader title="Detail PNS" />
        <Divider />
        <CardContent>
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
                <TextField
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  label="NIP"
                  value={detailPNS.nip}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  label="Nama"
                  value={detailPNS.nama}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  label="Golongan"
                  value={detailPNS.golongan}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  label="Unit Kerja"
                  value={detailPNS.unitKerja}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  label="Nomor Telepon"
                  value={detailPNS.noTelp}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  label="Status Registrasi"
                  value={detailPNS.registrasi ? "Teregistrasi" : "Belum Teregistrasi"}
                  InputProps={{
                    readOnly: true,
                  }}
                />

                <Box mt={2}>
                  <Grid container spacing={2} justify="flex-end">
                    <Grid item>
                      <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<DeleteIcon />}
                      >Hapus</Button>
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
              </Fragment>
            )}
        </CardContent>
      </Card>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.pns.isLoading,
  detailPNS: state.pns.detailPNS
});

const mapDispatchToProps = (dispatch) => ({
  getDetailPNS: (pnsId) => dispatch(getDetailPNS(pnsId))
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailPNS);
