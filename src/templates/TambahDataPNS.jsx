import React, { Component } from 'react';

// Material Ui
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MenuItem from '@material-ui/core/MenuItem';
import CircularProgress from "@material-ui/core/CircularProgress";

// Formik & Yup
import { Formik, Form } from "formik";
import * as Yup from "yup";

// Firebase
import firebase from "../api/Firebase";

// Notistack
import { withSnackbar } from "notistack";

// Validation schema
const validationSchema = Yup.object().shape({
  nip: Yup
    .string()
    .required("Harap isi form nip")
    .matches(/^((?!(0))[0-9]{18})$/, "NIP setidaknya 18 digit angka"),
  nik: Yup
    .string()
    .required("Harap isi form nik")
    .matches(/^((?!(0))[0-9]{16})$/, "NIK setidaknya 16 digit angka"),
  nama: Yup
    .string()
    .required("Harap isi form nama"),
  golongan: Yup
    .string()
    .required("Harap isi form golongan"),
  unitKerja: Yup
    .string()
    .required("Harap isi form unit Kerja")
});

// Golongan
const golongan = [
  {
    value: 'Juru Muda (I/a)',
    label: 'Juru Muda (I/a)',
  },
  {
    value: 'Juru Muda Tingkat I (I/b)',
    label: 'Juru Muda Tingkat I (I/b)',
  },
  {
    value: 'Juru (I/c)',
    label: 'Juru (I/c)',
  },
  {
    value: 'Juru Tingkat I (I/d)',
    label: 'Juru Tingkat I (I/d)',
  },
  {
    value: 'Pengatur Muda (II/a)',
    label: 'Pengatur Muda (II/a)',
  },
  {
    value: 'Pengatur Muda Tingkat I (II/b)',
    label: 'Pengatur Muda Tingkat I (II/b)',
  },
  {
    value: 'Pengatur (II/c)',
    label: 'Pengatur (II/c)',
  },
  {
    value: 'Pengatur Tingkat I (II/d)',
    label: 'Pengatur Tingkat I (II/d)',
  },
  {
    value: 'Penata Muda (III/a)',
    label: 'Penata Muda (III/a)',
  },
  {
    value: 'Penata Muda Tingkat I (III/b)',
    label: 'Penata Muda Tingkat I (III/b)',
  },
  {
    value: 'Penata (III/c)',
    label: 'Penata (III/c)',
  },
  {
    value: 'Penata Tingkat I (III/d)',
    label: 'Penata Tingkat I (III/d)',
  },
  {
    value: 'Pembina (IV/a)',
    label: 'Pembina (IV/a)',
  },
  {
    value: 'Pembina Tingkat I (IV/b)',
    label: 'Pembina Tingkat I (IV/b)',
  },
  {
    value: 'Pembina Utama Muda (IV/c)',
    label: 'Pembina Utama Muda (IV/c)',
  },
  {
    value: 'Pembina Utama Madya (IV/d)',
    label: 'Pembina Utama Madya (IV/d)',
  },
  {
    value: 'Pembina Utama (IV/e)',
    label: 'Pembina Utama (IV/e)',
  },
];

class TambahDataPNS extends Component {
  render() {
    const { open, onClose } = this.props;

    return (
      <Dialog
        open={open}
        fullWidth
        maxWidth="xs"
        scroll="body"
      >
        <DialogTitle>Tambah Data PNS</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              nip: "",
              nik: "",
              nama: "",
              golongan: "",
              unitKerja: "Badan Kepegawai Daerah"
            }}
            validationSchema={validationSchema}
            onSubmit={({ nip, nik, nama, golongan, unitKerja }, { setSubmitting }) => {
              const ref = firebase.firestore().collection("pns");
              const { enqueueSnackbar } = this.props;

              ref
                .where("nip", "==", nip)
                .get()
                .then((nipSnapshot) => {
                  let dataNIP = [];
                  nipSnapshot.forEach(doc => dataNIP.push(doc.data()));
                  if (dataNIP.length !== 0) {
                    setSubmitting(false);
                    enqueueSnackbar("Data telah tersedia", { variant: "error" });
                  } else {
                    ref
                      .where("nik", "==", nik)
                      .get()
                      .then((nikSnapshot) => {
                        let dataNIK = [];
                        nikSnapshot.forEach(doc => dataNIK.push(doc.data()));
                        if (dataNIK.length !== 0) {
                          setSubmitting(false);
                          enqueueSnackbar("Data telah tersedia", { variant: "error" });
                        } else {
                          ref
                            .add({
                              nip: nip,
                              nik: nik,
                              nama: nama,
                              golongan: golongan,
                              unitKerja: unitKerja
                            })
                            .then(() => {
                              setSubmitting(false);
                              enqueueSnackbar("Data tersimpan", { variant: "success" });
                              onClose();
                            })
                            .catch(() => {
                              setSubmitting(false);
                              enqueueSnackbar("Data gagal disimpan", { variant: "error" });
                            });
                        }
                      });
                  }
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
                    margin="normal"
                    variant="outlined"
                    error={Boolean(touched.nip && errors.nip)}
                    helperText={touched.nip && errors.nip ? errors.nip : null}
                    value={values.nip}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <TextField
                    id="nik"
                    name="nik"
                    label="NIK"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    error={Boolean(touched.nik && errors.nik)}
                    helperText={touched.nik && errors.nik ? errors.nik : null}
                    value={values.nik}
                    onChange={handleChange}
                    onBlur={handleBlur}
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
                    value={values.nama}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <TextField
                    id="golongan"
                    name="golongan"
                    label="Golongan"
                    fullWidth
                    select
                    margin="normal"
                    variant="outlined"
                    error={Boolean(touched.golongan && errors.golongan)}
                    helperText={touched.golongan && errors.golongan ? errors.golongan : null}
                    value={values.golongan}
                    onChange={handleChange}
                    onBlur={handleBlur}
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
                    margin="normal"
                    variant="outlined"
                    error={Boolean(touched.unitKerja && errors.unitKerja)}
                    helperText={touched.unitKerja && errors.unitKerja ? errors.unitKerja : null}
                    value={values.unitKerja}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <Box mt={2} mb={2}>
                    <Grid container spacing={2} justify="flex-end">
                      <Grid item>
                        <Button color="primary" variant="outlined" onClick={onClose}>Batal</Button>
                      </Grid>
                      <Grid item>
                        <Button type="submit" color="primary" variant="contained" disabled={isSubmitting} >{isSubmitting ? <CircularProgress size={25} /> : "Simpan"}</Button>
                      </Grid>
                    </Grid>
                  </Box>
                </Form>
              )}
          </Formik>
        </DialogContent>
      </Dialog>
    );
  }
}

export default withSnackbar(TambahDataPNS); 