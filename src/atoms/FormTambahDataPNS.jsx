import React, { Component } from 'react';

// Material UI
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import MenuItem from "@material-ui/core/MenuItem";

// Atoms
import Thumb from "./Thumb";

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
    .required("Harap isi form unit kerja")
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

class FormTambahDataPNS extends Component {
  constructor(props) {
    super(props);

    this.ref = firebase.firestore().collection("pns");
    this.storage = firebase.storage().ref("fotoPNS");
  }

  addDataPNS = (data) => {
    return new Promise((resolve, reject) => {
      const { enqueueSnackbar } = this.props;

      this.ref
        .where("nip", "==", data.nip)
        .get()
        .then((nipSnapshot) => {
          let dataNIP = [];
          nipSnapshot.forEach(doc => dataNIP.push(doc.data()));

          if (dataNIP.length !== 0) {
            enqueueSnackbar("Data telah tersedia", { variant: "error" });
            return reject(false);
          } else {
            this.ref
              .where("nik", "==", data.nik)
              .get()
              .then((nikSnapshot) => {
                let dataNIK = [];
                nikSnapshot.forEach(doc => dataNIK.push(doc.data()));

                if (dataNIK.length !== 0) {
                  enqueueSnackbar("Data telah tersedia", { variant: "error" });
                  return reject(false);
                } else {
                  const dataPNS = {
                    nip: data.nip,
                    nik: data.nik,
                    nama: data.nama,
                    golongan: data.golongan,
                    unitKerja: data.unitKerja
                  };

                  this.ref
                    .add(dataPNS)
                    .then((res) => {
                      if (data.foto !== null) {
                        this.storage
                          .child(res.id)
                          .put(data.foto)
                          .then(() => {
                            this.storage
                              .child(res.id)
                              .getDownloadURL()
                              .then((fotoUrl) => {
                                this.ref
                                  .doc(res.id)
                                  .update({
                                    fotoUrl
                                  })
                                  .then(() => {
                                    enqueueSnackbar("Data tersimpan", { variant: "success" });
                                    return resolve(true);
                                  });
                              });
                          });
                      } else {
                        enqueueSnackbar("Data tersimpan", { variant: "success" });
                        return resolve(true);
                      }
                    })
                    .catch(() => {
                      enqueueSnackbar("Data gagal tersimpan", { variant: "error" });
                      return reject(false);
                    });
                }
              });
          }
        });
    });
  };

  render() {
    const { onClick } = this.props;

    return (
      <Formik
        initialValues={{
          foto: null,
          nip: "",
          nik: "",
          nama: "",
          golongan: "",
          unitKerja: "Badan Kepegawaian Daerah"
        }}
        validationSchema={validationSchema}
        onSubmit={({ foto, nip, nik, nama, golongan, unitKerja }, { setSubmitting, resetForm }) => {
          this.addDataPNS({ foto, nip, nik, nama, golongan, unitKerja })
            .then(() => {
              setSubmitting(false);
              resetForm();
              onClick();
            })
            .catch(() => {
              setSubmitting(false);
            });
        }}
      >
        {({
          errors,
          touched,
          values,
          handleChange,
          handleBlur,
          setFieldValue,
          isSubmitting
        }) => (
            <Form>
              <Grid container spacing={2} justify="center" alignItems="center">
                <Grid item xs={4} md={3}>
                  <Grid container justify="center" alignItems="center">
                    <Grid item>
                      <Thumb file={values.foto} />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={8} md={9}>
                  <TextField
                    id="foto"
                    name="foto"
                    label="Foto PNS"
                    type="file"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    error={Boolean(touched.foto && errors.foto)}
                    helperText={touched.foto && errors.foto ? errors.foto : null}
                    onChange={(event) => {
                      setFieldValue("foto", event.currentTarget.files[0]);
                    }}
                    onBlur={handleBlur}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </Grid>
              </Grid>

              <TextField
                id="nip"
                name="nip"
                label="NIP"
                fullWidth
                required
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
                required
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
                required
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
                required
                select
                margin="normal"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.golongan}
                error={Boolean(touched.golongan && errors.golongan)}
                helperText={touched.golongan && errors.golongan ? errors.golongan : null}
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
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.unitKerja}
                error={Boolean(touched.unitKerja && errors.unitKerja)}
                helperText={touched.unitKerja && errors.unitKerja ? errors.unitKerja : null}
                InputProps={{
                  readOnly: true,
                }}
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
export default withSnackbar(FormTambahDataPNS);