import React, { Component, Fragment } from 'react';

// Material UI
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';

// Firebase
import firebase from '../config/firebase';

// Moment
import moment from 'moment';
import 'moment/locale/id';

// Redux
import { connect } from 'react-redux';

// Molecules
import Aproval from '../molecules/Aproval';

class DetailCuti extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: {}
    };

    this.subscribe = false;
  }

  dataCuti = (data) => {
    this.setState({
      isLoading: false,
      data
    });
  };

  componentDidMount() {
    this.subscribe = true;
    return firebase
      .firestore()
      .collection('cuti')
      .doc(this.props.match.params.cutiId)
      .onSnapshot(doc => {
        if (this.subscribe) {
          this.dataCuti({
            cutiId: doc.id,
            nip: doc.data().nip,
            nama: doc.data().nama,
            golongan: doc.data().golongan,
            unitKerja: doc.data().unitKerja,
            noTelp: doc.data().noTelp,
            jenisCuti: doc.data().jenisCuti,
            alasanCuti: doc.data().alasanCuti,
            tglPengajuan: moment(doc.data().tglPengajuan).format('L, LT'),
            tglMulai: moment(doc.data().tglMulai).format('L'),
            tglSelesai: moment(doc.data().tglSelesai).format('L'),
            lamaCuti: doc.data().lamaCuti,
            alamatSelamaCuti: doc.data().alamatSelamaCuti,
            aproval: doc.data().aproval,
          });
        }
      });
  }

  componentWillUnmount() {
    this.subscribe = false;
  }

  render() {
    const { role } = this.props;
    const { isLoading, data } = this.state;
    moment().locale('id');

    return (
      <Fragment>
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
                <Grid container spacing={2}>
                  <Grid item xs={12} md={8}>
                    <Card>
                      <CardHeader title={`Detail ${data.jenisCuti}`} />
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
                          label='Jenis Cuti'
                          fullWidth
                          variant='outlined'
                          margin='normal'
                          value={data.jenisCuti}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                        <TextField
                          label='Alasan Cuti'
                          fullWidth
                          variant='outlined'
                          margin='normal'
                          value={data.alasanCuti}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                        <Box mt={2} mb={1}>
                          <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                              <TextField
                                label='Tanggal Mulai'
                                variant='outlined'
                                fullWidth
                                value={data.tglMulai}
                                InputProps={{
                                  readOnly: true,
                                }}
                              />
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <TextField
                                label='s.d Tanggal'
                                variant='outlined'
                                value={data.tglSelesai}
                                fullWidth
                                InputProps={{
                                  readOnly: true,
                                }}
                              />
                            </Grid>
                          </Grid>
                        </Box>
                        <TextField
                          label='Alamat Selama Menjalankan Cuti'
                          fullWidth
                          multiline
                          rows={4}
                          margin='normal'
                          variant='outlined'
                          value={data.alamatSelamaCuti}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    {
                      role === 'admin' ? (
                        <Aproval />
                      ) : (
                          <div>Progress pengajuan cuti</div>
                        )
                    }
                  </Grid>
                </Grid>
              </Fragment>
            )
        }
      </Fragment>
    );
  }
}

const mapStateToProps = ({ session }) => ({
  role: session.user.role
});

export default connect(mapStateToProps)(DetailCuti);
