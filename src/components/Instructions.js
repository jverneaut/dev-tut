import React from 'react';
import { StaticQuery, Link, graphql } from 'gatsby';
import { getUnlockedLevel, setUnlockedLevel } from '../store';

import Success from '../components/Success';

class Instructions extends React.Component {
  state = {
    skipped: false,
    achieved: true
  }

  componentDidMount = () => {
    if (getUnlockedLevel() > this.props.level) {
      this.setState({
        achieved: true
      })
    } else {
      this.setState({
        achieved: false
      })
    }
  }

  handleClick = e => {
    e.preventDefault();
    if (getUnlockedLevel() <= this.props.level) {
      setUnlockedLevel(this.props.level + 1);
      this.setState({
        skipped: true
      })
    }
  }
  
  render() {
    const { content, title, skippable, level } = this.props;
    return (
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
            return (
              <article>
                <div dangerouslySetInnerHTML={{ __html: `<h1>${title}</h1><hr/>${content}` }}></div>
                {skippable && !this.state.achieved && <div><br /><a href="#" className="btn" onClick={this.handleClick}>Leçon suivante</a></div>}
                {skippable && this.state.achieved && <div><br /><Link className="btn" to={'/' + exercises[level + 1].slug}>Leçon suivante</Link></div>}
                {this.state.skipped && <Success name={title} level={level} link={'/' + exercises[level + 1].slug} />}
              </article>
              )
          }
        }
      />
    )
  }
}

export default Instructions;
