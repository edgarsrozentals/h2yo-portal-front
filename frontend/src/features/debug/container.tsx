import React, { useEffect, useState } from 'react';
import { post } from '../../api';
import DebugComponent from '../../components/debug';

const TEST_LOCATION_ID = 441;

const DebugContainer = () => {

  const handleExecute = async (executeType: string, data: any) => {

    let res = { status: 200, message: '' };

    switch (executeType) {
      case 'starterpackinvoice':
        
        res = await post('starterpack', data);
        break;
      case 'starterpackorder':
        res = await post('order/starterpack', data);
        break;
      case 'repeatorderpack':
        res = await post('order/repeatorder', data);
        break;
    }
    
    if (res.status !== 200) {
      alert(res.message);
    }

    return;
  };

  return <DebugComponent execute={handleExecute} />;
};

export default DebugContainer;