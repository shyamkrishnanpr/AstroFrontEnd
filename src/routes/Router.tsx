import React from 'react'
import { Routes, Route } from "react-router-dom";
import AstrologersList from '../components/AstrologersList';

const Router:React.FC = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<AstrologersList/>}/>
        </Routes>
      
    </div>
  )
}

export default Router
