import React, { Component } from 'react';

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

// Notistack
import { withSnackbar } from "notistack";

// Formik & Yup
import { Formik, Form } from "formik";
import * as Yup from "yup";

// Redux
import { connect } from "react-redux";
import { loginAPI } from "../api/Redux/actions";

// Validation schema
const validationSchema = Yup.object().shape({
  email: Yup
    .string()
    .required("Harap isi form email")
    .email("Email tidak valid"),
  password: Yup
    .string()
    .required("Harap isi form kata sandi")
});

// Styles
const styles = (theme) => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class FormLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false
    };
  }

  handleShowPassword = () => {
    this.setState((state) => ({
      showPassword: !state.showPassword
    }));
  };

  render() {
    const { classes, loginAPI, enqueueSnackbar, history } = this.props;
    const { showPassword } = this.state;

    return (
      <Formik
        initialValues={{
          email: "",
          password: ""
        }}
        validationSchema={validationSchema}
        onSubmit={({ email, password }, { setSubmitting }) => {
          loginAPI({ email, password })
            .then(() => {
              const { from } = { from: { pathname: "/" } };
              setSubmitting(false);
              history.replace(from);
            })
            .catch(() => {
              setSubmitting(false);
              enqueueSnackbar("Periksa kembali email dan kata sandi", { variant: "error" });
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
                id="email"
                name="email"
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email ? errors.email : null}
              />

              <FormControl fullWidth margin="normal" variant="outlined" error={Boolean(touched.password && errors.password)}>
                <InputLabel htmlFor="password">Kata Sandi</InputLabel>
                <OutlinedInput
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  labelWidth={82}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        edge="end"
                        onClick={this.handleShowPassword}
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
                color="primary"
                variant="contained"
                fullWidth
                disabled={isSubmitting}
                className={classes.submit}
              >
                {isSubmitting ? <CircularProgress size={25} /> : "Masuk"}
              </Button>
            </Form>
          )}
      </Formik>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  loginAPI: (data) => dispatch(loginAPI(data))
});

export default connect(null, mapDispatchToProps)(withStyles(styles)(withSnackbar(FormLogin))); 