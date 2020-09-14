import React, { Component } from 'react';

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';

// Icons
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SaveIcon from '@material-ui/icons/Save';

// Formik & Yup
import { Formik, Form } from "formik";
import * as Yup from "yup";

// Redux
import { connect } from "react-redux";
import { resetPassword } from "../redux/actions";

// Notistack
import { withSnackbar } from "notistack";

// Validation schema
const validationSchema = Yup.object().shape({
  newPassword: Yup
    .string()
    .required('Harap isi form kata sandi baru')
});

// Styles
const styles = (theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
});

class Setting extends Component {
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

      <div className={classes.root}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>Pengaturan Ulang Kata Sandi</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container>
              <Grid item xs={12} md={12}>
                <Formik
                  initialValues={{
                    newPassword: ""
                  }}
                  validationSchema={validationSchema}
                  onSubmit={(values, { setSubmitting, resetForm }) => {
                    console.log(values);
                    this.props.resetPassword(values)
                      .then(() => {
                        setSubmitting(false);
                        resetForm();
                        this.props.enqueueSnackbar("Kata sandi berhasil diperbarui", { variant: "success", preventDuplicate: true });
                      })
                      .catch(() => {
                        setSubmitting(false);
                        this.props.enqueueSnackbar("Mohon untuk login ulang", { variant: "error", preventDuplicate: true });
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
                      <Form>
                        <FormControl variant="outlined" fullWidth margin="normal" error={Boolean(touched.newPassword && errors.newPassword)} required>
                          <InputLabel htmlFor="newPassword">Kata Sandi Baru</InputLabel>
                          <OutlinedInput
                            id="newPassword"
                            name="newPassword"
                            type={showPassword ? "text" : "password"}
                            labelWidth={130}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.newPassword}
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
                          <FormHelperText>{touched.newPassword && errors.newPassword ? errors.newPassword : null}</FormHelperText>
                        </FormControl>

                        <Box mt={1}>
                          <Grid container justify='flex-end'>
                            <Grid item xs={12} md={2}>
                              <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                disabled={isSubmitting}
                                startIcon={<SaveIcon />}
                              >{isSubmitting ? <CircularProgress size={25} /> : "Simpan"}</Button>
                            </Grid>
                          </Grid>
                        </Box>
                      </Form>
                    )}
                </Formik>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  resetPassword: (newPassword) => dispatch(resetPassword(newPassword))
});

export default connect(null, mapDispatchToProps)(withStyles(styles)(withSnackbar(Setting)));
