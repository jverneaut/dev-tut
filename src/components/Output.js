import React from 'react';

const Output = ({ content }) => (
  <div className="output-container">
    <div className="output-title">Résultat</div>
    <div className="output" dangerouslySetInnerHTML={{ __html: content }}></div>
  </div>
);

export default Output;
