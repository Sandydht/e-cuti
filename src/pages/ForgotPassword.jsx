import React, { Component } from 'react';
import logo from "../images/logo-prov-jateng.png";
import Axios from "axios";

// React router dom
import { Link as RouteLink } from "react-router-dom";

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';

// Formik & Yup
import { Formik, Form } from "formik";
import * as Yup from "yup";

// Organisms
import Footer from "../organisms/Footer";

// Notistack
import { withSnackbar } from "notistack";

// Validation schema
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email tidak valid")
    .required("Harap isi form email")
});

// Styles
const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class ForgotPassword extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar} src={logo} alt="logo-prov-jateng" />

          <Typography component="h1" variant="h5">
            Kirim Email Reset Kata Sandi
          </Typography>

          <Formik
            initialValues={{
              email: ""
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              Axios.post("/sendEmailResetPassword", values)
                .then(() => {
                  setSubmitting();
                  resetForm();
                  this.props.enqueueSnackbar("Email terkirim", { variant: "success", preventDuplicate: true });
                })
                .catch(() => {
                  setSubmitting();
                  this.props.enqueueSnackbar("Periksa kembali email anda", { variant: "error", preventDuplicate: true });
                });
            }}
          >
            {({
              errors,
              touched,
              handleChange,
              handleBlur,
              isSubmitting,
              values
            }) => (
                <Form className={classes.form}>
                  <TextField
                    id="email"
                    name="email"
                    label="Email"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    required
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email ? errors.email : null}
                    value={values.email}
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    disabled={isSubmitting}
                  >{isSubmitting ? <CircularProgress size={25} /> : "Kirim Email"}</Button>
                </Form>
              )}
          </Formik>
          <Grid container justify="flex-end">
            <Grid item>
              <Link variant="body2" component={RouteLink} to="/login">
                Silahkan masuk
              </Link>
            </Grid>
          </Grid>
        </div>
        <Box mt={8} mb={8}>
          <Footer />
        </Box>
      </Container>
    );
  }
}

export default withStyles(styles)(withSnackbar(ForgotPassword));
