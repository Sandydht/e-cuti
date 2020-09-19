import React, { Component } from 'react';
import logo from '../images/logo-prov-jateng.png';

// Material UI
import withStyles from '@material-ui/core/styles/withStyles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';

// React router dom 
import { NavLink } from 'react-router-dom';

// Formik & Yup
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

// Organisms
import Footer from '../organisms/Footer';

// Firebase
import firebase from '../config/firebase';

// Notistack
import { withSnackbar } from 'notistack';

// Styles
const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10)
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

// Validation schema
const validationSchema = Yup.object().shape({
  email: Yup
    .string()
    .required('Harap isi form email')
    .email('Email tidak valid')
});

class ForgotPassword extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar} src={logo} />
          <Typography component="h1" variant="h5">Email Reset Kata Sandi</Typography>

          <Formik
            initialValues={{
              email: ''
            }}
            validationSchema={validationSchema}
            onSubmit={({ email }, { setSubmitting, resetForm }) => {
              return firebase
                .auth()
                .sendPasswordResetEmail(email)
                .then(() => {
                  setSubmitting(false);
                  resetForm();
                  this.props.enqueueSnackbar('Email terkirim', { variant: 'success', preventDuplicate: true, });
                })
                .catch(() => {
                  setSubmitting(false);
                  this.props.enqueueSnackbar('Email gagal terkirim', { variant: 'error', preventDuplicate: true, });
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
                <Form className={classes.form}>
                  <TextField
                    id='email'
                    name='email'
                    label='Email'
                    required
                    fullWidth
                    variant='outlined'
                    margin='normal'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email ? errors.email : null}
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    disabled={isSubmitting}
                  >{isSubmitting ? <CircularProgress size={25} /> : 'Kirim Email'}</Button>

                  <Grid container justify='flex-end'>
                    <Grid item>
                      <Link component={NavLink} to='/login' variant="body2">Silahkan masuk</Link>
                    </Grid>
                  </Grid>
                </Form>
              )}
          </Formik>
        </div>
        <Box mt={8}>
          <Footer />
        </Box>
      </Container>
    );
  }
}

export default withStyles(styles)(withSnackbar(ForgotPassword));
