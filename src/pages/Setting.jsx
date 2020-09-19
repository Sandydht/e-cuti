import React, { Component } from 'react';

// Material UI
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';

// Material icons
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import SaveIcon from '@material-ui/icons/Save';

// Formik & Yup
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

// Firebase
import firebase from '../config/firebase';

// Notistack
import { withSnackbar } from 'notistack';

// Validation schema
const validationSchema = Yup.object().shape({

});

class Setting extends Component {
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
    const { showPassword } = this.state;

    return (
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Pengaturan Ulang Kata Sandi</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container>
            <Grid item xs={12} md={12}>
              <Formik
                initialValues={{
                  newPassword: ''
                }}
                validationSchema={validationSchema}
                onSubmit={({ newPassword }, { setSubmitting, resetForm }) => {
                  const user = firebase.auth().currentUser;
                  user.updatePassword(newPassword)
                    .then(() => {
                      setSubmitting(false);
                      resetForm();
                      this.props.enqueueSnackbar('Kata sandi berhasil diperbarui', { variant: 'success', preventDuplicate: true, });
                    })
                    .catch(() => {
                      setSubmitting(false);
                      this.props.enqueueSnackbar('Mohon untuk login kembali', { variant: 'error', preventDuplicate: true, });
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
                      <FormControl variant="outlined" fullWidth margin='normal' required error={Boolean(touched.newPassword && errors.newPassword)}>
                        <InputLabel htmlFor="newPassword">Kata Sandi Baru</InputLabel>
                        <OutlinedInput
                          id="newPassword"
                          name='newPassword'
                          type={showPassword ? 'text' : 'password'}
                          value={values.newPassword}
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
                        <FormHelperText>{touched.newPassword && errors.newPassword ? errors.newPassword : null}</FormHelperText>
                      </FormControl>

                      <Grid container justify='flex-end'>
                        <Grid item>
                          <Button
                            type='submit'
                            color='primary'
                            variant='contained'
                            startIcon={<SaveIcon />}
                            disabled={isSubmitting}
                          >{isSubmitting ? <CircularProgress size={25} /> : 'Simpan'}</Button>
                        </Grid>
                      </Grid>
                    </Form>
                  )}
              </Formik>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    );
  }
}

export default withSnackbar(Setting);
