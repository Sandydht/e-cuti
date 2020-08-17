import React, { Component } from 'react';

// Material UI
import Grid from '@material-ui/core/Grid';

class AuthFooter extends Component {
  render() {
    const { left, right } = this.props;
    return (
      <Grid container>
        <Grid item xs>
          {left}
        </Grid>
        <Grid item>
          {right}
        </Grid>
      </Grid>
    );
  }
}
export default AuthFooter; 