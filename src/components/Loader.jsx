import React from 'react';
import { Spin } from 'antd';

const Loader = () => (
  <div className="loader">
    <Spin fullscreen/>
  </div>
);

export default Loader;