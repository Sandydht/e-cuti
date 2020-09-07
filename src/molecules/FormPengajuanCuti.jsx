import React, { Component } from 'react';
import Axios from "axios";

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
import SendIcon from '@material-ui/icons/Send';

// Notistack
import { withSnackbar } from "notistack";

// Formik & Yup
import { Formik, Form } from "formik";
import * as Yup from "yup";

// Validation schema
const validationSchema = Yup.object().shape({
  alasanCuti: Yup.string()
    .required("Harap isi form alasan cuti"),
  tglMulai: Yup.string()
    .required("Harap isi form tanggal mulai"),
  tglSelesai: Yup.string()
    .required("Harap isi form s/d tanggal"),
  alamatSelamaCuti: Yup.string()
    .required("Harap isi form alamat selama cuti"),
});

class FormPengajuanCuti extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: {}
    };

    this.__subscribe = false;
  }

  dataUser = (data) => {
    this.setState({
      isLoading: false,
      data
    });
  };

  componentDidMount() {
    this.__subscribe = true;
    Axios.get("/dataUser")
      .then(res => {
        if (this.__subscribe) {
          this.dataUser(res.data);
        }
      })
      .catch(() => {
        this.setState({
          isLoading: false
        });
      });
  }

  componentWillUnmount() {
    this.__subscribe = false;
  }

  render() {
    const { jenisCuti } = this.props;
    const { data, isLoading } = this.state;

    return (
      <Card>
        <CardHeader title="Formulir Pengajuan Cuti" />
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
                <Formik
                  initialValues={{
                    nip: data.nip,
                    nama: data.nama,
                    noTelp: data.noTelp,
                    golongan: data.golongan,
                    unitKerja: data.unitKerja,
                    jenisCuti: jenisCuti,
                    alasanCuti: "",
                    tglMulai: "",
                    tglSelesai: "",
                    alamatSelamaCuti: ""
                  }}
                  validationSchema={validationSchema}
                  onSubmit={({ nip, nama, noTelp, golongan, unitKerja, jenisCuti, alasanCuti, tglMulai, tglSelesai, alamatSelamaCuti }, { setSubmitting, resetForm }) => {
                    // Mencari lama cuti
                    const date1 = Date.parse(tglMulai);
                    const date2 = Date.parse(tglSelesai);
                    const lamaHari = (((date2 - date1) / (1000 * 3600 * 24) + 1));
                    const lamaCuti = `${lamaHari - (parseInt(lamaHari / 7) * 2)} hari`;

                    // Mencari tgl pengajuan
                    let today = new Date();
                    let yyyy = today.getFullYear();
                    let mm = today.getMonth() + 1;
                    let dd = today.getDate();
                    if (mm < 10) mm = `0${mm}`;
                    today = `${yyyy}-${mm}-${dd}`;

                    Axios.post("/pengajuanCuti", {
                      nip,
                      nama,
                      noTelp,
                      golongan,
                      unitKerja,
                      jenisCuti,
                      alasanCuti,
                      tglMulai,
                      tglSelesai,
                      alamatSelamaCuti,
                      lamaCuti,
                      tglPengajuan: today
                    })
                      .then(() => {
                        setSubmitting(false);
                        resetForm();
                        this.props.enqueueSnackbar("Cuti telah diajukan", { variant: "success", preventDuplicate: true });
                      })
                      .catch(() => {
                        setSubmitting(false);
                        this.props.enqueueSnackbar("Cuti gagal diajukan", { variant: "error", preventDuplicate: true });
                      });
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
                        <TextField
                          id="nip"
                          name="nip"
                          label="NIP"
                          variant="outlined"
                          fullWidth
                          margin="normal"
                          value={values.nip}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                        <TextField
                          id="nama"
                          name="nama"
                          label="Nama"
                          variant="outlined"
                          fullWidth
                          margin="normal"
                          value={values.nama}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                        <TextField
                          id="noTelp"
                          name="noTelp"
                          label="Nomor Telepon"
                          variant="outlined"
                          fullWidth
                          margin="normal"
                          value={values.noTelp}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                        <TextField
                          id="golongan"
                          name="golongan"
                          label="Golongan"
                          variant="outlined"
                          fullWidth
                          margin="normal"
                          value={values.golongan}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                        <TextField
                          id="unitKerja"
                          name="unitKerja"
                          label="Unit Kerja"
                          variant="outlined"
                          fullWidth
                          margin="normal"
                          value={values.unitKerja}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                        <TextField
                          id="jenisCuti"
                          name="jenisCuti"
                          label="Jenis Cuti"
                          variant="outlined"
                          fullWidth
                          margin="normal"
                          value={values.jenisCuti}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                        <TextField
                          id="alasanCuti"
                          name="alasanCuti"
                          label="Alasan Cuti"
                          variant="outlined"
                          fullWidth
                          required
                          margin="normal"
                          value={values.alasanCuti}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={Boolean(touched.alasanCuti && errors.alasanCuti)}
                          helperText={touched.alasanCuti && errors.alasanCuti ? errors.alasanCuti : null}
                        />

                        <Box mt={2} mb={1}>
                          <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                              <TextField
                                id="tglMulai"
                                name="tglMulai"
                                label="Tanggal Mulai"
                                variant="outlined"
                                type="date"
                                fullWidth
                                required
                                value={values.tglMulai}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(touched.tglMulai && errors.tglMulai)}
                                helperText={touched.tglMulai && errors.tglMulai ? errors.tglMulai : null}
                                InputLabelProps={{
                                  shrink: true
                                }}
                              />
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <TextField
                                id="tglSelesai"
                                name="tglSelesai"
                                label="s/d Tanggal"
                                variant="outlined"
                                type="date"
                                fullWidth
                                required
                                value={values.tglSelesai}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(touched.tglSelesai && errors.tglSelesai)}
                                helperText={touched.tglSelesai && errors.tglSelesai ? errors.tglSelesai : null}
                                InputLabelProps={{
                                  shrink: true
                                }}
                              />
                            </Grid>
                          </Grid>
                        </Box>

                        <TextField
                          id="alamatSelamaCuti"
                          name="alamatSelamaCuti"
                          label="Alamat Selama Cuti"
                          variant="outlined"
                          fullWidth
                          required
                          multiline
                          rows={4}
                          margin="normal"
                          value={values.alamatSelamaCuti}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={Boolean(touched.alamatSelamaCuti && errors.alamatSelamaCuti)}
                          helperText={touched.alamatSelamaCuti && errors.alamatSelamaCuti ? errors.alamatSelamaCuti : null}
                        />

                        <Box mt={2}>
                          <Grid container spacing={2} justify="flex-end">
                            <Grid item>
                              <Button
                                type="submit"
                                color="primary"
                                variant="contained"
                                disabled={isSubmitting}
                                startIcon={<SendIcon />}
                              >{isSubmitting ? <CircularProgress size={25} /> : "Ajukan"}</Button>
                            </Grid>
                          </Grid>
                        </Box>
                      </Form>
                    )}
                </Formik>
              )
          }
        </CardContent>
      </Card>
    );
  }
}

export default withSnackbar(FormPengajuanCuti);
