import React from 'react'
import { useNavigate } from 'react-router-dom';
import AstrologerForm from '../components/AstrologerForm'
import Navbar from '../components/Navbar';


const AstrologerRegistrationPage:React.FC = () => {
 
const navigate = useNavigate()
const [successMessage, setSuccessMessage] = React.useState<string | null>(null);

const handleSuccess = () => {
    
    setSuccessMessage('Astrologer registration successful!');
    setTimeout(() => {
      setSuccessMessage(null);
      navigate('/');
    }, 2000); 
  };
  return (

    <>
      <Navbar />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {successMessage && <div style={{ color: 'green', marginTop: '10px',fontSize: '1.2rem', padding: '10px' }}>{successMessage}</div>}
        <AstrologerForm onSuccess={handleSuccess} />
      </div>
    </>
  )
}

export default AstrologerRegistrationPage
