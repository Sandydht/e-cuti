import React, { Component } from 'react';
import PropTypes from "prop-types";

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";

// Components
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import Main from "../components/Main";
import Footer from "../components/Footer";

// Styles
const styles = (theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  footer: {
    padding: theme.spacing(3, 2),
    textAlign: "center",
    marginTop: 'auto'
  },
  activeLink: {
    backgroundColor: "#eeeeee"
  }
});

class Dashboard extends Component {
  state = {
    mobileOpen: false
  };

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
        <Topbar onClick={this.handleDrawerToggle} />
        <Sidebar open={mobileOpen} onClick={this.handleDrawerToggle} />
        <div className={classes.content}>
          <Main />
          <Footer className={classes.footer} />
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  window: PropTypes.func
};

export default withStyles(styles)(Dashboard);