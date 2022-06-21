import React, { useEffect, useState } from 'react';
import { post } from '../../api';
import DebugComponent from '../../components/debug';

const TEST_LOCATION_ID = 441;

const DebugContainer = () => {

  const handleExecute = async (executeType: string, data: any) => {

    switch (executeType) {
      case 'starterpackinvoice':
        
        post('starterpack', data);
        break;
      case 'starterpackorder':
        post('order/starterpack', data);
        break;
      case 'repeatorderpack':
        post('order/repeatorder', data);
        break;
    }
    

    return;
  };

  return <DebugComponent execute={handleExecute} />;
};

export default DebugContainer;