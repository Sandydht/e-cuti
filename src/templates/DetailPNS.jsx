import React, { Component, Fragment } from 'react';

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import EditIcon from '@material-ui/icons/Edit';

// React router dom
import { NavLink } from "react-router-dom";

// Atoms 
import HapusDataPNS from "../atoms/HapusDataPNS";

// Firebase
import firebase from "../api/Firebase";

// Styles
const styles = (theme) => ({
  avatar: {
    width: theme.spacing(15),
    height: theme.spacing(15)
  }
});

class DetailPNS extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      id: "",
      data: {}
    };

    this.pns = firebase.firestore().collection("pns");
  }

  getDataPNS = (querySnapshot) => {
    let data = [];
    querySnapshot.forEach(doc => data.push({
      id: doc.id,
      data: doc.data()
    }));
    this.setState((state, props) => ({
      isLoading: false,
      id: data[props.match.params.id].id,
      data: data[props.match.params.id]
    }));
  };

  UNSAFE_componentWillMount() {
    this.pns
      .get()
      .then(this.getDataPNS);
  }

  render() {
    const { classes, match, ...rest } = this.props;
    const { isLoading, data, id } = this.state;

    return (
      <Grid container spacing={2}>
        <Grid item md={4} xs={12}>
          <Card>
            <CardHeader title="Foto PNS" />
            <Divider />
            <CardContent>
              <Grid container justify="center">
                <Grid item>
                  {
                    isLoading ? (
                      <Box p={5}>
                        <CircularProgress />
                      </Box>
                    ) : (
                        <Avatar src={data.fotoUrl} className={classes.avatar} />
                      )
                  }
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={8} xs={12}>
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
                            <TableCell>{data.data.nip}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>NIK</TableCell>
                            <TableCell>{data.data.nik}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Nama</TableCell>
                            <TableCell>{data.data.nama}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Golongan</TableCell>
                            <TableCell>{data.data.golongan}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Unit Kerja</TableCell>
                            <TableCell>{data.data.unitKerja}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Status Akun</TableCell>
                            <TableCell>
                              {data.data.uid ? <Alert icon={false}>Teregistrasi</Alert> : <Alert icon={false} severity="error">Belum teregistrasi</Alert>}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>

                      <Box mt={2}>
                        <Grid container spacing={1}>
                          <Grid item md={12} xs={12}>
                            <Button
                              startIcon={<EditIcon />}
                              color="primary"
                              variant="contained"
                              fullWidth
                              component={NavLink}
                              to={`/beranda/${match.params.id}/edit`}
                            >
                              Edit
                            </Button>
                          </Grid>
                          <Grid item md={12} xs={12}>
                            <HapusDataPNS id={id} {...rest} />
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
    );
  }
}
export default withStyles(styles)(DetailPNS); 