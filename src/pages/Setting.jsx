import React, { Component } from 'react';

// Material UI
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";
import CardContent from "@material-ui/core/CardContent";

class Setting extends Component {
  render() {
    return (
      <Card>
        <CardHeader title="Pengaturan" />
        <Divider />
        <CardContent>
          Konten
        </CardContent>
      </Card>
    );
  }
}

export default Setting;
