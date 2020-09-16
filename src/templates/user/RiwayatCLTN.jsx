import React, { Component } from 'react';

// Material UI
import Button from '@material-ui/core/Button';

// Material icons
import FindInPageIcon from '@material-ui/icons/FindInPage';

// Atoms
import DataTable from '../../atoms/DataTable';

// Firebase
import firebase from '../../config/firebase';

// React router dom
import { NavLink } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';

// Moment
import moment from 'moment';
import 'moment/locale/id';

class RiwayatCLTN extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: []
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
    return firebase.firestore().collection('cuti')
      .where('nip', '==', this.props.nip)
      .where('jenisCuti', '==', 'Cuti Luar Tanggungan Negara')
      .orderBy('tglPengajuan', 'desc')
      .onSnapshot((querySnapshot) => {
        let data = [];
        querySnapshot.forEach(doc => {
          data.push({
            cutiId: doc.id,
            tglPengajuan: moment(doc.data().tglPengajuan).format('L, LT'),
            alasanCuti: doc.data().alasanCuti,
            tglMulai: moment(doc.data().tglMulai).format('L'),
            tglSelesai: moment(doc.data().tglSelesai).format('L'),
            lamaCuti: doc.data().lamaCuti
          });
        });

        if (this.subscribe) {
          this.dataCuti(data);
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
    const { isLoading, data } = this.state;
    moment().locale('id');
    return (
      <DataTable
        title='Riwayat CLTN'
        isLoading={isLoading}
        data={data}
        columns={[
          {
            name: "tglPengajuan",
            label: "Tanggal Pengajuan",
            options: {
              filter: true,
              sort: false,
            }
          },
          {
            name: "alasanCuti",
            label: "Alasan Cuti",
            options: {
              filter: true,
              sort: false,
            }
          },
          {
            name: "tglMulai",
            label: "Tanggal Mulai",
            options: {
              filter: true,
              sort: false,
            }
          },
          {
            name: "tglSelesai",
            label: "s.d Tanggal",
            options: {
              filter: true,
              sort: false,
            }
          },
          {
            name: "lamaCuti",
            label: "Lama Cuti",
            options: {
              filter: true,
              sort: false,
            }
          },
          {
            name: "Detail",
            options: {
              filter: false,
              sort: false,
              empty: true,
              customBodyRenderLite: (dataIndex) => {
                return (
                  <Button
                    color='primary'
                    variant='contained'
                    size='small'
                    startIcon={<FindInPageIcon />}
                    component={NavLink}
                    to={`/riwayat_cltn/${data[dataIndex].cutiId}`}
                  >Detail</Button>
                );
              }
            }
          },
        ]}
      />
    );
  }
}

const mapStateToProps = ({ session }) => ({
  nip: session.user.nip
});

export default connect(mapStateToProps)(RiwayatCLTN);
