import React, { Component, Fragment } from 'react';

// Material UI
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';

// Material icons
import SendIcon from '@material-ui/icons/Send';

// Notistack
import { withSnackbar } from 'notistack';

// Formik & Yup
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

// Firebase
import firebase from '../config/firebase';

// Redux
import { connect } from 'react-redux';

// Validation schema
const validationSchema = Yup.object().shape({
  nip: Yup.string()
    .required('Harap isi form nip'),
  nama: Yup.string()
    .required('Harap isi form nama'),
  golongan: Yup.string()
    .required('Harap isi form golongan'),
  unitKerja: Yup.string()
    .required('Harap isi form unit kerja'),
  noTelp: Yup.string()
    .required('Harap isi form nomor telepon'),
  jenisCuti: Yup.string()
    .required('Harap isi form jenis cuti'),
  alasanCuti: Yup.string()
    .required('Harap isi form alasan cuti'),
  tglMulai: Yup.string()
    .required('Harap isi form tanggal mulai'),
  tglSelesai: Yup.string()
    .required('Harap isi form tanggal selesai'),
  alamatSelamaCuti: Yup.string()
    .required('Harap isi form alamat selama menjalankan cuti')
});

class FormPengajuanCuti extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: {}
    };

    this.subscribe = false;
  }

  dataPegawai = (data) => {
    this.setState({
      isLoading: false,
      data
    });
  };

  createNotifications = (data) => {
    return firebase
      .firestore()
      .collection('pns')
      .where('role', '==', 'admin')
      .get()
      .then((querySnapshot) => {
        let penerima;
        querySnapshot.forEach(doc => penerima = doc.data().uid);

        return firebase
          .firestore()
          .collection('notifikasi')
          .doc(data.id)
          .set({
            pengirim: data.pengirim,
            penerima,
            nipPengirim: data.nipPengirim,
            cutiId: data.id,
            jenisCuti: data.jenisCuti,
            createdAt: data.tglPengajuan,
            aproval: data.aproval,
            type: 'pengajuan',
            open: false,
            read: false
          });
      });
  };

  componentDidMount() {
    this.subscribe = true;
    return firebase.firestore().collection('pns').where('uid', '==', this.props.uid)
      .onSnapshot((querySnapshot) => {
        let data = {};
        querySnapshot.forEach(doc => data = doc.data());
        if (this.subscribe) {
          this.dataPegawai(data);
        }
      }, () => {
        this.setState({
          isLoading: false,
          data: {}
        });
      });
  }

  componentWillUnmount() {
    this.subscribe = false;
  }

  render() {
    const { jenisCuti } = this.props;
    const { isLoading, data } = this.state;

    return (
      <Card>
        {
          isLoading ? (
            <Box p={10}>
              <Grid container justify='center'>
                <Grid item>
                  <CircularProgress />
                </Grid>
              </Grid>
            </Box>
          ) : (
              <Fragment>
                <CardHeader title='Formulir Pengajuan Cuti' />
                <Divider />
                <CardContent>
                  <Formik
                    initialValues={{
                      uid: data.uid,
                      nip: data.nip,
                      nama: data.nama,
                      golongan: data.golongan,
                      unitKerja: data.unitKerja,
                      noTelp: data.noTelp,
                      jenisCuti: jenisCuti,
                      alasanCuti: '',
                      tglMulai: '',
                      tglSelesai: '',
                      alamatSelamaCuti: '',
                      tglPengajuan: new Date().toISOString(),
                      aproval: false
                    }}
                    validationSchema={validationSchema}
                    onSubmit={({ uid, nip, nama, golongan, unitKerja, noTelp, jenisCuti, alasanCuti, tglMulai, tglSelesai, alamatSelamaCuti, tglPengajuan, aproval }, { setSubmitting, resetForm }) => {
                      const date1 = Date.parse(tglMulai);
                      const date2 = Date.parse(tglSelesai);
                      const lamaHari = (((date2 - date1) / (1000 * 3600 * 24) + 1));
                      const lamaCuti = `${lamaHari - (parseInt(lamaHari / 7) * 2)} hari`;

                      if (Date.parse(tglMulai) < new Date()) {
                        setSubmitting(false);
                        this.props.enqueueSnackbar('Periksa kembali tanggal pengajuan anda', { variant: 'error', preventDuplicate: true, });
                      } else if (date2 < date1) {
                        setSubmitting(false);
                        this.props.enqueueSnackbar('Periksa kembali tanggal pengajuan anda', { variant: 'error', preventDuplicate: true, });
                      } else {
                        return firebase.firestore().collection('cuti').add({
                          uid,
                          nip,
                          nama,
                          golongan,
                          unitKerja,
                          noTelp,
                          jenisCuti,
                          alasanCuti,
                          tglMulai,
                          tglSelesai,
                          alamatSelamaCuti,
                          tglPengajuan,
                          lamaCuti,
                          aproval
                        })
                          .then((res) => {
                            setSubmitting(false);
                            resetForm();
                            this.props.enqueueSnackbar('Cuti telah diajukan', { variant: 'success', preventDuplicate: true, });

                            this.createNotifications({
                              id: res.id,
                              cutiId: res.id,
                              pengirim: uid,
                              nipPengirim: nip,
                              jenisCuti,
                              tglPengajuan,
                              aproval
                            });
                          })
                          .catch((err) => {
                            console.log(err);
                            setSubmitting(false);
                            this.props.enqueueSnackbar('Cuti gagal diajukan', { variant: 'error', preventDuplicate: true, });
                          });
                      }
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
                            margin='normal'
                            variant='outlined'
                            value={values.nip}
                            disabled
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={Boolean(touched.nip && errors.nip)}
                            helperText={touched.nip && errors.nip ? errors.nip : null}
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                          <TextField
                            id='nama'
                            name='nama'
                            label='Nama'
                            fullWidth
                            margin='normal'
                            variant='outlined'
                            value={values.nama}
                            disabled
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={Boolean(touched.nama && errors.nama)}
                            helperText={touched.nama && errors.nama ? errors.nama : null}
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                          <TextField
                            id='golongan'
                            name='golongan'
                            label='Golongan'
                            fullWidth
                            margin='normal'
                            variant='outlined'
                            value={values.golongan}
                            disabled
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={Boolean(touched.golongan && errors.golongan)}
                            helperText={touched.golongan && errors.golongan ? errors.golongan : null}
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                          <TextField
                            id='unitKerja'
                            name='unitKerja'
                            label='Unit Kerja'
                            fullWidth
                            margin='normal'
                            variant='outlined'
                            value={values.unitKerja}
                            disabled
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={Boolean(touched.unitKerja && errors.unitKerja)}
                            helperText={touched.unitKerja && errors.unitKerja ? errors.unitKerja : null}
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                          <TextField
                            id='noTelp'
                            name='noTelp'
                            label='Nomor Telepon'
                            fullWidth
                            margin='normal'
                            variant='outlined'
                            value={values.noTelp}
                            disabled
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={Boolean(touched.noTelp && errors.noTelp)}
                            helperText={touched.noTelp && errors.noTelp ? errors.noTelp : null}
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                          <TextField
                            id='jenisCuti'
                            name='jenisCuti'
                            label='Jenis Cuti'
                            fullWidth
                            margin='normal'
                            variant='outlined'
                            value={values.jenisCuti}
                            disabled
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={Boolean(touched.jenisCuti && errors.jenisCuti)}
                            helperText={touched.jenisCuti && errors.jenisCuti ? errors.jenisCuti : null}
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                          <TextField
                            id='alasanCuti'
                            name='alasanCuti'
                            label='Alasan Cuti'
                            fullWidth
                            required
                            margin='normal'
                            variant='outlined'
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
                                  id='tglMulai'
                                  name='tglMulai'
                                  label='Tanggal Mulai'
                                  variant='outlined'
                                  fullWidth
                                  required
                                  type='date'
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
                                  id='tglSelesai'
                                  name='tglSelesai'
                                  label='s.d Tanggal'
                                  variant='outlined'
                                  fullWidth
                                  required
                                  type='date'
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
                            id='alamatSelamaCuti'
                            name='alamatSelamaCuti'
                            label='Alamat Selama Menjalankan Cuti'
                            fullWidth
                            required
                            multiline
                            rows={4}
                            margin='normal'
                            variant='outlined'
                            value={values.alamatSelamaCuti}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={Boolean(touched.alamatSelamaCuti && errors.alamatSelamaCuti)}
                            helperText={touched.alamatSelamaCuti && errors.alamatSelamaCuti ? errors.alamatSelamaCuti : null}
                          />

                          <Box mt={2}>
                            <Grid container justify='flex-end'>
                              <Grid item>
                                <Button
                                  type='submit'
                                  color='primary'
                                  variant='contained'
                                  disabled={isSubmitting}
                                  startIcon={<SendIcon />}
                                >{isSubmitting ? <CircularProgress size={25} /> : 'Ajukan'}</Button>
                              </Grid>
                            </Grid>
                          </Box>
                        </Form>
                      )}
                  </Formik>
                </CardContent>
              </Fragment>
            )
        }
      </Card>
    );
  }
}

const mapStateToProps = ({ session }) => ({
  uid: session.user.uid
});

export default connect(mapStateToProps)(withSnackbar(FormPengajuanCuti));
