import React, { Component, Fragment } from 'react';

// Material UI
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Badge from '@material-ui/core/Badge';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

// Material icons
import NotificationsIcon from '@material-ui/icons/Notifications';

// Redux
import { connect } from 'react-redux';

// Firebase
import firebase from '../config/firebase';

// Moment
import moment from 'moment';
import 'moment/locale/id';

class NotifikasiPengajuan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: [],
      anchorEl: null
    };

    this.subscribe = false;
  }

  markOpenNotifications = () => {
    const batch = firebase.firestore().batch();
    this.state.data.forEach(doc => {
      const notifikasi = firebase.firestore().collection('notifikasi').doc(doc.notifikasiId);
      batch.update(notifikasi, { open: true });
    });

    batch.commit();
  };

  dataNotifikasi = (data) => {
    this.setState({
      isLoading: false,
      data
    });
  };

  handleOpen = (event) => {
    this.setState({
      anchorEl: event.currentTarget
    });

    this.markOpenNotifications();
  };

  handleClose = () => {
    this.setState({
      anchorEl: null
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
            nipPengirim: doc.data().nipPengirim,
            read: doc.data().read,
            open: doc.data().open,
            aproval: doc.data().aproval,
            jenisCuti: doc.data().jenisCuti,
            cutiId: doc.data().cutiId,
            createdAt: doc.data().createdAt,
            type: doc.data().type
          });
          if (this.subscribe) {
            this.dataNotifikasi(data);
          }
        });
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
            data.length > 0 ? (
              data.filter(data => !data.aproval).length > 0 ? (
                data
                  .filter(data => !data.aproval)
                  .map(doc => {
                    return (
                      <MenuItem
                        key={doc.notifikasiId}
                        onClick={this.handleClose}
                      >
                        <Badge
                          color="secondary"
                          variant='dot'
                          badgeContent={doc.read ? 0 : 1}
                        >
                          <ListItemText
                            primary={
                              <Fragment>
                                <Typography noWrap>
                                  NIP : {doc.nipPengirim}
                                </Typography>
                                <Typography
                                  noWrap
                                >
                                  Mengajukan {doc.jenisCuti}
                                </Typography>
                              </Fragment>
                            }
                            secondary={
                              <Typography
                                component='span'
                                variant="body2"
                                noWrap
                              >
                                {moment(doc.createdAt).fromNow()}
                              </Typography>
                            }
                          />
                        </Badge>
                      </MenuItem>
                    );
                  })
              ) : (
                  <MenuItem onClick={this.handleClose}>Tidak ada notifikasi</MenuItem>
                )
            ) : (
                <MenuItem onClick={this.handleClose}>Tidak ada notifikasi</MenuItem>
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

export default connect(mapStateToProps)(NotifikasiPengajuan);
