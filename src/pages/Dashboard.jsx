import React, { Component } from 'react';
import PropTypes from "prop-types";

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";

// Organisms
import Topbar from "../organisms/Topbar";
import Sidebar from "../organisms/Sidebar";
import Main from "../organisms/Main";
import Footer from "../organisms/Footer";

// Molecules
import Account from "../molecules/Account";
import Notifications from "../molecules/Notifications";

// Styles
const styles = (theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    minHeight: "100vh",
    overflow: 'auto',
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
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
      role: "admin"
    };
  }

  handleDrawerToggle = () => {
    this.setState((state) => ({
      mobileOpen: !state.mobileOpen
    }));
  };

  render() {
    const { classes, ...rest } = this.props;
    const { mobileOpen, role } = this.state;

    return (
      <div className={classes.root}>
        {/* Topbar */}
        <Topbar onClick={this.handleDrawerToggle} {...rest}>
          <Notifications />
          <Account {...rest} />
        </Topbar>

        {/* Sidebar */}
        <Sidebar
          {...rest}
          mobileOpen={mobileOpen}
          onClick={this.handleDrawerToggle}
          role={role}
        />

        {/* Main */}
        <div className={classes.content}>
          {/* Content */}
          <Main
            {...rest}
            role={role}
          />

          {/* Footer */}
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