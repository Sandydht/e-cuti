import React, { Component } from 'react';

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import CssBaseline from '@material-ui/core/CssBaseline';

// Organisms
import Topbar from "../organisms/Topbar";
import Sidebar from "../organisms/Sidebar";
import Content from "../organisms/Content";

// Styles
const styles = (theme) => ({
  root: {
    display: 'flex',
  }
});

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false
    };
  }

  handleDrawerToggle = () => {
    this.setState((state) => ({
      mobileOpen: !state.mobileOpen
    }));
  };

  render() {
    const { classes } = this.props;
    const { mobileOpen } = this.state;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <Topbar onClick={this.handleDrawerToggle} />
        <Sidebar open={mobileOpen} onClose={this.handleDrawerToggle} />
        <Content />
      </div>
    );
  }
}

export default withStyles(styles)(Dashboard); 