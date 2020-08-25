import React, { Component } from 'react';

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";
import CardContent from "@material-ui/core/CardContent";

// Firebase
import firebase from "../api/Firebase";

// Styles
const styles = (theme) => ({
  avatar: {
    width: theme.spacing(15),
    height: theme.spacing(15)
  }
});

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: {}
    };

    this.auth = firebase.auth();
    this.ref = firebase.firestore().collection("pns");
  }

  getDataProfile = (querySnapshot) => {
    let data = {};
    querySnapshot.forEach(doc => data = doc.data());
    this.setState({
      isLoading: false,
      data
    });
  };

  UNSAFE_componentWillMount() {
    this.unsubscribe = this.auth
      .onAuthStateChanged((user) => {
        if (user) {
          const uid = user.uid;
          this.unsubscribe = this.ref
            .where("uid", "==", uid)
            .onSnapshot(this.getDataProfile);
        }
      });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { classes } = this.props;
    const { isLoading, data } = this.state;
    return (
      <Grid container spacing={2}>
        <Grid item md={4} xs={12}>
          <Card>
            <CardHeader title="Foto Profil" />
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
            <CardHeader title="Detail Profil" />
            <Divider />
            <CardContent>

            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Profile);