import React, { Component } from 'react';
import logo from "../images/logo-prov-jateng.png";

// React router dom
import { Link as RouteLink } from "react-router-dom";

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
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

// Icons
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

// Formik & Yup
import { Formik, Form } from "formik";
import * as Yup from "yup";

// Validation schema
const validationSchema = Yup.object().shape({

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
        <CssBaseline />
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
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            {() => (
              <Form className={classes.form}>
                <TextField
                  id="email"
                  name="email"
                  label="Email"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  required
                />

                <FormControl variant="outlined" fullWidth margin="normal" required>
                  <InputLabel htmlFor="password">Kata Sandi</InputLabel>
                  <OutlinedInput
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    labelWidth={95}
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
                </FormControl>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >Masuk</Button>
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
          <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © E-Cuti '}
            {new Date().getFullYear()}
          </Typography>
        </Box>
      </Container>
    );
  }
}

export default withStyles(styles)(Login);
