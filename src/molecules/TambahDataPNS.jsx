import React, { Component, Fragment } from 'react';

// Material UI
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import MenuItem from '@material-ui/core/MenuItem';

// Material icons
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import SaveIcon from '@material-ui/icons/Save';

// Formik & Yup
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

// Notistack
import { withSnackbar } from 'notistack';

// Firebase
import firebase from '../config/firebase';

// Validation schema
const validationSchema = Yup.object().shape({

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

class TambahDataPNS extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  render() {
    const { open } = this.state;

    return (
      <Fragment>
        <Button
          color='primary'
          variant='contained'
          fullWidth
          startIcon={<PersonAddIcon />}
          onClick={this.handleOpen}
        >Tambah Data PNS</Button>

        <Dialog
          open={open}
          fullWidth
          maxWidth='xs'
          scroll='body'
        >
          <DialogTitle>Tambah Data PNS</DialogTitle>
          <Divider />
          <DialogContent>
            <Formik
              initialValues={{
                nip: '',
                nik: '',
                nama: '',
                golongan: '',
                unitKerja: '',
                noTelp: '',
                register: false
              }}
              validationSchema={validationSchema}
              onSubmit={({ nip, nik, nama, golongan, unitKerja, noTelp, register }, { setSubmitting, resetForm }) => {
                return firebase
                  .firestore()
                  .collection('pns')
                  .get()
                  .then(querySnapshot => {
                    let data = [];
                    querySnapshot.forEach(doc => data.push(doc.data()));

                    if (
                      (data.filter(data => data.nip === nip).length || data.filter(data => data.nik === nik).length) !== 0
                    ) {
                      setSubmitting(false);
                      this.props.enqueueSnackbar('Data telah tersedia', { variant: 'error', preventDuplicate: true, });
                    } else {
                      return firebase
                        .firestore()
                        .collection('pns')
                        .add({
                          nip,
                          nik,
                          nama,
                          golongan,
                          unitKerja,
                          noTelp,
                          register
                        })
                        .then(() => {
                          setSubmitting(false);
                          resetForm();
                          this.props.enqueueSnackbar('Data tersimpan', { variant: 'success', preventDuplicate: true, });
                        });
                    }
                  })
                  .catch(() => {
                    setSubmitting(false);
                    this.props.enqueueSnackbar('Data gagal disimpan', { variant: 'error', preventDuplicate: true, });
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
                      id='nip'
                      name='nip'
                      label='NIP'
                      fullWidth
                      required
                      margin='normal'
                      variant='outlined'
                      value={values.nip}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(touched.nip && errors.nip)}
                      helperText={touched.nip && errors.nip ? errors.nip : null}
                    />
                    <TextField
                      id='nik'
                      name='nik'
                      label='NIK'
                      fullWidth
                      required
                      margin='normal'
                      variant='outlined'
                      value={values.nik}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(touched.nik && errors.nik)}
                      helperText={touched.nik && errors.nik ? errors.nik : null}
                    />
                    <TextField
                      id='nama'
                      name='nama'
                      label='Nama'
                      fullWidth
                      required
                      margin='normal'
                      variant='outlined'
                      value={values.nama}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(touched.nama && errors.nama)}
                      helperText={touched.nama && errors.nama ? errors.nama : null}
                    />
                    <TextField
                      id="golongan"
                      name='golongan'
                      select
                      label="Golongan"
                      required
                      margin='normal'
                      fullWidth
                      value={values.golongan}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(touched.golongan && errors.golongan)}
                      helperText={touched.golongan && errors.golongan ? errors.golongan : null}
                      variant="outlined"
                    >
                      {golongan.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      id='unitKerja'
                      name='unitKerja'
                      label='Unit Kerja'
                      fullWidth
                      required
                      margin='normal'
                      variant='outlined'
                      value={values.unitKerja}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(touched.unitKerja && errors.unitKerja)}
                      helperText={touched.unitKerja && errors.unitKerja ? errors.unitKerja : null}
                    />
                    <TextField
                      id='noTelp'
                      name='noTelp'
                      label='Nomor Telepon'
                      fullWidth
                      required
                      margin='normal'
                      variant='outlined'
                      value={values.noTelp}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(touched.noTelp && errors.noTelp)}
                      helperText={touched.noTelp && errors.noTelp ? errors.noTelp : null}
                    />

                    <Box mt={3} mb={2}>
                      <Grid container spacing={2} justify='flex-end'>
                        <Grid item>
                          <Button
                            color='primary'
                            variant='outlined'
                            onClick={this.handleClose}
                            disabled={isSubmitting}
                          >Tutup</Button>
                        </Grid>
                        <Grid item>
                          <Button
                            type='submit'
                            color='primary'
                            variant='contained'
                            startIcon={<SaveIcon />}
                            disabled={isSubmitting}
                          >{isSubmitting ? <CircularProgress size={25} /> : 'Simpan'}</Button>
                        </Grid>
                      </Grid>
                    </Box>
                  </Form>
                )}
            </Formik>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

export default withSnackbar(TambahDataPNS);