import React, { Component, Fragment } from 'react';

// Material UI
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Badge from '@material-ui/core/Badge';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

// Material icons
import NotificationsIcon from '@material-ui/icons/Notifications';

// Redux
import { connect } from 'react-redux';

// Firebase
import firebase from '../config/firebase';

// Moment
import moment from 'moment';
import 'moment/locale/id';

class NotifikasiAproval extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: [],
      anchorEl: null
    };

    this.subscribe = false;
  }

  handleOpen = (event) => {
    this.setState({
      anchorEl: event.currentTarget
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null
    });
  };

  markOpenNotifications = () => {
    const batch = firebase.firestore().batch();
    this.state.data.forEach(doc => {
      const notifikasi = firebase.firestore().collection('notifikasi').doc(doc.notifikasiId);
      batch.update(notifikasi, { open: true });
    });

    batch.commit();
  };

  markReadNotifications = (id) => {
    return firebase
      .firestore()
      .collection('notifikasi')
      .doc(id)
      .update({ read: true });
  };

  dataNotifikasi = (data) => {
    this.setState({
      isLoading: false,
      data
    });
  };

  componentDidMount() {
    this.subscribe = true;
    return firebase
      .firestore()
      .collection('notifikasi')
      .where('penerima', '==', this.props.uid)
      .orderBy('createdAt', 'desc')
      .limit(10)
      .onSnapshot(querySnapshot => {
        let data = [];
        querySnapshot.forEach(doc => {
          data.push({
            notifikasiId: doc.id,
            penerima: doc.data().penerima,
            pengirim: doc.data().pengirim,
            nipPenerima: doc.data().nipPenerima,
            read: doc.data().read,
            open: doc.data().open,
            aproval: doc.data().aproval,
            jenisCuti: doc.data().jenisCuti,
            cutiId: doc.data().cutiId,
            createdAt: doc.data().createdAt,
            type: doc.data().type,
          });
        });

        if (this.subscribe) {
          this.dataNotifikasi(data);
        }
      }, () => {
        this.setState({
          isLoading: false,
          data: []
        });
      });
  }

  componentWillUnmount() {
    this.subscribe = false;
  }

  render() {
    const { isLoading, data, anchorEl } = this.state;
    const open = Boolean(anchorEl);
    moment().locale('id');

    return (
      <Fragment>
        <Tooltip
          title='Notifikasi'
        >
          <IconButton
            color="inherit"
            aria-label="open account"
            onClick={this.handleOpen}
          >
            <Badge
              color='secondary'
              badgeContent={
                data.filter(data => !data.open).length
              }
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Tooltip>

        <Menu
          open={open}
          onClose={this.handleClose}
          anchorEl={anchorEl}
          getContentAnchorEl={null}
          onEntered={this.markOpenNotifications}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
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
                data.length > 0 ? (
                  data.filter(data => data.aproval).length > 0 ? (
                    data.filter(data => !data.read).length > 0 ? (
                      data
                        .filter(data => !data.read)
                        .map(value => (
                          <MenuItem
                            key={value.notifikasiId}
                            onClick={() => {
                              this.handleClose();
                              this.markReadNotifications(value.notifikasiId);
                              if (value.jenisCuti === 'Cuti Tahunan') {
                                this.props.history.push(`/riwayat_cuti_tahunan/${value.cutiId}`);
                              } else if (value.jenisCuti === 'Cuti Besar') {
                                this.props.history.push(`/riwayat_cuti_besar/${value.cutiId}`);
                              } else if (value.jenisCuti === 'Cuti Sakit') {
                                this.props.history.push(`/riwayat_cuti_sakit/${value.cutiId}`);
                              } else if (value.jenisCuti === 'Cuti Bersalin') {
                                this.props.history.push(`/riwayat_cuti_bersalin/${value.cutiId}`);
                              } else if (value.jenisCuti === 'Cuti Alasan Penting') {
                                this.props.history.push(`/riwayat_cap/${value.cutiId}`);
                              } else if (value.jenisCuti === 'Cuti Luar Tanggungan Negara') {
                                this.props.history.push(`/riwayat_cltn/${value.cutiId}`);
                              }
                            }}
                          >
                            <Badge
                              color="secondary"
                              variant='dot'
                              badgeContent={value.read ? 0 : 1}
                            >
                              <ListItemText
                                primary={
                                  <Fragment>
                                    <Typography noWrap>
                                      Aproval Pengajuan {value.jenisCuti} Anda
                                    </Typography>
                                  </Fragment>
                                }
                                secondary={
                                  <Typography
                                    component='span'
                                    variant="body2"
                                    noWrap
                                  >
                                    {moment(value.createdAt).fromNow()}
                                  </Typography>
                                }
                              />
                            </Badge>
                          </MenuItem>
                        ))
                    ) : (
                        <MenuItem
                          onClick={this.handleClose}
                        >
                          Tidak ada notifikasi
                        </MenuItem>
                      )
                  ) : (
                      <MenuItem
                        onClick={this.handleClose}
                      >
                        Tidak ada notifikasi
                      </MenuItem>
                    )
                ) : (
                    <MenuItem onClick={this.handleClose} >Tidak ada notifikasi</MenuItem>
                  )
              )
          }
        </Menu>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ session }) => ({
  uid: session.user.uid
});

export default connect(mapStateToProps)(NotifikasiAproval);
