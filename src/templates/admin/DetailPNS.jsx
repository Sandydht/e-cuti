import React, { Component, Fragment } from 'react';

// Material UI
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import CardContent from '@material-ui/core/CardContent';

// Firebase
import firebase from '../../config/firebase';

// Moment
import moment from 'moment';
import 'moment/locale/id';

// Molecules
import HapusDataPNS from '../../molecules/HapusDataPNS';
import EditDataPNS from '../../molecules/EditDataPNS';

class DetailPNS extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: {}
    };

    this.subscribe = false;
  }

  dataPNS = (data) => {
    this.setState({
      isLoading: false,
      data
    });
  };

  componentDidMount() {
    this.subscribe = true;
    return firebase
      .firestore()
      .collection('pns')
      .doc(this.props.match.params.pnsId)
      .onSnapshot(doc => {
        if (doc.exists) {
          if (this.subscribe) {
            this.dataPNS(doc.data());
          }
        }
      });
  }

  componentWillUnmount() {
    this.subscribe = false;
  }

  render() {
    const { isLoading, data } = this.state;
    const { ...rest } = this.props;
    moment().locale('id');

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
                <CardHeader title='Detail PNS' />
                <Divider />
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                      <TextField
                        label='NIP'
                        fullWidth
                        variant='outlined'
                        margin='normal'
                        value={data.nip}
                        disabled
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
                        disabled
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
                        disabled
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
                        disabled
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
                        disabled
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
                        disabled
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
                        disabled
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                      <TextField
                        label='Status Registrasi Akun'
                        fullWidth
                        variant='outlined'
                        margin='normal'
                        value={data.register === true ? 'Teregistrasi' : 'Belum Teregistrasi'}
                        disabled
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                      <TextField
                        label='Tanggal Registrasi Akun'
                        fullWidth
                        variant='outlined'
                        margin='normal'
                        value={moment(data.createdAt).format('L, LT') ? moment(data.createdAt).format('L, LT') : '-'}
                        disabled
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                          <EditDataPNS {...rest} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <HapusDataPNS disabled={data.register} {...rest} />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </CardContent>
              </Fragment>
            )
        }
      </Card>
    );
  }
}

export default DetailPNS;
