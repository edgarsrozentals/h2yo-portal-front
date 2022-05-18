import React, { useEffect, useState } from 'react';
import { post } from '../../api';
import DebugComponent from '../../components/debug';

const TEST_LOCATION_ID = 441;

const DebugContainer = () => {

  const handleExecute = async (executeType: string) => {

    switch (executeType) {
      case 'starterpack':
        
        post('starterpack', { locationId: TEST_LOCATION_ID });
        break;
    }
    

    return;
  };

  return <DebugComponent execute={handleExecute} />;
};

export default DebugContainer;