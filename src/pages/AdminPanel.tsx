import React from "react";
import AstrologersList from "../components/AstrologersList";
import Navbar from "../components/Navbar";

const AdminPanel: React.FC = () => {
  return (
    <>
      <Navbar/>
      <AstrologersList />
    </>
  );
};

export default AdminPanel;
