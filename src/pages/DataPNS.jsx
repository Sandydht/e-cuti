import React, { Component, Fragment } from 'react';

// Templates
import DataTable from "../templates/DataTable";

// Firebase
import firebase from "../api/Firebase";

const columns = [
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
  }
];

class DataPNS extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataPNS: [],
      isLoading: true
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection("pns");
    ref
      .onSnapshot((querySnapshot) => {
        let data = [];
        querySnapshot.forEach(doc => data.push(doc.data()));
        this.setState({
          dataPNS: data,
          isLoading: false
        });
      });
  }

  componentWillUnmount() {
    firebase.firestore().collection("pns");
  }

  render() {
    const { dataPNS, isLoading } = this.state;

    return (
      <Fragment>
        <DataTable
          title="Data PNS"
          isLoading={isLoading}
          data={dataPNS}
          columns={columns}
        />
      </Fragment>
    );
  }
}
export default DataPNS; 