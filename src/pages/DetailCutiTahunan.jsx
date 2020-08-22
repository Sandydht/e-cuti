import React, { Component, Fragment } from 'react';

// Molecules
import DataTable from "../molecules/DataTable";

// Firebase
import { pns, cuti } from "../api/Firebase";

class DetailCutiTahunan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataCuti: [],
      isLoading: true,
      nama: ""
    };
  }

  UNSAFE_componentWillMount() {
    const { match } = this.props;
    pns
      .doc(match.params.id)
      .get()
      .then((querySnapshot) => {
        let uid;
        uid = querySnapshot.data().uid;
        this.setState({
          nama: querySnapshot.data().nama
        });

        cuti
          .where("uid", "==", uid)
          .where("jenisCuti", "==", "Cuti Tahunan")
          .onSnapshot((snapshot) => {
            let data = [];
            snapshot.forEach(doc => {
              data.push({
                id: doc.id,
                data: doc.data()
              });
            });

            this.setState({
              dataCuti: data,
              isLoading: false
            });
          });
      })
      .catch((error) => {
        this.setState({
          isLoading: false
        });
      });
  }

  render() {
    const { isLoading, dataCuti, nama } = this.state;

    return (
      <Fragment>
        <DataTable
          title={`Detail Cuti Tahunan: ${nama}`}
          isLoading={isLoading}
          data={dataCuti}
          columns={[
            {
              name: "data.tglPengajuan",
              label: "Tanggal Pengajuan",
              options: {
                filter: true,
                sort: false,
              }
            },
            {
              name: "data.tglMulai",
              label: "Tanggal Mulai",
              options: {
                filter: true,
                sort: false,
              }
            },
            {
              name: "data.tglSelesai",
              label: "s.d Tanggal",
              options: {
                filter: true,
                sort: false,
              }
            },
            {
              name: "data.lamaCuti",
              label: "Lama Cuti",
              options: {
                filter: true,
                sort: false,
              }
            },
            {
              name: "data.status",
              label: "Status Persetujuan",
              options: {
                filter: true,
                sort: false,
              }
            },
            {
              name: "terima",
              label: "Terima",
              options: {
                filter: true,
                sort: false,
              }
            },
            {
              name: "tolak",
              label: "Tolak",
              options: {
                filter: true,
                sort: false,
              }
            },
          ]}
        />
      </Fragment>
    );
  }
}

export default DetailCutiTahunan;