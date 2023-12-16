import React from "react";
import { Routes, Route } from "react-router-dom";

import AdminPanel from "../pages/AdminPanel";
import AstrologerRegistrationPage from "../pages/AstrologerRegistrationPage";
import EditPage from "../pages/EditPage";

const Router: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AdminPanel />} />
        <Route path="/register" element={<AstrologerRegistrationPage />} />
        <Route path="/edit/:id" element={<EditPage />} />
      </Routes>
    </div>
  );
};

export default Router;
