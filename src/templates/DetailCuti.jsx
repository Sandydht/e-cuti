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

    return (
      <Card>
        <CardHeader title="Detail Cuti" />
        <Divider />
        <CardContent>
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
                  <TextField
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    label="NIP"
                    value={data.nip}
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
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Fragment>
              )
          }
        </CardContent>
      </Card>
    );
  }
}

export default DetailCuti;
