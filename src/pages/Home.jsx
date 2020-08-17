import React, { Component, Fragment } from 'react';

// Material UI
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";

// Templates 
import AdminHome from "../templates/AdminHome";
import UserHome from "../templates/UserHome";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: "admin"
    };
  }

  render() {
    const { role } = this.state;

    return (
      <Card>
        <CardHeader
          title={
            <Fragment>
              {role === "admin" ? "Admin" : "User"} Dashboard
            </Fragment>
          }
        />
        <CardContent>
          <Grid container spacing={3}>
            {
              role === "admin" ? (
                <AdminHome />
              ) : (
                  <UserHome />
                )
            }
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

export default Home; 