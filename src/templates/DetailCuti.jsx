import React, { Component, Fragment } from 'react';
import Axios from "axios";

// Material UI
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

// Redux
import { connect } from "react-redux";

// Templates
import Aproval from "./admin/Aproval";
import ProgressPengajuanCuti from "./ProgressPengajuanCuti";

class DetailCuti extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: {}
    };

    this.__subscribe = false;
  }

  detailCuti = (data) => {
    this.setState({
      isLoading: false,
      data
    });
  };

  componentDidMount() {
    this.__subscribe = true;
    Axios.get(`/detailCuti/${this.props.match.params.cutiId}`)
      .then(res => {
        if (this.__subscribe) {
          this.detailCuti(res.data);
        }
      })
      .catch(() => this.setState({ isLoading: false, data: [] }));
  }

  componentWillUnmount() {
    this.__subscribe = false;
  }

  render() {
    const { isLoading, data } = this.state;
    const { role, ...rest } = this.props;

    return (
      <Grid
        container
        spacing={2}
        direction={
          role === "admin" ? "row" : "row-reverse"
        }
      >
        {
          role === "user" &&
          <Grid item xs={12} md={4}>
            <ProgressPengajuanCuti {...rest} />
          </Grid>
        }
        <Grid item xs={12} md={8}>
          <Card>
            {
              isLoading ? (
                <Box p={10}>
                  <Grid container justify="center">
                    <Grid item>
                      <CircularProgress />
                    </Grid>
                  </Grid>
                </Box>
              ) : (
                  <Fragment>
                    <CardHeader title="Detail Cuti" />
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
                        label="Jenis Cuti"
                        value={data.jenisCuti}
                        disabled
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                      <TextField
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        label="Alasan Cuti"
                        value={data.alasanCuti}
                        disabled
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                      <TextField
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        label="Tanggal Pengajuan"
                        value={data.tglPengajuan}
                        disabled
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                      <Box mt={2} mb={1}>
                        <Grid container spacing={3}>
                          <Grid item xs={12} md={6}>
                            <TextField
                              label="Tanggal Mulai"
                              variant="outlined"
                              fullWidth
                              value={data.tglMulai}
                              disabled
                              InputProps={{
                                readOnly: true,
                              }}
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField
                              label="s/d Tanggal"
                              variant="outlined"
                              fullWidth
                              value={data.tglSelesai}
                              disabled
                              InputProps={{
                                readOnly: true,
                              }}
                            />
                          </Grid>
                        </Grid>
                      </Box>
                      <TextField
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        label="Lama Cuti"
                        value={data.lamaCuti}
                        disabled
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                      <TextField
                        label="Alamat Selama Cuti"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        margin="normal"
                        value={data.alamatSelamaCuti}
                        disabled
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </CardContent>
                  </Fragment>
                )
            }
          </Card>
        </Grid>
        {
          role === "admin" &&
            data.aproval ? (
              <Grid item xs={12} md={4}>
                <ProgressPengajuanCuti {...rest} />
              </Grid>
            ) : (
              <Grid item xs={12} md={4}>
                <Aproval isLoading={isLoading} {...rest} />
              </Grid>
            )
        }
      </Grid>
    );
  }
}

const mapStateToProps = ({ session }) => ({
  role: session.user.role
});

export default connect(mapStateToProps, null)(DetailCuti);
