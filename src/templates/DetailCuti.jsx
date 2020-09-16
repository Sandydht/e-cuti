import React, { Component, Fragment } from 'react';

// Material UI
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';

// Material icons
import FindInPageIcon from '@material-ui/icons/FindInPage';

// Firebase
import firebase from '../config/firebase';

// Moment
import moment from 'moment';
import 'moment/locale/id';

class DetailCuti extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      isLoading: true,
      data: {}
    };

    this.subscribe = false;
  }

  handleOpenDialog = () => {
    this.setState({
      open: true
    });
  };

  handleCloseDialog = () => {
    this.setState({
      open: false
    });
  };

  detailCuti = (data) => {
    this.setState({
      isLoading: false,
      data
    });
  };

  componentDidMount() {
    this.subscribe = true;
    return firebase.firestore().collection('cuti').doc(this.props.cutiId)
      .onSnapshot((doc) => {
        if (doc.exists && this.subscribe) {
          this.detailCuti(doc.data());
        }
      });
  }

  componentWillUnmount() {
    this.subscribe = false;
  }

  render() {
    const { open, isLoading, data } = this.state;
    moment().locale('id');

    return (
      <Fragment>
        <Button
          color='primary'
          variant='contained'
          size='small'
          startIcon={<FindInPageIcon />}
          onClick={this.handleOpenDialog}
        >Detail</Button>

        <Dialog
          open={open}
          fullWidth
          maxWidth='xs'
        >
          <DialogTitle>Detail {data.jenisCuti}</DialogTitle>
          <DialogContent>
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
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                      <Card variant='outlined'>
                        <CardHeader subheader='Detail Cuti' />
                        <Divider />
                        <CardContent>
                          <TextField
                            label='NIP'
                            variant='outlined'
                            fullWidth
                            margin='normal'
                            value={data.nip}
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                          <TextField
                            label='Nama'
                            variant='outlined'
                            fullWidth
                            margin='normal'
                            value={data.nama}
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                          <TextField
                            label='Golongan'
                            variant='outlined'
                            fullWidth
                            margin='normal'
                            value={data.golongan}
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                          <TextField
                            label='Unit Kerja'
                            variant='outlined'
                            fullWidth
                            margin='normal'
                            value={data.unitKerja}
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                          <TextField
                            label='Nomor Telepon'
                            variant='outlined'
                            fullWidth
                            margin='normal'
                            value={data.noTelp}
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                          <TextField
                            label='Jenis Cuti'
                            variant='outlined'
                            fullWidth
                            margin='normal'
                            value={data.jenisCuti}
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                          <TextField
                            label='Alasan Cuti'
                            variant='outlined'
                            fullWidth
                            margin='normal'
                            value={data.alasanCuti}
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                          <TextField
                            label='Tanggal Pengajuan'
                            variant='outlined'
                            fullWidth
                            margin='normal'
                            value={moment(data.tglPengajuan).format('L, LT')}
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                          <TextField
                            label='Tanggal Mulai'
                            variant='outlined'
                            fullWidth
                            margin='normal'
                            value={moment(data.tglMulai).format('L')}
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                          <TextField
                            label='s.d Tanggal'
                            variant='outlined'
                            fullWidth
                            margin='normal'
                            value={moment(data.tglSelesai).format('L')}
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                          <TextField
                            label='Lama Cuti'
                            variant='outlined'
                            fullWidth
                            margin='normal'
                            value={data.lamaCuti}
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                          <TextField
                            label='Alamat Selama Menjalankan Cuti'
                            variant='outlined'
                            fullWidth
                            margin='normal'
                            value={data.alamatSelamaCuti}
                            multiline
                            rows={4}
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <Card variant='outlined'>
                        <CardHeader subheader='Progress Pengajuan Cuti' />
                        <Divider />
                        <CardContent>
                          Progress
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                )
            }
          </DialogContent>
          <DialogActions>
            <Button
              color='primary'
              onClick={this.handleCloseDialog}
            >Tutup</Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

export default DetailCuti;
