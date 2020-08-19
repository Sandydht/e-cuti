import React, { Component } from 'react';

// Material UI
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import PostAddIcon from '@material-ui/icons/PostAdd';
import PageviewIcon from '@material-ui/icons/Pageview';

// Firebase
import firebase from "../api/Firebase";

// Redux
import { connect } from "react-redux";

// Templates
import DataTable from "../templates/DataTable";
import FormPengajuan from "../templates/FormPengajuan";

class CutiTahunan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDialog: false,
      dataCuti: [],
      isLoading: true
    };
  }

  handleOpenDialog = () => {
    this.setState({
      openDialog: true
    });
  };

  handleCloseDialog = () => {
    this.setState({
      openDialog: false
    });
  };

  componentDidMount() {
    const { uid } = this.props;
    const ref = firebase.firestore().collection("cuti");

    ref
      .where("uid", "==", uid)
      .onSnapshot((uidSnapshot) => {
        let dataUID = [];
        uidSnapshot.forEach(doc => dataUID.push(doc.data()));
        if (dataUID.length === 0) {
          this.setState({
            isLoading: false
          });
        } else {
          ref
            .where("jenisCuti", "==", "Cuti Tahunan")
            .onSnapshot((querySnapshot) => {
              let data = [];
              querySnapshot.forEach(doc => data.push(doc.data()));
              this.setState({
                dataCuti: data,
                isLoading: false
              });
            });
        }
      });
  }

  componentWillUnmount() {
    firebase.firestore();
  }

  render() {
    const { openDialog, isLoading, dataCuti } = this.state;

    return (
      <Grid container spacing={1}>
        <Grid item xs={12} md={12}>
          <FormPengajuan
            open={openDialog}
            onClose={this.handleCloseDialog}
            title="Pengajuan Cuti Tahunan"
            jenisCuti="Cuti Tahunan"
          />

          <Button startIcon={<PostAddIcon />} color="primary" variant="contained" onClick={this.handleOpenDialog}>Ajukan Cuti Tahunan</Button>
        </Grid>
        <Grid item xs={12} md={12}>
          <DataTable
            title="Data Cuti Tahunan"
            isLoading={isLoading}
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
                label: "Tanggal Selesai",
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
                      <Button startIcon={<PageviewIcon />} color="primary" variant="contained" size="small">Detail</Button>
                    );
                  }
                }
              }
            ]}
            data={dataCuti}
          />
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = ({ session }) => ({
  uid: session.user.uid
});

export default connect(mapStateToProps, null)(CutiTahunan); 