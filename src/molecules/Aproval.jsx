import React, { Component, Fragment } from 'react';

// Material UI
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";

// Icons
import SaveIcon from '@material-ui/icons/Save';

// Notistack
import { withSnackbar } from "notistack";

// Formik & Yup 
import { Formik, Form } from "formik";
import * as Yup from "yup";

// Redux 
import { connect } from 'react-redux';

// Firebase
import firebase from '../config/firebase';

// Moment
import moment from 'moment';
import 'moment/locale/id';

// Validation schema
const validationSchema = Yup.object().shape({
  pertimbangan: Yup.string()
    .required("Harap berikan pertimbangan"),
  keterangan: Yup.string()
    .required("Harap isi form keterangan")
});

class Aproval extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: {}
    };

    this.subscribe = false;
  }

  dataCuti = (data) => {
    this.setState({
      isLoading: false,
      data
    });
  };

  componentDidMount() {
    this.subscribe = true;
    return firebase
      .firestore()
      .collection('cuti')
      .doc(this.props.match.params.cutiId)
      .get()
      .then(doc => {
        if (doc.exists) {
          if (this.subscribe) {
            this.dataCuti({
              cutiId: doc.id,
              uid: doc.data().uid,
              nip: doc.data().nip,
              nama: doc.data().nama,
              golongan: doc.data().golongan,
              unitKerja: doc.data().unitKerja,
              noTelp: doc.data().noTelp,
              jenisCuti: doc.data().jenisCuti,
              alasanCuti: doc.data().alasanCuti,
              tglPengajuan: moment(doc.data().tglPengajuan).format('L, LT'),
              tglMulai: moment(doc.data().tglMulai).format('L'),
              tglSelesai: moment(doc.data().tglSelesai).format('L'),
              lamaCuti: doc.data().lamaCuti,
              alamatSelamaCuti: doc.data().alamatSelamaCuti,
              aproval: doc.data().aproval,
            });
          }
        }
      });
  }

  componentWillUnmount() {
    this.subscribe = false;
  }

  createNotifications = (data) => {
    return firebase.firestore().collection('notifikasi').doc(data.id)
      .set({
        aproval: true,
        createdAt: data.createdAt,
        jenisCuti: data.jenisCuti,
        cutiId: data.cutiId,
        open: false,
        penerima: data.penerima,
        nipPenerima: data.nipPenerima,
        pengirim: this.props.uid,
        read: false,
        type: 'aproval'
      });
  };

  render() {
    const { history, enqueueSnackbar, uid } = this.props;
    const { isLoading, data } = this.state;
    moment().locale('id');

    return (
      <Card>
        {
          isLoading ? (
            <Box p={10}>
              <Grid container justify="center">
                <Grid item>
                  <CircularProgress />
                </Grid>
              </Grid>
            </Box>
          ) : (
              <Fragment>
                <CardHeader title="Aproval" />
                <Divider />
                <CardContent>
                  <Formik
                    initialValues={{
                      pertimbangan: "",
                      keterangan: "",
                      createdAt: new Date().toISOString()
                    }}
                    validationSchema={validationSchema}
                    onSubmit={({ pertimbangan, keterangan, createdAt }, { setSubmitting, resetForm }) => {
                      return firebase.firestore().collection('aproval').add({
                        cutiId: data.cutiId,
                        pertimbangan,
                        keterangan,
                        createdAt,
                        jenisCuti: data.jenisCuti,
                        penerima: data.uid,
                        pengirim: uid
                      })
                        .then((res) => {
                          setSubmitting(false);
                          resetForm();
                          enqueueSnackbar('Aproval berhasil', { variant: 'success', preventDuplicate: true, });
                          setTimeout(() => {
                            history.replace('/');
                          }, 100);

                          return firebase
                            .firestore()
                            .collection('cuti')
                            .doc(data.cutiId)
                            .update({ aproval: true })
                            .then(() => {
                              return firebase
                                .firestore()
                                .collection('notifikasi')
                                .doc(data.cutiId)
                                .update({ aproval: true })
                                .then(() => {
                                  this.createNotifications({
                                    id: res.id,
                                    cutiId: data.cutiId,
                                    createdAt,
                                    jenisCuti: data.jenisCuti,
                                    penerima: data.uid,
                                    nipPenerima: data.nip
                                  });
                                });
                            });
                        })
                        .catch(() => {
                          setSubmitting(false);
                          enqueueSnackbar('Aproval gagal', { variant: 'error', preventDuplicate: true, });
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
                          <FormControl
                            component="fieldset"
                            margin="normal"
                            fullWidth
                            required
                            error={Boolean(touched.pertimbangan && errors.pertimbangan)}
                          >
                            <FormLabel component="legend">Pertimbangan</FormLabel>
                            <RadioGroup
                              aria-label="pertimbangan"
                              id="pertimbangan"
                              name="pertimbangan"
                              value={values.pertimbangan}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            >
                              <FormControlLabel value="Disetujui" control={<Radio />} label="Disetujui" />
                              <FormControlLabel value="Tidak Disetujui" control={<Radio />} label="Tidak Disetujui" />
                            </RadioGroup>
                            <FormHelperText>{touched.pertimbangan && errors.pertimbangan ? errors.pertimbangan : null}</FormHelperText>
                          </FormControl>

                          <TextField
                            id="keterangan"
                            name="keterangan"
                            label="Keterangan"
                            variant="outlined"
                            fullWidth
                            multiline
                            required
                            rows={4}
                            margin="normal"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.keterangan}
                            error={Boolean(touched.keterangan && errors.keterangan)}
                            helperText={touched.keterangan && errors.keterangan ? errors.keterangan : null}
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

export default connect(mapStateToProps)(withSnackbar(Aproval));
