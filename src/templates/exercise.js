import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';

import Code from '../components/Code';
import Instructions from '../components/Instructions';
import Sidebar from '../components/Sidebar';

import '../styles/main.scss';

export default (props) => {
  const { exercise } = props.data;
  const { input, output, instructions, name, order } = exercise;

  return (
    <div className="container">
      <Helmet>
        <link href="https://fonts.googleapis.com/css?family=Roboto+Mono:400,700|Roboto:400,700&display=swap" rel="stylesheet" />
        <title>{name}</title>
      </Helmet>
      <Sidebar />
      <div className="left-pane">
        <Instructions content={instructions} title={name} skippable={input === output} level={order}/>
      </div>
      <div className="right-pane">
        <Code input={input} output={output} level={order} name={name} />
      </div>
    </div>
  )
}

export const query = graphql`
  query($slug: String!) {
    exercise(slug: {eq: $slug }) {
      input
      name
      order
      output
      instructions
    }
  }
`;
