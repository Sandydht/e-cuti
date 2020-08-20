import React, { Component } from 'react';

// Material UI
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MenuItem from '@material-ui/core/MenuItem';
import LinearProgress from "@material-ui/core/LinearProgress";
import CircularProgress from "@material-ui/core/CircularProgress";

// Formik & Yup
import { Formik, Form } from "formik";
import * as Yup from "yup";

// Firebase 
import firebase from "../api/Firebase";

// React router dom
import {
  NavLink
} from "react-router-dom";

// Notistack
import { withSnackbar } from "notistack";

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
    .required("Harap isi form unit kerja"),
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


class EditPNS extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataPNS: {},
      isLoading: true
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const ref = firebase.firestore().collection("pns").doc(match.params.id);

    ref
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.exists) {
          this.setState({
            dataPNS: querySnapshot.data(),
            isLoading: false
          });
        }
      });
  }

  render() {
    const { match } = this.props;
    const { dataPNS, isLoading } = this.state;

    return (
      <Card>
        <CardHeader title="Edit Data PNS" />
        <CardContent>
          {
            isLoading ? (
              <LinearProgress />
            ) : (
                <Formik
                  initialValues={{
                    nip: dataPNS.nip,
                    nik: dataPNS.nik,
                    nama: dataPNS.nama,
                    golongan: dataPNS.golongan,
                    unitKerja: dataPNS.unitKerja
                  }}
                  validationSchema={validationSchema}
                  onSubmit={({ nip, nik, nama, golongan, unitKerja }, { setSubmitting }) => {
                    const ref = firebase.firestore().collection("pns").doc(match.params.id);
                    const { history, enqueueSnackbar } = this.props;
                    ref
                      .update({
                        nip: nip,
                        nik: nik,
                        nama: nama,
                        golongan: golongan,
                        unitKerja: unitKerja
                      })
                      .then(() => {
                        setSubmitting(false);
                        enqueueSnackbar("Data berhasil diperbarui", { variant: "success" });
                        history.push(`/beranda/data_pns/${match.params.id}`);
                      })
                      .catch(() => {
                        setSubmitting(false);
                        enqueueSnackbar("Data gagal diperbarui", { variant: "error" });
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
                        />
                        <Box mt={2}>
                          <Grid container spacing={2} justify="flex-end">
                            <Grid item>
                              <Button color="primary" variant="outlined" component={NavLink} to={`/beranda/data_pns/${match.params.id}`}>Batal</Button>
                            </Grid>
                            <Grid item>
                              <Button type="submit" color="primary" variant="contained" disabled={isSubmitting} >{isSubmitting ? <CircularProgress size={25} /> : "Simpan"}</Button>
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

export default withSnackbar(EditPNS);