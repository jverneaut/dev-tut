import React from 'react';
import { Link } from 'gatsby';
const sound = require('../success.mp3');

class Success extends React.Component {
  componentDidMount = () => {
    var audio = new Audio(sound);
    audio.play();
  }

  render() {
    return (
      <div className="success-container">
        <div className="success-modal">
          <h1>Bravo ! 🎉</h1>
          <p>Tu as terminé le niveau {this.props.level + 1} : <strong>{this.props.name}</strong>.</p>
          <Link className="btn" to={this.props.link}>Cours suivant</Link>
        </div>
      </div>
    )
  }
}

export default Success;