import React, { Component } from 'react';

// Atoms
import DataTable from "../atoms/DataTable";

// Firebase
import firebase from "../api/Firebase";

class TabelDataPNS extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: []
    };

    this.ref = firebase.firestore().collection("pns");
  }

  getDataPNS = (querySnapshot) => {
    let data = [];
    querySnapshot.forEach(doc => data.push(doc.data()));
    this.setState({
      isLoading: false,
      data
    });
  };

  UNSAFE_componentWillMount() {
    this.unsubscribe = this.ref
      .onSnapshot(this.getDataPNS);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { isLoading, data } = this.state;
    return (
      <DataTable
        title="Data PNS"
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
            name: "nik",
            label: "NIK",
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
            name: "golongan",
            label: "Golongan",
            options: {
              filter: true,
              sort: false,
            }
          },
          {
            name: "unitKerja",
            label: "Unit Kerja",
            options: {
              filter: true,
              sort: false,
            }
          },
        ]}
      />
    );
  }
}
export default TabelDataPNS; 