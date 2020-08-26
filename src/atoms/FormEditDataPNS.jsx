import React, { Component } from 'react';

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from '@material-ui/core/Card';
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";
import CardContent from "@material-ui/core/CardContent";
import MenuItem from "@material-ui/core/MenuItem";
import Avatar from "@material-ui/core/Avatar";

// Notistack
import { withSnackbar } from "notistack";

// Firebase
import firebase from "../api/Firebase";

// React router dom
import { NavLink } from "react-router-dom";

// Formik & yup
import { Formik, Form } from "formik";
import * as Yup from "yup";

// Styles
const styles = (theme) => ({
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10)
  }
});


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


class FormEditDataPNS extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      id: "",
      data: {},
    };

    this.pns = firebase.firestore().collection("pns");
    this.storage = firebase.storage().ref("fotoPNS");
  }

  updateDataPNS = (data) => {
    return new Promise((resolve, reject) => {
      const { id } = this.state;
      const dataPNS = {
        nip: data.nip,
        nik: data.nik,
        nama: data.nama,
        golongan: data.golongan,
        unitKerja: data.unitKerja
      };

      this.pns
        .doc(id)
        .update(dataPNS)
        .then(() => {
          if (data.foto !== null) {
            this.storage
              .child(id)
              .put(data.foto)
              .then(() => {
                this.storage
                  .child(id)
                  .getDownloadURL()
                  .then((fotoUrl) => {
                    this.pns
                      .doc(id)
                      .update({
                        fotoUrl
                      })
                      .then(() => {
                        return resolve(true);
                      });
                  });
              });
          } else {
            return resolve(true);
          }
        })
        .catch(() => reject(false));
    });
  };

  getDataPNS = (querySnapshot) => {
    let data = [];
    querySnapshot.forEach(doc => data.push({
      id: doc.id,
      data: doc.data()
    }));
    this.setState((state, props) => ({
      isLoading: false,
      id: data[props.match.params.id].id,
      data: data[props.match.params.id]
    }));
  };

  UNSAFE_componentWillMount() {
    this.pns
      .get()
      .then(this.getDataPNS);
  }

  render() {
    const { match, classes } = this.props;
    const { isLoading, data } = this.state;

    return (
      <Card>
        <CardHeader title="Edit Data PNS" />
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
                  foto: null,
                  nip: data.data.nip,
                  nik: data.data.nik,
                  nama: data.data.nama,
                  golongan: data.data.golongan,
                  unitKerja: data.data.unitKerja
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                  const { history, match, enqueueSnackbar } = this.props;
                  this.updateDataPNS(values)
                    .then(() => {
                      setSubmitting(false);
                      enqueueSnackbar("Data berhasil diperbarui", { variant: "success" });
                      history.push(`/data_pns/${match.params.id}`);
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
                  setFieldValue,
                  isSubmitting
                }) => (
                    <Form>
                      <Grid container spacing={2} justify="center" alignItems="center">
                        <Grid item xs={4} md={2}>
                          <Grid container justify="center" alignItems="center">
                            <Grid item>
                              <Avatar src={data.data.fotoUrl} className={classes.avatar} />
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={8} md={10}>
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
                        required
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
                        required
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
                        error={Boolean(touched.unitKerja && errors.unitKerja)}
                        helperText={touched.unitKerja && errors.unitKerja ? errors.unitKerja : null}
                        value={values.unitKerja}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        InputProps={{
                          readOnly: true,
                        }}
                      />

                      <Box mt={2}>
                        <Grid container spacing={2} justify="flex-end">
                          <Grid item>
                            <Button
                              color="primary"
                              variant="outlined"
                              component={NavLink}
                              to={`/data_pns/${match.params.id}`}
                            >Batal</Button>
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
            )}
        </CardContent>
      </Card>
    );
  }
}
export default withStyles(styles)(withSnackbar(FormEditDataPNS)); 