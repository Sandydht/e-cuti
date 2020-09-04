import React from 'react';

// Templates
import AdminHome from "../templates/admin/AdminHome";
import UserHome from "../templates/user/UserHome";

const Home = ({ role }) => {
  return role === "admin" ? <AdminHome /> : <UserHome />;
};

export default Home;
