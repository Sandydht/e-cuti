import React, { Component } from 'react';

// Material UI
import Button from "@material-ui/core/Button";
import PageviewIcon from '@material-ui/icons/Pageview';

// Atoms
import DataTable from "../atoms/DataTable";

// React router dom
import { NavLink } from "react-router-dom";

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
                    to={`/data_pns/${dataIndex}`}
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
export default TabelDataPNS; 