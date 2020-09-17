import React, { Component } from 'react';

// Material UI
import Button from '@material-ui/core/Button';

// Material icons
import FindInPageIcon from '@material-ui/icons/FindInPage';

// Atoms
import DataTable from '../../atoms/DataTable';

// Firebase
import firebase from '../../config/firebase';

// Moment
import moment from 'moment';
import 'moment/locale/id';

// React router dom
import { NavLink } from 'react-router-dom';

class AdminHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: []
    };

    this.subscribe = false;
  }

  dataPengajuan = (data) => {
    this.setState({
      isLoading: false,
      data
    });
  };

  componentDidMount() {
    this.subscribe = true;
    return firebase.firestore().collection('cuti').where('aproval', '==', false).orderBy('tglPengajuan', 'desc').onSnapshot(querySnapshot => {
      let data = [];
      querySnapshot.forEach(doc => {
        data.push({
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
        });
      });

      if (this.subscribe) {
        this.dataPengajuan(data);
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
        title='Data Pengajuan'
        isLoading={isLoading}
        data={data}
        columns={[
          {
            name: "nip",
            label: "NIP",
            options: {
              filter: true,
              sort: false,
            }
          },
          {
            name: "nama",
            label: "Nama",
            options: {
              filter: true,
              sort: false,
            }
          },
          {
            name: "jenisCuti",
            label: "Jenis Cuti",
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
            name: "tglPengajuan",
            label: "Tanggal Pengajuan",
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
                    to={`/beranda/${data[dataIndex].cutiId}`}
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

export default AdminHome;
