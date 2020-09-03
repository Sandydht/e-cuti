import React, { Component } from 'react';

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
  render() {
    const { jenisCuti } = this.props;

    return (
      <Card>
        <CardHeader title="Formulir Pengajuan Cuti" />
        <Divider />
        <CardContent>
          <Formik
            initialValues={{
              nip: "",
              nama: "",
              noTelp: "",
              golongan: "",
              unitKerja: "",
              jenisCuti: jenisCuti,
              alasanCuti: "",
              tglMulai: "",
              tglSelesai: "",
              alamatSelamaCuti: ""
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
        </CardContent>
      </Card>
    );
  }
}

export default FormPengajuanCuti;
