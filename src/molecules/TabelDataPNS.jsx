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
    this.ref.get().then(this.getDataPNS);
  }

  render() {
    const { columns } = this.props;
    const { isLoading, data } = this.state;
    return (
      <DataTable
        title="Data PNS"
        isLoading={isLoading}
        data={data}
        columns={columns}
      />
    );
  }
}
export default TabelDataPNS; 