import React, { Component } from 'react';

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
    const { columns } = this.props;
    const { isLoading, data, nama } = this.state;
    return (
      <DataTable
        title={`Riwayat Cuti Tahunan: ${nama}`}
        isLoading={isLoading}
        data={data}
        columns={columns}
      />
    );
  }
}
export default TabelDataRiwayatCutiPNS;