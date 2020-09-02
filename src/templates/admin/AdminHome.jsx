import React, { Component } from 'react';

// Material UI
import Card from "@material-ui/core/Card";
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';

class AdminHome extends Component {
  render() {
    return (
      <Card>
        <CardHeader title="Admin Dashboard" />
        <Divider />
        <CardContent>
          Data tabel pengajuan cuti status menunggu
        </CardContent>
      </Card>
    );
  }
}

export default AdminHome;
