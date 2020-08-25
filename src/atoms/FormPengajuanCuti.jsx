import React, { Component, Fragment } from 'react';

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

// Formik & Yup
import { Formik, Form } from "formik";
import * as Yup from "yup";

// Validation schema
const validationSchema = Yup.object().shape({
  nip: Yup
    .string()
    .required("Harap isi form nip")
});

class FormPengajuanCuti extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: {}
    };

    this.auth = firebase.auth();
    this.ref = firebase.firestore().collection("pns");
  }

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
          this.ref
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
            // validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(false);
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
                  {
                    isLoading ? (
                      <div>Sedang memuat...</div>
                    ) : (
                        <Fragment>
                          <TextField
                            id="nip"
                            name="nip"
                            label="NIP"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.nip}
                            error={Boolean(touched.nip && errors.nip)}
                            helperText={touched.nip && errors.nip ? errors.nip : null}
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
                          />

                          <Grid container spacing={2}>
                            <Grid item md={6} xs={6}>
                              <TextField
                                id="tglMulai"
                                name="tglMulai"
                                label="Tanggal Mulai"
                                fullWidth
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
                                label="Tanggal Selesai"
                                fullWidth
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
                        </Fragment>
                      )
                  }
                </Form>
              )}
          </Formik>
        </CardContent>
      </Card>
    );
  }
}
export default FormPengajuanCuti; 