import React from 'react';
import Axios from "axios";

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
import MenuItem from "@material-ui/core/MenuItem";

// Icons
import SaveIcon from '@material-ui/icons/Save';

// Notistack
import { withSnackbar } from "notistack";

// Formik & Yup 
import { Formik, Form } from "formik";
import * as Yup from "yup";

// Validation schema
const validationSchema = Yup.object().shape({
  nip: Yup.string()
    .required("Harap isi form nip"),
  nik: Yup.string()
    .required("Harap isi form nik"),
  nama: Yup.string()
    .required("Harap isi form nama"),
  golongan: Yup.string()
    .required("Harap isi form golongan"),
  unitKerja: Yup.string()
    .required("Harap isi form unitKerja"),
  noTelp: Yup.string()
    .required("Harap isi form nomor telepon")
});

// Golongan
const golongan = [
  {
    value: "Juru Muda (I/a)",
    label: "Juru Muda (I/a)"
  },
  {
    value: "Juru Muda Tingkat I (I/b)",
    label: "Juru Muda Tingkat I (I/b)"
  },
  {
    value: "Juru (I/c)",
    label: "Juru (I/c)"
  },
  {
    value: "Juru Tingkat I (I/d)",
    label: "Juru Tingkat I (I/d)"
  },
  {
    value: "Pengatur Muda (II/a)",
    label: "Pengatur Muda (II/a)"
  },
  {
    value: "Pengatur Muda Tingkat I (II/b)",
    label: "Pengatur Muda Tingkat I (II/b)"
  },
  {
    value: "Pengatur (II/c)",
    label: "Pengatur (II/c)"
  },
  {
    value: "Pengatur Tingkat I (II/d)",
    label: "Pengatur Tingkat I (II/d)"
  },
  {
    value: "Penata Muda (III/a)",
    label: "Penata Muda (III/a)"
  },
  {
    value: "Penata Muda Tingkat I (III/b)",
    label: "Penata Muda Tingkat I (III/b)"
  },
  {
    value: "Penata (III/c)",
    label: "Penata (III/c)"
  },
  {
    value: "Penata Tingkat I (III/d)",
    label: "Penata Tingkat I (III/d)"
  },
  {
    value: "Pembina (IV/a)",
    label: "Pembina (IV/a)"
  },
  {
    value: "Pembina Tingkat I (IV/b)",
    label: "Pembina Tingkat I (IV/b)"
  },
  {
    value: "Pembina Utama Muda (IV/c)",
    label: "Pembina Utama Muda (IV/c)"
  },
  {
    value: "Pembina Utama Madya (IV/d)",
    label: "Pembina Utama Madya (IV/d)"
  },
  {
    value: "Pembina Utama (IV/e)",
    label: "Pembina Utama (IV/e)"
  },
];

const TambahDataPNS = ({ enqueueSnackbar }) => {
  return (
    <Card>
      <CardHeader title="Tambah Data PNS" />
      <Divider />
      <CardContent>
        <Formik
          initialValues={{
            nip: "",
            nik: "",
            nama: "",
            golongan: "",
            unitKerja: "",
            noTelp: ""
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            Axios.post("/tambahDataPNS", values)
              .then(() => {
                setSubmitting(false);
                resetForm();
                enqueueSnackbar("Data tersimpan", { variant: "success", preventDuplicate: true });
              })
              .catch(() => {
                setSubmitting(false);
                enqueueSnackbar("Data telah tersedia", { variant: "error", preventDuplicate: true });;
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
                  fullWidth
                  required
                  margin="normal"
                  variant="outlined"
                  error={Boolean(touched.nip && errors.nip)}
                  helperText={touched.nip && errors.nip ? errors.nip : null}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.nip}
                />
                <TextField
                  id="nik"
                  name="nik"
                  label="NIK"
                  fullWidth
                  required
                  margin="normal"
                  variant="outlined"
                  error={Boolean(touched.nik && errors.nik)}
                  helperText={touched.nik && errors.nik ? errors.nik : null}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.nik}
                />
                <TextField
                  id="nama"
                  name="nama"
                  label="Nama"
                  fullWidth
                  required
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
                  required
                  select
                  margin="normal"
                  variant="outlined"
                  error={Boolean(touched.golongan && errors.golongan)}
                  helperText={touched.golongan && errors.golongan ? errors.golongan : null}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.golongan}
                >
                  {golongan.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  id="unitKerja"
                  name="unitKerja"
                  label="Unit Kerja"
                  fullWidth
                  required
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
                  required
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
};

export default withSnackbar(TambahDataPNS);