import React, { Component } from 'react';

// Material UI
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";

// Icons
import SaveIcon from '@material-ui/icons/Save';

// Formik & Yup 
import { Formik, Form } from "formik";
import * as Yup from "yup";

// Validation schema
const validationSchema = Yup.object().shape({

});

class EditDataPNS extends Component {
  render() {
    return (
      <Card>
        <CardHeader title="Edit Data PNS" />
        <Divider />
        <CardContent>
          <Formik
            initialValues={{
              nip: "",
              nama: "",
              golongan: "",
              unitKerja: "",
              noTelp: ""
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
                    error={Boolean(touched.nip && errors.nip)}
                    helperText={touched.nip && errors.nip ? errors.nip : null}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.nip}
                  />
                  <TextField
                    id="nama"
                    name="nama"
                    label="Nama"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    error={Boolean(touched.nama && errors.nama)}
                    helperText={touched.nama && errors.nama ? errors.nama : null}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.nama}
                  />
                  <TextField
                    id="golongan"
                    name="golongan"
                    label="Golongan"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    error={Boolean(touched.golongan && errors.golongan)}
                    helperText={touched.golongan && errors.golongan ? errors.golongan : null}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.golongan}
                  />
                  <TextField
                    id="unitKerja"
                    name="unitKerja"
                    label="Unit Kerja"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    error={Boolean(touched.unitKerja && errors.unitKerja)}
                    helperText={touched.unitKerja && errors.unitKerja ? errors.unitKerja : null}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.unitKerja}
                  />
                  <TextField
                    id="noTelp"
                    name="noTelp"
                    label="Nomor Telepon"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    error={Boolean(touched.noTelp && errors.noTelp)}
                    helperText={touched.noTelp && errors.noTelp ? errors.noTelp : null}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.noTelp}
                  />

                  <Box mt={2}>
                    <Grid container justify="flex-end">
                      <Grid item>
                        <Button
                          type="submit"
                          color="primary"
                          variant="contained"
                          startIcon={<SaveIcon />}
                          disabled={isSubmitting}
                        >{isSubmitting ? <CircularProgress size={25} /> : "Simpan"}</Button>
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

export default EditDataPNS;
