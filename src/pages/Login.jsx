import React, { Component } from 'react';
import logo from "../images/logo-prov-jateng.png";

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
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';

// Icons
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

// Formik & Yup
import { Formik, Form } from "formik";
import * as Yup from "yup";

// Redux
import { connect } from "react-redux";
import { login } from "../redux/actions";

// Organisms
import Footer from "../organisms/Footer";

// Notistack
import { withSnackbar } from "notistack";

// Validation schema
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email tidak valid")
    .required("Harap isi form email"),
  password: Yup.string()
    .required("Harap isi form kata sandi")
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

class Login extends Component {
  state = {
    showPassword: false
  };

  handleClickShowPassword = () => {
    this.setState((state) => ({
      showPassword: !state.showPassword
    }));
  };

  render() {
    const { classes } = this.props;
    const { showPassword } = this.state;

    return (
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar} src={logo} alt="logo-prov-jateng" />

          <Typography component="h1" variant="h5">
            E-Cuti
          </Typography>

          <Formik
            initialValues={{
              email: "",
              password: ""
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              this.props.login(values)
                .then(() => {
                  setSubmitting(false);
                  this.props.history.replace("/");
                  this.props.enqueueSnackbar("Login berhasil", { variant: "success", preventDuplicate: true });
                })
                .catch(() => {
                  setSubmitting(false);
                  this.props.enqueueSnackbar("Login gagal", { variant: "error", preventDuplicate: true });
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

                  <FormControl variant="outlined" fullWidth margin="normal" error={Boolean(touched.password && errors.password)} required>
                    <InputLabel htmlFor="password">Kata Sandi</InputLabel>
                    <OutlinedInput
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      labelWidth={95}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={this.handleClickShowPassword}
                            onMouseDown={this.handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
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
                  >{isSubmitting ? <CircularProgress size={25} /> : "Masuk"}</Button>
                </Form>
              )}
          </Formik>
          <Grid container>
            <Grid item xs>
              <Link variant="body2" component={RouteLink} to="/lupa_kata_sandi">
                Lupa kata sandi ?
              </Link>
            </Grid>
            <Grid item>
              <Link variant="body2" component={RouteLink} to="/register">
                Registrasi akun
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

const mapDispatchToProps = (dispatch) => ({
  login: (user, history) => dispatch(login(user, history))
});

export default connect(null, mapDispatchToProps)(withStyles(styles)(withSnackbar(Login)));
