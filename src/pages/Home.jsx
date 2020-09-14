import React from 'react';

// Templates
import AdminHome from "../templates/admin/AdminHome";
import UserHome from "../templates/user/UserHome";

const Home = ({ role, ...rest }) => {
  return role === "admin" ? <AdminHome {...rest} /> : <UserHome {...rest} />;
};

export default Home;
