import React, { Component, Fragment } from 'react';

// Material UI
import Grid from '@material-ui/core/Grid';

class AuthFooter extends Component {
  render() {
    const { left, right } = this.props;

    return (
      <Fragment>
        <Grid container>
          <Grid item xs>
            {left}
          </Grid>
          <Grid item>
            {right}
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}
export default AuthFooter; 