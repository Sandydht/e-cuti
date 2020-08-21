import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";

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

  handleDrawerToggle = () => [
    this.setState((state) => ({
      mobileOpen: !state.mobileOpen
    }))
  ];

  render() {
    const { classes, ...rest } = this.props;
    const { mobileOpen } = this.state;

    return (
      <div className={classes.root}>
        <Topbar onClick={this.handleDrawerToggle} {...rest} />
        <Sidebar open={mobileOpen} onClose={this.handleDrawerToggle} />
        <Content />
      </div>
    );
  }
}

Dashboard.propTypes = {
  window: PropTypes.func,
};

export default withStyles(styles)(Dashboard); 