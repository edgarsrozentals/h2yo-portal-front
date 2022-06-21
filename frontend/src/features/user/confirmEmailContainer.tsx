import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { get } from '../../api';
import ConfirmEmail from '../../components/account/confirmEmail';

export default function ConfirmEmailContainer () {
    
  const { token, email } = useParams();
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState('');

  const confirmEmail = async () => {
    const res = await get('email/confirm/' + token + '/' + email);

    if (res.status === 200) {
      setMessage('Email has been confirmed!');
      
    } else {
      setError('Password reset link has expired or is invalid');
    }
  };

  useEffect(() => {
    confirmEmail();
  }, []);

  return <ConfirmEmail message={message} externalError={error} />; 
}