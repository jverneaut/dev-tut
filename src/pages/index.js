import React from "react";
import {navigate} from 'gatsby';

import Layout from "../components/layout";

class IndexPage extends React.Component {
  componentDidMount = () => {
    navigate('/introduction');
  }

  render() {
    return (
      <Layout>
        Hello
      </Layout>
    )
  }
}

export default IndexPage
