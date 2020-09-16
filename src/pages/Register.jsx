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
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';

// Material icons
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

// Notistack
import { withSnackbar } from 'notistack';

// React router dom 
import { NavLink } from 'react-router-dom';

// Formik & Yup
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

// Redux
import { connect } from 'react-redux';
import { register } from '../config/redux/actions';

// Organisms
import Footer from '../organisms/Footer';

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
  nip: Yup
    .string()
    .required('Harap isi form nip'),
  nik: Yup
    .string()
    .required('Harap isi form nik'),
  noTelp: Yup
    .string()
    .required('Harap isi form nomor telepon'),
  email: Yup
    .string()
    .required('Harap isi form email')
    .email('Email tidak valid'),
  password: Yup
    .string()
    .required('Harap isi form kata sandi')
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

  render() {
    const { classes } = this.props;
    const { showPassword } = this.state;

    return (
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar} src={logo} />
          <Typography component="h1" variant="h5">Registrasi Akun</Typography>

          <Formik
            initialValues={{
              nip: '',
              nik: '',
              noTelp: '',
              email: '',
              password: ''
            }}
            validationSchema={validationSchema}
            onSubmit={({ nip, nik, noTelp, email, password }, { setSubmitting, resetForm }) => {
              this.props.register({ nip, nik, noTelp, email, password })
                .then(() => {
                  setSubmitting(false);
                  resetForm();
                  const { from } = { from: { pathname: '/' } };
                  this.props.history.replace(from);
                })
                .catch(() => {
                  setSubmitting(false);
                  this.props.enqueueSnackbar('Registrasi akun gagal', { variant: 'error', preventDuplicate: true, });
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
                    id='nip'
                    name='nip'
                    label='NIP'
                    required
                    fullWidth
                    variant='outlined'
                    margin='normal'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.nip}
                    error={Boolean(touched.nip && errors.nip)}
                    helperText={touched.nip && errors.nip ? errors.nip : null}
                  />

                  <TextField
                    id='nik'
                    name='nik'
                    label='NIK'
                    required
                    fullWidth
                    variant='outlined'
                    margin='normal'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.nik}
                    error={Boolean(touched.nik && errors.nik)}
                    helperText={touched.nik && errors.nik ? errors.nik : null}
                  />

                  <TextField
                    id='noTelp'
                    name='noTelp'
                    label='Nomor Telepon'
                    required
                    fullWidth
                    variant='outlined'
                    margin='normal'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.noTelp}
                    error={Boolean(touched.noTelp && errors.noTelp)}
                    helperText={touched.noTelp && errors.noTelp ? errors.noTelp : null}
                  />

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

                  <FormControl variant="outlined" fullWidth margin='normal' required error={Boolean(touched.password && errors.password)}>
                    <InputLabel htmlFor="password">Kata Sandi</InputLabel>
                    <OutlinedInput
                      id="password"
                      name='password'
                      type={showPassword ? 'text' : 'password'}
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      labelWidth={95}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={this.handleClickShowPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
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
                  >{isSubmitting ? <CircularProgress size={25} /> : 'Registrasi'}</Button>

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

const mapDispatchToProps = (dispatch) => ({
  register: (data) => dispatch(register(data))
});

export default connect(null, mapDispatchToProps)(withStyles(styles)(withSnackbar(Register)));
