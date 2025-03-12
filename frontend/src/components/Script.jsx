import React, { useEffect } from 'react';

const Script = () => {
  useEffect(() => {
    console.log('Custom script loaded!');
  }, []);

  return null; 
};

export default Script;
