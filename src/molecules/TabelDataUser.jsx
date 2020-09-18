import React, { Component, Fragment } from 'react';

// Material UI
import Button from '@material-ui/core/Button';

// Material icons
import FindInPageIcon from '@material-ui/icons/FindInPage';

// Atoms
import DataTable from '../atoms/DataTable';

// Firebase
import firebase from '../config/firebase';

// React router dom
import { NavLink } from 'react-router-dom';

class TabelDataUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: []
    };

    this.subscribe = false;
  }

  dataUser = (data) => {
    this.setState({
      isLoading: false,
      data
    });
  };

  componentDidMount() {
    this.subscribe = true;
    return firebase
      .firestore()
      .collection('pns')
      .where('register', '==', true)
      .where('role', '==', 'user')
      .onSnapshot(querySnapshot => {
        let data = [];
        querySnapshot.forEach(doc => data.push(doc.data()));
        if (this.subscribe) {
          this.dataUser(data);
        }
      }, (err) => {
        console.log(err);
        this.setState({
          isLoading: false,
          data: []
        });
      });
  }

  componentWillUnmount() {
    this.subscribe = false;
  }

  render() {
    const { isLoading, data } = this.state;

    return (
      <Fragment>
        <DataTable
          title='Data PNS'
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
              name: "nama",
              label: "Nama",
              options: {
                filter: true,
                sort: false,
              }
            },
            {
              name: "golongan",
              label: "golongan",
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
              name: "Riwayat Cuti",
              options: {
                filter: false,
                sort: false,
                empty: true,
                customBodyRenderLite: (dataIndex) => {
                  return (
                    <Button
                      color='primary'
                      variant='contained'
                      size='small'
                      startIcon={<FindInPageIcon />}
                      component={NavLink}
                      to={`${this.props.to}/${data[dataIndex].uid}`}
                    >Riwayat</Button>
                  );
                }
              }
            },
          ]}
        />
      </Fragment>
    );
  }
}

export default TabelDataUser;
