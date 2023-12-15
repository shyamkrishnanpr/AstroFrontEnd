import React from 'react'
import { useNavigate } from 'react-router-dom';
import AstrologerForm from '../components/AstrologerForm'


const AstrologerRegistrationPage:React.FC = () => {
 
const navigate = useNavigate()
const [successMessage, setSuccessMessage] = React.useState<string | null>(null);

const handleSuccess = () => {
    
    setSuccessMessage('Astrologer registration successful!');
    setTimeout(() => {
      setSuccessMessage(null);
      navigate('/');
    }, 3000); 
  };
  return (
    <div>
        {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
      <AstrologerForm onSuccess={handleSuccess}/>
    </div>
  )
}

export default AstrologerRegistrationPage
