import React from 'react';
// import AceEditor from 'react-ace';
import { StaticQuery, graphql } from 'gatsby';

import Output from '../components/Output';
import Success from '../components/Success';

// import 'brace/mode/html';
// import 'brace/theme/monokai';

import { getUnlockedLevel, setUnlockedLevel } from '../store';

const Editor = (props) => {
  if (typeof window !== 'undefined') {
    const Ace = require('react-ace').default;
    require('brace/mode/html');
    require('brace/theme/monokai');

    return <Ace {...props}/>
  }

  return null;
}

class Code extends React.Component {
  state = {
    input: '',
    showSuccess: false,
    skippable: false,
    achieved: true
  }

  componentDidMount = () => {
    if (getUnlockedLevel() > this.props.level) {
      this.setState({
        achieved: true,
        input: this.props.output,
        output: this.props.output
      })
    } else {
      if (this.props.input === this.props.output) {
        this.setState({
          input: this.props.input,
          skippable: true,
          achieved: false,
        })
      } else {
        this.setState({
          input: this.props.input,
          output: this.props.output.toLowerCase().replace(/\s/g, ''),
          achieved: false
        })
      }
    }
  }

  handleInput = e => {
    this.setState({
      input: e
    });

    if (this.state.input.toLowerCase().replace(/\s/g, '') === this.state.output) {
      this.setState({ showSuccess: true });
      if (getUnlockedLevel() <= this.props.level) {
        setUnlockedLevel(this.props.level + 1);
      }
    }
  }

  render() {
    return (
      <>
        <Editor
          mode="html"
          theme="monokai"
          onChange={this.handleInput}
          editorProps={{ $blockScrolling: true }}
          value={this.state.input}
          fontSize={16}
        />
        <Output content={this.state.input} />
        <StaticQuery
          query={graphql`
            {
              allExercise(sort: { order: ASC, fields: [order] }) {
                nodes {
                  slug
                  order
                }
              }
            }`
          }
          render={data => {
            const exercises = data.allExercise.nodes;
            console.log(this.state);
            if (this.state.achieved) return null;
            return (
              <div>
                {this.props.level === exercises.length - 1 ? '' : (this.state.showSuccess && <Success name={this.props.name} level={this.props.level} link={'/' + exercises[this.props.level + 1].slug} />)}
              </div>
            )
          }}
        />
      </>
    )
  }
}

export default Code;
