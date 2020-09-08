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
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";

// Icons
import SaveIcon from '@material-ui/icons/Save';

// Formik & Yup 
import { Formik, Form } from "formik";
import * as Yup from "yup";

// Validation schema
const validationSchema = Yup.object().shape({

});

class Aproval extends Component {
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
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
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
        </Grid>
        <Grid item xs={12} md={12}>
          <Card>
            <CardHeader title="Aproval" />
            <Divider />
            <CardContent>
              <Formik
                initialValues={{
                  pertimbangan: "",
                  keterangan: ""
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  console.log(values);
                }}
              >
                {({
                  errors,
                  touched,
                  values,
                  handleChange,
                  handleBlur,
                  isSubmitting
                }) => (
                    <Form>
                      <FormControl component="fieldset" margin="normal" fullWidth required>
                        <FormLabel component="legend">Pertimbangan</FormLabel>
                        <RadioGroup aria-label="pertimbangan" name="pertimbangan" value="">
                          <FormControlLabel control={<Radio />} label="Disetujui" />
                          <FormControlLabel control={<Radio />} label="Perubahan" />
                          <FormControlLabel control={<Radio />} label="Ditangguhkan" />
                          <FormControlLabel control={<Radio />} label="Tidak Disetujui" />
                        </RadioGroup>
                      </FormControl>

                      <TextField
                        label="Keterangan"
                        variant="outlined"
                        fullWidth
                        multiline
                        required
                        rows={4}
                        margin="normal"
                      />

                      <Box mt={2}>
                        <Grid container justify="flex-end">
                          <Grid item>
                            <Button
                              type="submit"
                              color="primary"
                              variant="contained"
                              disabled={isSubmitting}
                              startIcon={<SaveIcon />}
                            >{isSubmitting ? <CircularProgress size={25} /> : "Simpan"}</Button>
                          </Grid>
                        </Grid>
                      </Box>
                    </Form>
                  )}
              </Formik>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

export default Aproval;
