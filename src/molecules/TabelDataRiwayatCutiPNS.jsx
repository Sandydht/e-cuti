import React, { Component } from 'react';

// Material UI
import Button from "@material-ui/core/Button";
import PageviewIcon from '@material-ui/icons/Pageview';

// React router dom
import { NavLink } from "react-router-dom";

// Data Tabel
import DataTable from "../atoms/DataTable";

// Firebase 
import firebase from "../api/Firebase";

class TabelDataRiwayatCutiPNS extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: [],
      nama: ""
    };

    this.pns = firebase.firestore().collection("pns");
    this.cuti = firebase.firestore().collection("cuti");
  }

  UNSAFE_componentWillMount() {
    const { match, jenisCuti } = this.props;
    this.pns
      .get()
      .then((pnsSnapshot) => {
        let dataPNS = [];
        pnsSnapshot.forEach(doc => dataPNS.push(doc.data()));
        const nip = dataPNS[match.params.id].nip;
        const nama = dataPNS[match.params.id].nama;
        this.cuti
          .where("nip", "==", nip)
          .where("jenisCuti", "==", jenisCuti)
          .get()
          .then((querySnapshot) => {
            let data = [];
            querySnapshot.forEach(doc => data.push(doc.data()));
            this.setState({
              isLoading: false,
              nama,
              data
            });
          });
      });
  }

  render() {
    const { match } = this.props;
    const { isLoading, data, nama } = this.state;
    return (
      <DataTable
        title={`Riwayat Cuti Tahunan: ${nama}`}
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
            name: "tglMulai",
            label: "Tanggal Mulai",
            options: {
              filter: true,
              sort: false,
            }
          },
          {
            name: "tglSelesai",
            label: "s/d Tanggal",
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
            name: "status",
            label: "Status Persetujuan",
            options: {
              filter: true,
              sort: false,
            }
          },
          {
            name: "detail",
            label: "Detail",
            options: {
              filter: true,
              sort: false,
              customBodyRenderLite: (dataIndex) => {
                return (
                  <Button
                    startIcon={<PageviewIcon />}
                    color="primary"
                    variant="contained"
                    size="small"
                    component={NavLink}
                    to={`/data_cuti_tahunan/${match.params.id}/${dataIndex}`}
                  >Detail</Button>
                );
              }
            }
          }
        ]}
      />
    );
  }
}
export default TabelDataRiwayatCutiPNS;