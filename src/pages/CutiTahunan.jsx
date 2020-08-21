import React, { Component, Fragment } from 'react';

// Redux
import { connect } from "react-redux";

// Templates
import AdminCutiTahunan from "../templates/AdminCutiTahunan";

class CutiTahunan extends Component {
  render() {
    const { role } = this.props;
    return (
      <Fragment>
        {
          role === "admin" ? (
            <AdminCutiTahunan />
          ) : (
              <div>User</div>
            )
        }
      </Fragment>
    );
  }
}

const mapStateToProps = ({ session }) => ({
  role: session.user.role
});

export default connect(mapStateToProps, null)(CutiTahunan); 