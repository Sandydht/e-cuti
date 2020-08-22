import React, { Component, Fragment } from 'react';

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Alert from "@material-ui/lab/Alert";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CircularProgress from '@material-ui/core/CircularProgress';
import Avatar from "@material-ui/core/Avatar";

// Firebase 
import { pns, fotoPNS } from "../api/Firebase";

// React router dom
import {
  NavLink
} from "react-router-dom";

// Notistack
import { withSnackbar } from "notistack";

// Styles
const styles = (theme) => ({
  avatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  }
});

class DetailPNS extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataPNS: {},
      isLoading: true,
      openDialog: false,
      buttonLoading: false,
    };
  }

  UNSAFE_componentWillMount() {
    const { match } = this.props;
    pns
      .doc(match.params.id)
      .get()
      .then((querySnapshot) => {
        this.setState({
          dataPNS: querySnapshot.data(),
          isLoading: false
        });
      });
  }

  handleOpenDialog = () => {
    this.setState({
      openDialog: true
    });
  };

  handleCloseDialog = () => {
    this.setState({
      openDialog: false
    });
  };

  handleDelete = () => {
    const { history, enqueueSnackbar, match } = this.props;
    this.setState({
      buttonLoading: true
    });
    pns
      .doc(match.params.id)
      .delete()
      .then(() => {
        fotoPNS
          .child(match.params.id)
          .delete()
          .then(() => {
            this.setState({
              buttonLoading: false
            });
            enqueueSnackbar("Data berhasil dihapus", { variant: "success" });
            history.replace("/beranda/data_pns");
          });
      })
      .catch(() => {
        this.setState({
          buttonLoading: false
        });
        enqueueSnackbar("Data gagal dihapus", { variant: "error" });
      });
  };

  render() {
    const { match, classes } = this.props;
    const { isLoading, dataPNS, openDialog, buttonLoading } = this.state;

    return (
      <Fragment>
        <Dialog open={openDialog} fullWidth maxWidth="xs">
          <DialogTitle>Hapus Data PNS ?</DialogTitle>
          <DialogActions>
            <Button
              color="primary"
              variant="outlined"
              onClick={this.handleCloseDialog}
            >Batal</Button>

            <Button
              color="primary"
              variant="contained"
              onClick={this.handleDelete}
              disabled={buttonLoading}
            >{buttonLoading ? <CircularProgress size={25} /> : "Hapus"}</Button>
          </DialogActions>
        </Dialog>

        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardHeader title="Foto PNS" />
              <Divider />
              <CardContent>
                {
                  isLoading ? (
                    <Box p={5}>
                      <Grid container justify="center">
                        <Grid item>
                          <CircularProgress />
                        </Grid>
                      </Grid>
                    </Box>
                  ) : (
                      <Grid container justify="center" alignItems="center">
                        <Grid item>
                          <Avatar src={dataPNS.fotoUrl} className={classes.avatar} />
                        </Grid>
                      </Grid>
                    )
                }
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={8}>
            <Card>
              <CardHeader title="Detail PNS" />
              <Divider />
              <CardContent>
                {
                  isLoading ? (
                    <Box p={5}>
                      <Grid container justify="center">
                        <Grid item>
                          <CircularProgress />
                        </Grid>
                      </Grid>
                    </Box>
                  ) : (
                      <Fragment>
                        <Table>
                          <TableBody>
                            <TableRow>
                              <TableCell>NIP</TableCell>
                              <TableCell>{dataPNS.nip}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>NIK</TableCell>
                              <TableCell>{dataPNS.nik}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Nama</TableCell>
                              <TableCell>{dataPNS.nama}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Golongan</TableCell>
                              <TableCell>{dataPNS.golongan}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Unit Kerja</TableCell>
                              <TableCell>{dataPNS.unitKerja}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Status Akun</TableCell>
                              <TableCell>
                                {
                                  dataPNS.uid ? (
                                    <Alert icon={false} severity="success">Teregistrasi</Alert>
                                  ) : (
                                      <Alert icon={false} severity="error">Belum teregistrasi</Alert>
                                    )
                                }
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>

                        <Box mt={2}>
                          <Grid container spacing={1}>
                            <Grid item xs={12} md={12}>
                              <Button startIcon={<EditIcon />} color="primary" variant="contained" fullWidth component={NavLink} to={`/beranda/data_pns/${match.params.id}/edit`}>Edit</Button>
                            </Grid>
                            <Grid item xs={12} md={12}>
                              <Button startIcon={<DeleteIcon />} color="secondary" variant="contained" fullWidth disabled={Boolean(dataPNS.uid)} onClick={this.handleOpenDialog}>Hapus</Button>
                            </Grid>
                          </Grid>
                        </Box>
                      </Fragment>
                    )
                }
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}
export default withStyles(styles)(withSnackbar(DetailPNS)); 