import React, { Component } from 'react';

// Firebase
import firebase from "../api/Firebase";

// Templates
import DataTable from "../templates/DataTable";

const columns = ["Name", "Company", "City", "State"];

const data = [
  ["Joe James", "Test Corp", "Yonkers", "NY"],
  ["John Walsh", "Test Corp", "Hartford", "CT"],
  ["Bob Herm", "Test Corp", "Tampa", "FL"],
  ["James Houston", "Test Corp", "Dallas", "TX"],
];

class DataCuti extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataCuti: []
    };
  }

  componentDidMount() {
    const pns = firebase.firestore().collection("pns");
    const cuti = firebase.firestore().collection("cuti");

    pns
      .onSnapshot((pnsSnapshot) => {
        let PNSdata = {};
        pnsSnapshot.forEach(doc => console.log(doc.data()));
      });
  }

  render() {
    return (
      <DataTable
        title="Data Cuti"
        columns={columns}
        data={data}
      />
    );
  }
}
export default DataCuti; 