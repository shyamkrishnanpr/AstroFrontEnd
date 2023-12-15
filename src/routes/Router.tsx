import React from 'react'
import { Routes, Route } from "react-router-dom";
import AstrologersList from '../components/AstrologersList';
import EditAstrologer from '../components/EditAstrologer';
import AstrologerRegistrationPage from '../pages/AstrologerRegistrationPage';

const Router:React.FC = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<AstrologersList/>}/>
            <Route path='/edit/:id' element={<EditAstrologer/>}/>
            <Route path='/register' element={<AstrologerRegistrationPage/>}/>

        </Routes>
      
    </div>
  )
}

export default Router
