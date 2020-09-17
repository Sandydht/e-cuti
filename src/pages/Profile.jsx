import React, { Component, Fragment } from 'react';

// Material UI
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';

// Firebase
import firebase from '../config/firebase';

// Redux
import { connect } from 'react-redux';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: {}
    };

    this.subscribe = false;
  }

  userData = (data) => {
    this.setState({
      isLoading: false,
      data
    });
  };

  componentDidMount() {
    this.subscribe = true;
    return firebase.firestore().collection('pns').where('uid', '==', this.props.uid)
      .onSnapshot((querySnapshot) => {
        let data = {};
        querySnapshot.forEach(doc => data = doc.data());
        if (this.subscribe) {
          this.userData(data);
        }
      });
  }

  componentWillUnmount() {
    this.subscribe = false;
  }

  render() {
    const { data, isLoading } = this.state;

    return (
      <Card>
        {
          isLoading ? (
            <Box p={10}>
              <Grid container justify='center'>
                <Grid item>
                  <CircularProgress />
                </Grid>
              </Grid>
            </Box>
          ) : (
              <Fragment>
                <CardHeader title='Profil' />
                <Divider />
                <CardContent>
                  <TextField
                    label='NIP'
                    fullWidth
                    variant='outlined'
                    margin='normal'
                    value={data.nip}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    label='NIK'
                    fullWidth
                    variant='outlined'
                    margin='normal'
                    value={data.nik}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    label='Nama'
                    fullWidth
                    variant='outlined'
                    margin='normal'
                    value={data.nama}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    label='Golongan'
                    fullWidth
                    variant='outlined'
                    margin='normal'
                    value={data.golongan}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    label='Unit Kerja'
                    fullWidth
                    variant='outlined'
                    margin='normal'
                    value={data.unitKerja}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    label='Nomor Telepon'
                    fullWidth
                    variant='outlined'
                    margin='normal'
                    value={data.noTelp}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    label='Email'
                    fullWidth
                    variant='outlined'
                    margin='normal'
                    value={data.email}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </CardContent>
              </Fragment>
            )
        }
      </Card>
    );
  }
}

const mapStateToProps = ({ session }) => ({
  uid: session.user.uid
});

export default connect(mapStateToProps)(Profile);
