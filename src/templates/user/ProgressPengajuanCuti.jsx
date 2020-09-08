import React, { Component, Fragment } from 'react';

// Material UI
import TextField from "@material-ui/core/TextField";

class ProgressPengajuanCuti extends Component {
  render() {
    return (
      <Fragment>
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          label="Status Persetujuan"
          value="Menunggu"
          disabled
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          label="Keterangan"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          margin="normal"
          value="-"
          disabled
          InputProps={{
            readOnly: true,
          }}
        />
      </Fragment>
    );
  }
}

export default ProgressPengajuanCuti;
