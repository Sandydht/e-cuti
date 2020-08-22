import React, { Component, Fragment } from 'react';

// Redux
import { connect } from "react-redux";

// Templates
import AdminCutiTahunan from "../templates/AdminCutiTahunan";
import UserCutiTahunan from "../templates/UserCutiTahunan";

class CutiTahunan extends Component {
  render() {
    const { role, ...rest } = this.props;
    return (
      <Fragment>
        {
          role === "admin" ? (
            <AdminCutiTahunan {...rest} />
          ) : (
              <UserCutiTahunan />
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