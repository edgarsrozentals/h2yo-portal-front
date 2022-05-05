import React, { useEffect, useState } from 'react';
import Register from './register';


export default function CompanyRegister (props: any) {

  props.disabledProps = [
    'company', 'legalAddress', 'VATNumber', 
    'locationStreet', 'locationBuilding', 'locationApt',
    'locationCity', 'locationCountry', 'locationZIP'
  ];

  return <Register {...props} />;
}
