import React, { Component } from 'react';

// Material UI
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";

// Firebase
import { pns, cuti } from "../api/Firebase";

// Redux
import { connect } from "react-redux";

// Notistack
import { withSnackbar } from "notistack";

// Formik & Yup
import { Formik, Form } from "formik";
import * as Yup from "yup";

// Validation schema
const validationSchema = Yup.object().shape({
  nip: Yup
    .string()
    .required("Harap isi form nip")
    .matches(/^((?!(0))[0-9]{18})$/, "NIP setidaknya 18 digit angka"),
  nama: Yup
    .string()
    .required("Harap isi form nama"),
  golongan: Yup
    .string()
    .required("Harap isi form golongan"),
  tglMulai: Yup
    .date()
    .required("Harap isi form tanggal mulai"),
  tglSelesai: Yup
    .date()
    .required("Harap isi form tanggal selesai"),
  alamatSelamaCuti: Yup
    .string()
    .required("Harap isi form alamat selama cuti")
});

class FormPengajuan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataPNS: {},
      isLoading: true
    };
  }

  UNSAFE_componentWillMount() {
    const { uid } = this.props;
    pns
      .where("uid", "==", uid)
      .get()
      .then((querySnapshot) => {
        let data = {};
        querySnapshot.forEach(doc => data = doc.data());
        this.setState({
          dataPNS: data,
          isLoading: false
        });
      });
  }

  render() {
    const { open, title, onClose, jenisCuti } = this.props;
    const { isLoading, dataPNS } = this.state;

    return (
      <Dialog
        open={open}
        fullWidth
        maxWidth="xs"
        scroll="body"
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          {
            isLoading ? (
              <Box mt={8} mb={8}>
                <Grid container justify="center">
                  <Grid item>
                    <CircularProgress />
                  </Grid>
                </Grid>
              </Box>
            ) : (
                <Formik
                  initialValues={{
                    nip: dataPNS.nip,
                    nama: dataPNS.nama,
                    golongan: dataPNS.golongan,
                    unitKerja: dataPNS.unitKerja,
                    tglMulai: "",
                    tglSelesai: "",
                    jenisCuti: jenisCuti,
                    alamatSelamaCuti: ""
                  }}
                  validationSchema={validationSchema}
                  onSubmit={({ nip, tglMulai, tglSelesai, jenisCuti, alamatSelamaCuti }, { setSubmitting }) => {
                    const { enqueueSnackbar } = this.props;

                    // Menghitung lama hari
                    const date1 = Date.parse(tglMulai);
                    const date2 = Date.parse(tglSelesai);
                    const lamaHari = (((date2 - date1) / (1000 * 3600 * 24)) + 1);
                    const hari = lamaHari - (parseInt(lamaHari / 7) * 2);

                    // Mencari tanggal hari ini
                    let today = new Date();
                    let yyyy = today.getFullYear();
                    let mm = today.getMonth() + 1;
                    let dd = today.getDate();
                    if (mm < 10) {
                      mm = `0${mm}`;
                    }
                    today = `${yyyy}-${mm}-${dd}`;

                    if (Date.parse(tglMulai) <= Date.parse(today)) {
                      setSubmitting(false);
                      enqueueSnackbar("Mohon untuk mengajukan cuti minimal h-1", { variant: "error" });
                    } else if (date2 < date1) {
                      setSubmitting(false);
                      enqueueSnackbar("Periksa kembali tanggal pengajuan anda", { variant: "error" });
                    } else {
                      cuti
                        .add({
                          nip,
                          tglPengajuan: today,
                          tglMulai: tglMulai,
                          tglSelesai: tglSelesai,
                          lamaCuti: `${hari} hari`,
                          jenisCuti: jenisCuti,
                          alamatSelamaCuti: alamatSelamaCuti,
                          status: "Menunggu"
                        })
                        .then(() => {
                          setSubmitting(false);
                          enqueueSnackbar("Cuti telah diajukan", { variant: "success" });
                          onClose();
                        })
                        .catch(() => {
                          setSubmitting(false);
                          enqueueSnackbar("Cuti gagal diajukan", { variant: "error" });
                        });
                    }
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
                        <TextField
                          id="nip"
                          name="nip"
                          label="NIP"
                          fullWidth
                          variant="outlined"
                          margin="normal"
                          error={Boolean(touched.nip && errors.nip)}
                          helperText={touched.nip && errors.nip ? errors.nip : null}
                          value={values.nip}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                        <TextField
                          id="nama"
                          name="nama"
                          label="Nama"
                          fullWidth
                          variant="outlined"
                          margin="normal"
                          error={Boolean(touched.nama && errors.nama)}
                          helperText={touched.nama && errors.nama ? errors.nama : null}
                          value={values.nama}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                        <TextField
                          id="golongan"
                          name="golongan"
                          label="Golongan"
                          fullWidth
                          variant="outlined"
                          margin="normal"
                          error={Boolean(touched.golongan && errors.golongan)}
                          helperText={touched.golongan && errors.golongan ? errors.golongan : null}
                          value={values.golongan}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                        <TextField
                          id="unitKerja"
                          name="unitKerja"
                          label="Unit Kerja"
                          fullWidth
                          variant="outlined"
                          margin="normal"
                          error={Boolean(touched.unitKerja && errors.unitKerja)}
                          helperText={touched.unitKerja && errors.unitKerja ? errors.unitKerja : null}
                          value={values.unitKerja}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                        <TextField
                          id="tglMulai"
                          name="tglMulai"
                          label="Tanggal Mulai"
                          type="date"
                          fullWidth
                          variant="outlined"
                          margin="normal"
                          error={Boolean(touched.tglMulai && errors.tglMulai)}
                          helperText={touched.tglMulai && errors.tglMulai ? errors.tglMulai : null}
                          value={values.tglMulai}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                        <TextField
                          id="tglSelesai"
                          name="tglSelesai"
                          label="Tanggal Selesai"
                          type="date"
                          fullWidth
                          variant="outlined"
                          margin="normal"
                          error={Boolean(touched.tglSelesai && errors.tglSelesai)}
                          helperText={touched.tglSelesai && errors.tglSelesai ? errors.tglSelesai : null}
                          value={values.tglSelesai}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                        <TextField
                          id="alamatSelamaCuti"
                          label="Alamat Selama Cuti"
                          multiline
                          fullWidth
                          margin="normal"
                          rows={4}
                          variant="outlined"
                          error={Boolean(touched.alamatSelamaCuti && errors.alamatSelamaCuti)}
                          helperText={touched.alamatSelamaCuti && errors.alamatSelamaCuti ? errors.alamatSelamaCuti : null}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.alamatSelamaCuti}
                        />

                        <Box mt={1} mb={1}>
                          <Grid container spacing={2} justify="flex-end">
                            <Grid item>
                              <Button color="primary" variant="outlined" onClick={onClose}>Batal</Button>
                            </Grid>
                            <Grid item>
                              <Button
                                type="submit"
                                color="primary"
                                variant="contained"
                                disabled={isSubmitting}
                              >{isSubmitting ? <CircularProgress size={25} /> : "Ajukan"}</Button>
                            </Grid>
                          </Grid>
                        </Box>
                      </Form>
                    )}
                </Formik>
              )
          }
        </DialogContent>
      </Dialog>
    );
  }
}

const mapStateToProps = ({ session }) => ({
  uid: session.user.uid
});

export default connect(mapStateToProps, null)(withSnackbar(FormPengajuan)); 