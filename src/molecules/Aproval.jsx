import React, { Fragment } from 'react';

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

// Validation schema
const validationSchema = Yup.object().shape({
  pertimbangan: Yup.string()
    .required("Harap berikan pertimbangan"),
  keterangan: Yup.string()
    .required("Harap isi form keterangan")
});

const Aproval = ({ isLoading, match, history, enqueueSnackbar, uid }) => {
  const createNotifications = (data) => {
    return firebase.firestore().collection('notifikasi').doc(data.id)
      .set({
        aproval: true,
        createdAt: data.createdAt,
        jenisCuti: data.jenisCuti,
        cutiId: data.cutiId,
        open: false,
        penerima: data.penerima,
        nipPenerima: data.nipPenerima,
        pengirim: uid,
        read: false,
        type: 'aproval'
      });
  };

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
                    return firebase
                      .firestore()
                      .collection('cuti')
                      .doc(match.params.cutiId)
                      .get()
                      .then(doc => {
                        if (doc.exists) {
                          return firebase.firestore().collection('aproval').add({
                            cutiId: doc.id,
                            pertimbangan,
                            keterangan,
                            createdAt,
                            jenisCuti: doc.data().jenisCuti,
                            penerima: doc.data().uid,
                            pengirim: uid
                          })
                            .then((res) => {
                              return firebase
                                .firestore()
                                .collection('cuti')
                                .doc(match.params.cutiId)
                                .update({ aproval: true })
                                .then(() => {
                                  setSubmitting(false);
                                  resetForm();
                                  enqueueSnackbar('Aproval berhasil', { variant: 'success', preventDuplicate: true, });
                                  history.replace('/');

                                  createNotifications({
                                    id: res.id,
                                    cutiId: doc.id,
                                    createdAt,
                                    jenisCuti: doc.data().jenisCuti,
                                    penerima: doc.data().uid,
                                    nipPenerima: doc.data().nipPenerima
                                  });
                                });
                            });
                        }
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
};

const mapStateToProps = ({ session }) => ({
  uid: session.user.uid
});

export default connect(mapStateToProps)(withSnackbar(Aproval));
