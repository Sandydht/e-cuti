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

// Formik & Yup
import { Formik, Form } from "formik";

class FormPengajuanCuti extends Component {
  render() {
    return (
      <Card>
        <CardHeader title="Form Pengajuan Cuti" />
        <Divider />
        <CardContent>
          <Formik
            initialValues={{
              nip: "",
              nama: "",
              golongan: "",
              unitKerja: "",
              tglMulai: "",
              tglSelesai: "",
              alasanCuti: "",
              alamatSelamaCuti: ""
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

                  <Box mt={2}>
                    <Grid container spacing={2} justify="flex-end">
                      <Grid item>
                        <Button color="primary" variant="outlined">Batal</Button>
                      </Grid>
                      <Grid item>
                        <Button
                          type="submit"
                          color="primary"
                          variant="contained"
                        >Ajukan</Button>
                      </Grid>
                    </Grid>
                  </Box>
                </Form>
              )}
          </Formik>
        </CardContent>
      </Card>
    );
  }
}
export default FormPengajuanCuti; 