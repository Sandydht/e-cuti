import React, { Component } from 'react';

// Material UI
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

// Icons
import SaveIcon from '@material-ui/icons/Save';

// Formik & Yup 
import { Formik, Form } from "formik";
import * as Yup from "yup";

// Validation schema
const validationSchema = Yup.object().shape({
  pertimbangan: Yup.string()
    .required("Harap berikan pertimbangan"),
  keterangan: Yup.string()
    .required("Harap isi form keterangan")
});

class Aproval extends Component {
  render() {
    return (
      <Formik
        initialValues={{
          pertimbangan: "",
          keterangan: ""
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
            <Form>
              <FormControl
                component="fieldset"
                margin="normal"
                fullWidth
                required
                error={Boolean(touched.pertimbangan && errors.pertimbangan)}
              >
                <FormLabel component="legend">Pertimbangan</FormLabel>
                <RadioGroup
                  aria-label="pertimbangan"
                  id="pertimbangan"
                  name="pertimbangan"
                  value={values.pertimbangan}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <FormControlLabel value="Disetujui" control={<Radio />} label="Disetujui" />
                  <FormControlLabel value="Tidak Disetujui" control={<Radio />} label="Tidak Disetujui" />
                </RadioGroup>
                <FormHelperText>{touched.pertimbangan && errors.pertimbangan ? errors.pertimbangan : null}</FormHelperText>
              </FormControl>

              <TextField
                id="keterangan"
                name="keterangan"
                label="Keterangan"
                variant="outlined"
                fullWidth
                multiline
                required
                rows={4}
                margin="normal"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.keterangan}
                error={Boolean(touched.keterangan && errors.keterangan)}
                helperText={touched.keterangan && errors.keterangan ? errors.keterangan : null}
              />

              <Box mt={2}>
                <Grid container justify="flex-end">
                  <Grid item>
                    <Button
                      type="submit"
                      color="primary"
                      variant="contained"
                      startIcon={<SaveIcon />}
                      disabled={isSubmitting}
                    >{isSubmitting ? <CircularProgress size={25} /> : "Simpan"}</Button>
                  </Grid>
                </Grid>
              </Box>
            </Form>
          )}
      </Formik>
    );
  }
}

export default Aproval;
