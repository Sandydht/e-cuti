import React, { Component } from 'react';

// Material UI
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import PostAddIcon from '@material-ui/icons/PostAdd';
import PageviewIcon from '@material-ui/icons/Pageview';

// Molecules
import DataTable from "../molecules/DataTable";
import FormPengajuan from "../molecules/FormPengajuan";

// Redux
import { connect } from "react-redux";

// Firebase
import { cuti } from "../api/Firebase";

class UserCutiTahunan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataCuti: [],
      isLoading: true,
      openDialog: false
    };

    this.unsubscribe = null;
  }

  collectionOnSnapshot = (querySnapshot) => {
    let data = [];
    querySnapshot.forEach(doc => {
      data.push({
        id: doc.id,
        data: doc.data()
      });
    });
    this.setState({
      dataCuti: data,
      isLoading: false
    });
  };

  UNSAFE_componentWillMount() {
    const { uid } = this.props;

    this.unsubscribe = cuti
      .where("uid", "==", uid)
      .where("jenisCuti", "==", "Cuti Tahunan")
      .onSnapshot(this.collectionOnSnapshot);
  }

  componentWillUnmount() {
    this.unsubscribe();
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

  render() {
    const { isLoading, dataCuti, openDialog } = this.state;

    return (
      <Grid container spacing={1}>
        <Grid item xs={12} md={12}>
          <Button startIcon={<PostAddIcon />} color="primary" variant="contained" onClick={this.handleOpenDialog} >Ajukan Cuti Tahunan</Button>

          <FormPengajuan
            title="Pengajuan Cuti Tahunan"
            jenisCuti="Cuti Tahunan"
            open={openDialog}
            onClose={this.handleCloseDialog}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <DataTable
            title="Riwayat Cuti Tahunan"
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
                name: "data.jenisCuti",
                label: "Jenis Cuti",
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
                      >Detail</Button>
                    );
                  }
                }
              }
            ]}
          />
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = ({ session }) => ({
  uid: session.user.uid
});

export default connect(mapStateToProps, null)(UserCutiTahunan); 