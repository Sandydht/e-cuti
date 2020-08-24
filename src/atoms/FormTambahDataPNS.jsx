import React, { Component } from 'react';

// Material UI
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

// Formik & Yup
import { Formik, Form } from "formik";
import * as Yup from "yup";

// Validation schema
const validationSchema = Yup.object().shape({
  nip: Yup
    .string()
    .required("Harap isi form nip"),
  nik: Yup
    .string()
    .required("Harap isi form nik"),
  nama: Yup
    .string()
    .required("Harap isi form nama"),
  golongan: Yup
    .string()
    .required("Harap isi form golongan"),
  unitKerja: Yup
    .string()
    .required("Harap isi form unit kerja")
});

class FormTambahDataPNS extends Component {
  render() {
    const { onClick } = this.props;

    return (
      <Formik
        initialValues={{
          nip: "",
          nik: "",
          nama: "",
          golongan: "",
          unitKerja: "Badan Kepegawaian Daerah"
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
                id="nik"
                name="nik"
                label="NIK"
                fullWidth
                margin="normal"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.nik}
                error={Boolean(touched.nik && errors.nik)}
                helperText={touched.nik && errors.nik ? errors.nik : null}
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



              <Box mt={2} mb={2}>
                <Grid container spacing={2} justify="flex-end">
                  <Grid item>
                    <Button color="primary" variant="outlined" onClick={onClick} >Batal</Button>
                  </Grid>
                  <Grid item>
                    <Button
                      type="submit"
                      color="primary"
                      variant="contained"
                      disabled={isSubmitting}
                    >{isSubmitting ? <CircularProgress size={25} /> : "Simpan"}</Button>
                  </Grid>
                </Grid>
              </Box>
            </Form>
          )}
      </Formik>
    );
  }
}
export default FormTambahDataPNS;