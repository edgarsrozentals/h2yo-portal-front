import React from 'react';
const SHOP_URL = 'https://h2yo.odoo.com/shop';

const Shop = () => {

  return <>
    <iframe width="100%" height={window.innerHeight + 'px'} sx={{ width: 100 }} src={SHOP_URL} />
  </>;
};

export default Shop;