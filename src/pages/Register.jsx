import React, { Component } from 'react';
import clsx from "clsx";

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import CircularProgress from "@material-ui/core/CircularProgress";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

// React router dom
import {
  NavLink
} from "react-router-dom";

// Formik & Yup
import { Formik, Form } from "formik";
import * as Yup from "yup";

// Redux
import { connect } from "react-redux";
import { registerAPI } from "../api/Redux/actions";

// Notistack
import { withSnackbar } from "notistack";

// Organisms
import AuthHeader from "../organisms/AuthHeader";
import AuthFooter from "../organisms/AuthFooter";

// Styles
const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
  nip: Yup
    .string()
    .required("Harap isi form nip")
    .matches(/^((?!(0))[0-9]{18})$/, "NIP setidaknya 18 digit angka"),
  nik: Yup
    .string()
    .required("Harap isi form nik")
    .matches(/^((?!(0))[0-9]{16})$/, "NIK setidaknya 16 digit angka"),
  email: Yup
    .string()
    .email("Email tidak valid")
    .required("Harap isi form email"),
  password: Yup
    .string()
    .required("Harap isi form kata sandi")
});

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false
    };
  }

  handleClickShowPassword = () => {
    this.setState((state) => ({
      showPassword: !state.showPassword
    }));
  };

  handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  render() {
    const { classes, registerAPI, enqueueSnackbar, history } = this.props;
    const { showPassword } = this.state;

    return (
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <AuthHeader title="Registrasi akun" />
          <Formik
            initialValues={{
              nip: "",
              nik: "",
              email: "",
              password: ""
            }}
            validationSchema={validationSchema}
            onSubmit={({ nip, nik, email, password }, { setSubmitting }) => {
              registerAPI(nip, nik, email, password)
                .then(() => {
                  setSubmitting(false);
                  enqueueSnackbar("Registrasi akun berhasil", { variant: "success" });
                  history.push("/login");
                })
                .catch(() => {
                  setSubmitting(false);
                  enqueueSnackbar("Registrasi akun gagal", { variant: "error" });
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
                    id="nip"
                    label="NIP"
                    name="nip"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    autoComplete="nip"
                    error={Boolean(touched.nip && errors.nip)}
                    helperText={touched.nip && errors.nip ? errors.nip : null}
                    value={values.nip}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  <TextField
                    id="nik"
                    label="NIK"
                    name="nik"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    autoComplete="nik"
                    error={Boolean(touched.nik && errors.nik)}
                    helperText={touched.nik && errors.nik ? errors.nik : null}
                    value={values.nik}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  <TextField
                    id="email"
                    label="Email"
                    name="email"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    autoComplete="email"
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email ? errors.email : null}
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined" fullWidth margin="normal" error={Boolean(touched.password && errors.password)} >
                    <InputLabel htmlFor="password">Kata Sandi</InputLabel>
                    <OutlinedInput
                      id="password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type={showPassword ? 'text' : 'password'}
                      labelWidth={80}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={this.handleClickShowPassword}
                            onMouseDown={this.handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    <FormHelperText>{touched.password && errors.password ? errors.password : null}</FormHelperText>
                  </FormControl>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? <CircularProgress size={25} /> : "Registrasi"}
                  </Button>
                </Form>
              )}
          </Formik>
          <AuthFooter
            right={
              <Link variant="body2" component={NavLink} to="/login">Silahkan masuk</Link>
            }
          />
        </div>

        <Box mt={8}>
          <Typography variant="body2" color="textSecondary" align="center">
            Copyright © E-Cuti {new Date().getFullYear()}
          </Typography>
        </Box>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  registerAPI: (nip, nik, email, password) => dispatch(registerAPI(nip, nik, email, password))
});

export default connect(null, mapDispatchToProps)(withStyles(styles)(withSnackbar(Register))); 