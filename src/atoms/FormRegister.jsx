import React, { Component } from 'react';

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from "@material-ui/core/CircularProgress";

// Formik & Yup
import { Formik, Form } from "formik";
import * as Yup from "yup";

// Validation schema
const validationSchema = Yup.object().shape({
  email: Yup
    .string()
    .required("Harap isi form email")
    .email("Email tidak valid")
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

class FormRegister extends Component {
  render() {
    const { classes } = this.props;
    return (
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
                required
                margin="normal"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email ? errors.email : null}
              />

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

export default withStyles(styles)(FormRegister); 