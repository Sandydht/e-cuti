import React, { Component } from 'react';

// Material UI
import Typography from "@material-ui/core/Typography";

class Copyright extends Component {
  render() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        Copyright © E-Cuti {new Date().getFullYear()}
      </Typography>
    );
  }
}
export default Copyright; 