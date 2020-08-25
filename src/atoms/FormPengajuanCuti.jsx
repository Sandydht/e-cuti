import React, { Component } from 'react';

// Material UI
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";
import CardContent from '@material-ui/core/CardContent';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

// Firebase
import firebase from "../api/Firebase";

// React router dom
import { NavLink } from "react-router-dom";

// Formik & Yup
import { Formik, Form } from "formik";
import * as Yup from "yup";

// Notistack
import { withSnackbar } from "notistack";

// Validation schema
const validationSchema = Yup.object().shape({

});

class FormPengajuanCuti extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: {}
    };

    this.auth = firebase.auth();
    this.pns = firebase.firestore().collection("pns");
    this.cuti = firebase.firestore().collection("cuti");
  }

  ajukanCuti = (data) => {
    return new Promise((resolve, reject) => {
      const date1 = Date.parse(data.tglMulai);
      const date2 = Date.parse(data.tglSelesai);
      const lamaHari = (((date2 - date1) / (1000 * 3600 * 24)) + 1);
      const hari = lamaHari - (parseInt(lamaHari / 7) * 2);

      // Mencari tanggal hari ini
      let today = new Date();
      let yyyy = today.getFullYear();
      let mm = today.getMonth() + 1;
      let dd = today.getDate();
      if (mm < 10) {
        mm = `0${mm}`;
      }
      today = `${yyyy}-${mm}-${dd}`;

      if (Date.parse(data.tglMulai) <= Date.parse(today)) {
        return reject(false);
      } else if (date2 < date1) {
        return reject(false);
      } else {
        this.cuti
          .add({
            nip: data.nip,
            tglPengajuan: today,
            tglMulai: data.tglMulai,
            tglSelesai: data.tglSelesai,
            lamaCuti: `${hari} hari`,
            jenisCuti: data.jenisCuti,
            alasanCuti: data.alasanCuti,
            alamatSelamaCuti: data.alamatSelamaCuti,
            status: "Menunggu"
          })
          .then(() => resolve(true))
          .catch(() => reject(false));
      }
    });
  };

  getDataPNS = (querySnapshot) => {
    let data;
    querySnapshot.forEach(doc => data = doc.data());
    this.setState({
      isLoading: false,
      data
    });
  };

  UNSAFE_componentWillMount() {
    this.unsubscribe = this.auth
      .onAuthStateChanged((user) => {
        if (user) {
          const uid = user.uid;
          this.pns
            .where("uid", "==", uid)
            .get()
            .then(this.getDataPNS);
        }
      });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { jenisCuti } = this.props;
    const { isLoading, data } = this.state;

    return (
      <Card>
        <CardHeader title="Form Pengajuan Cuti" />
        <Divider />
        <CardContent>
          {isLoading ? (
            <Box p={8} >
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
                  golongan: data.golongan,
                  unitKerja: data.unitKerja,
                  jenisCuti: jenisCuti,
                  tglMulai: "",
                  tglSelesai: "",
                  alasanCuti: "",
                  alamatSelamaCuti: ""
                }}
                validationSchema={validationSchema}
                onSubmit={({ nip, jenisCuti, tglMulai, tglSelesai, alasanCuti, alamatSelamaCuti }, { setSubmitting, resetForm }) => {
                  const { enqueueSnackbar } = this.props;

                  this.ajukanCuti({ nip, jenisCuti, tglMulai, tglSelesai, alasanCuti, alamatSelamaCuti })
                    .then(() => {
                      setSubmitting(false);
                      enqueueSnackbar("Cuti telah diajukan", { variant: "success" });
                      resetForm();
                    })
                    .catch(() => {
                      setSubmitting(false);
                      enqueueSnackbar("Cuti gagal diajukan", { variant: "error" });
                    });
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  isSubmitting
                }) => (
                    <Form>
                      <TextField
                        id="nip"
                        name="nip"
                        label="NIP"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={values.nip}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(touched.nip && errors.nip)}
                        helperText={touched.nip && errors.nip ? errors.nip : null}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                      <TextField
                        id="nama"
                        name="nama"
                        label="Nama"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.nama}
                        error={Boolean(touched.nama && errors.nama)}
                        helperText={touched.nama && errors.nama ? errors.nama : null}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                      <TextField
                        id="golongan"
                        name="golongan"
                        label="Golongan"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.golongan}
                        error={Boolean(touched.golongan && errors.golongan)}
                        helperText={touched.golongan && errors.golongan ? errors.golongan : null}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                      <TextField
                        id="unitKerja"
                        name="unitKerja"
                        label="Unit Kerja"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.unitKerja}
                        error={Boolean(touched.unitKerja && errors.unitKerja)}
                        helperText={touched.unitKerja && errors.unitKerja ? errors.unitKerja : null}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                      <TextField
                        id="jenisCuti"
                        name="jenisCuti"
                        label="Jenis Cuti"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.jenisCuti}
                        error={Boolean(touched.jenisCuti && errors.jenisCuti)}
                        helperText={touched.jenisCuti && errors.jenisCuti ? errors.jenisCuti : null}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                      <Grid container spacing={2}>
                        <Grid item md={6} xs={6}>
                          <TextField
                            id="tglMulai"
                            name="tglMulai"
                            label="Tanggal Mulai"
                            fullWidth
                            required
                            type="date"
                            margin="normal"
                            variant="outlined"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.tglMulai}
                            error={Boolean(touched.tglMulai && errors.tglMulai)}
                            helperText={touched.tglMulai && errors.tglMulai ? errors.tglMulai : null}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Grid>
                        <Grid item md={6} xs={6}>
                          <TextField
                            id="tglSelesai"
                            name="tglSelesai"
                            label="s/d Tanggal"
                            fullWidth
                            required
                            type="date"
                            margin="normal"
                            variant="outlined"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.tglSelesai}
                            error={Boolean(touched.tglSelesai && errors.tglSelesai)}
                            helperText={touched.tglSelesai && errors.tglSelesai ? errors.tglSelesai : null}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Grid>
                      </Grid>

                      <TextField
                        id="alasanCuti"
                        label="Alasan Cuti"
                        multiline
                        fullWidth
                        required
                        margin="normal"
                        rows={4}
                        variant="outlined"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.alasanCuti}
                        error={Boolean(touched.alasanCuti && errors.alasanCuti)}
                        helperText={touched.alasanCuti && errors.alasanCuti ? errors.alasanCuti : null}
                      />

                      <TextField
                        id="alamatSelamaCuti"
                        label="Alamat Selama Cuti"
                        multiline
                        fullWidth
                        required
                        margin="normal"
                        rows={4}
                        variant="outlined"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.alamatSelamaCuti}
                        error={Boolean(touched.alamatSelamaCuti && errors.alamatSelamaCuti)}
                        helperText={touched.alamatSelamaCuti && errors.alamatSelamaCuti ? errors.alamatSelamaCuti : null}
                      />

                      <Box mt={1}>
                        <Grid container spacing={2} justify="flex-end">
                          <Grid item>
                            <Button
                              color="primary"
                              variant="outlined"
                              component={NavLink}
                              to="/"
                            >Batal</Button>
                          </Grid>
                          <Grid item>
                            <Button
                              type="submit"
                              color="primary"
                              variant="contained"
                              disabled={isSubmitting}
                            >{isSubmitting ? <CircularProgress size={25} /> : "Ajukan"}</Button>
                          </Grid>
                        </Grid>
                      </Box>
                    </Form>
                  )}
              </Formik>
            )}
        </CardContent>
      </Card >
    );
  }
}
export default withSnackbar(FormPengajuanCuti); 