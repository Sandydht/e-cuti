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
import ProgressPengajuanCuti from '../molecules/ProgressPengajuanCuti';

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
      }, () => {
        this.setState({
          isLoading: false,
          data: {}
        });
      });
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.cutiId !== prevProps.match.params.cutiId) {
      this.subscribe = true;
      this.setState({ isLoading: true });
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
        }, () => {
          this.setState({
            isLoading: false,
            data: {}
          });
        });
    }
  }

  componentWillUnmount() {
    this.subscribe = false;
  }

  render() {
    const { role, ...rest } = this.props;
    const { isLoading, data } = this.state;
    moment().locale('id');

    return (
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
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
                    <CardHeader title={`Detail ${data.jenisCuti}`} />
                    <Divider />
                    <CardContent>
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
                        label='Jenis Cuti'
                        fullWidth
                        variant='outlined'
                        margin='normal'
                        value={data.jenisCuti}
                        disabled
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
                        disabled
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                      <TextField
                        label='Tanggal Pengajuan'
                        fullWidth
                        variant='outlined'
                        margin='normal'
                        value={data.tglPengajuan}
                        disabled
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
                              disabled
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
                              disabled
                              fullWidth
                              InputProps={{
                                readOnly: true,
                              }}
                            />
                          </Grid>
                        </Grid>
                      </Box>
                      <TextField
                        label='Lama Cuti'
                        fullWidth
                        variant='outlined'
                        margin='normal'
                        value={data.lamaCuti}
                        disabled
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                      <TextField
                        label='Alamat Selama Menjalankan Cuti'
                        fullWidth
                        multiline
                        rows={4}
                        margin='normal'
                        variant='outlined'
                        value={data.alamatSelamaCuti}
                        disabled
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </CardContent>
                  </Fragment>
                )
            }
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          {
            role === 'admin' ? (
              data.aproval ? (
                <ProgressPengajuanCuti {...rest} />
              ) : (
                  <Aproval {...rest} isLoading={isLoading} />
                )
            ) : (
                <ProgressPengajuanCuti {...rest} />
              )
          }
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = ({ session }) => ({
  role: session.user.role
});

export default connect(mapStateToProps)(DetailCuti);
