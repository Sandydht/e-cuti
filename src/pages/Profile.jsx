import React, { Component } from 'react';

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

// Firebase 
import { pns } from "../api/Firebase";

// Redux 
import { connect } from "react-redux";

// Styles
const styles = (theme) => ({
  avatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  }
});

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataPNS: {},
      isLoading: true
    };

    this.unsubscribe = null;
  }

  collectionOnSnapshot = (querySnapshot) => {
    let data = {};
    querySnapshot.forEach(doc => data = doc.data());
    this.setState({
      dataPNS: data,
      isLoading: false
    });
  };

  UNSAFE_componentWillMount() {
    const { uid } = this.props;
    this.unsubscribe = pns.where("uid", "==", uid).onSnapshot(this.collectionOnSnapshot);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { classes } = this.props;
    const { dataPNS, isLoading } = this.state;

    return (
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader title="Foto Profil" />
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
                    <Grid container justify="center">
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
            <CardHeader title="Detail Profil" />
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
                      </TableBody>
                    </Table>
                  )
              }
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = ({ session }) => ({
  uid: session.user.uid
});

export default connect(mapStateToProps, null)(withStyles(styles)(Profile)); 