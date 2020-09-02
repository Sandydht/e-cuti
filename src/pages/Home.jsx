import React, { Component, Fragment } from 'react';

// Templates
import AdminHome from "../templates/admin/AdminHome";
import UserHome from "../templates/user/UserHome";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: "user"
    };
  }

  render() {
    const { role } = this.state;
    return (
      <Fragment>
        {role === "admin" ? <AdminHome /> : <UserHome />}
      </Fragment>
    );
  }
}

export default Home;
