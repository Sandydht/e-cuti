import React, { Component, Fragment } from 'react';

// Material UI
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Badge from '@material-ui/core/Badge';

// Material icons
import NotificationsIcon from '@material-ui/icons/Notifications';

// Redux
import { connect } from 'react-redux';

// Firebase
import firebase from '../config/firebase';

class NotifikasiPengajuan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: []
    };

    this.subscribe = false;
  }

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
            read: doc.data().read,
            open: doc.data().open,
            aproval: doc.data().aproval,
            jenisCuti: doc.data().jenisCuti,
            cutiId: doc.data().cutiId,
            createdAt: doc.data().createdAt
          });
          if (this.subscribe) {
            this.dataNotifikasi(data);
          }
        });
      }, (err) => {
        console.log(err);
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
    const { isLoading, data } = this.state;

    return (
      <Fragment>
        <Tooltip
          title='Notifikasi'
        >
          <IconButton
            color="inherit"
            aria-label="open account"
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
      </Fragment>
    );
  }
}

const mapStateToProps = ({ session }) => ({
  uid: session.user.uid
});

export default connect(mapStateToProps)(NotifikasiPengajuan);
