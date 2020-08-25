import React, { Component } from 'react';

// Atoms
import DataTable from "../atoms/DataTable";

// Firebase 
import firebase from "../api/Firebase";

class TabelDataRiwayatCuti extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: []
    };

    this.auth = firebase.auth();
    this.pns = firebase.firestore().collection("pns");
    this.cuti = firebase.firestore().collection("cuti");
  }

  getDataCuti = (querySnapshot) => {
    let data = [];
    querySnapshot.forEach(doc => data.push(doc.data()));
    this.setState({
      isLoading: false,
      data
    });
  };

  UNSAFE_componentWillMount() {
    const { jenisCuti } = this.props;

    this.unsubscribe = this.auth
      .onAuthStateChanged((user) => {
        if (user) {
          const uid = user.uid;
          this.pns
            .where("uid", "==", uid)
            .get()
            .then((pnsSnapshot) => {
              let nip;
              pnsSnapshot.forEach(doc => nip = doc.data().nip);
              this.cuti
                .where("nip", "==", nip)
                .where("jenisCuti", "==", jenisCuti)
                .get()
                .then(this.getDataCuti);
            });
        }
      });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { title, columns } = this.props;
    const { isLoading, data } = this.state;

    return (
      <DataTable
        title={title}
        isLoading={isLoading}
        data={data}
        columns={columns}
      />
    );
  }
}
export default TabelDataRiwayatCuti;