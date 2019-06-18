import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

const Output = ({ content }) => {
  const head = `
    <link href="https://fonts.googleapis.com/css?family=Roboto+Mono:400,700&display=swap" rel="stylesheet">
    <style>
      * {
        margin: 0;
        padding: 0;
      }

      .output {
        margin-top: 8px;
        font-family: 'Roboto Mono', monospace;
        font-size: 16px;
        height: calc(100% - 8px);
        overflow: scroll;
        line-height: 1.5;
      }

      img {
        width: 100%;
      }

      h1 { font-size: 40px; }
      h2 { font-size: 32px; }
      h3 { font-size: 24px; }
      h4 { font-size: 20px; }
      h5 { font-size: 16px; }
      h6 { font-size: 12px; }

      h1, h2, h3, h4, h5, h6 {
        font-weight: 700;
        line-height: 1.2;
      }

      strong {
        font-weight: 700;
      }
    </style>
  `;
  const body = '<body><div class="output">' + content + '</div></body>';
  const html = head + body;

  return (
    <div className="output-container">
      <div className="output-title">Résultat</div>
      <iframe srcDoc={html} frameBorder="0"></iframe>
    </div>
  )
};

export default Output;
