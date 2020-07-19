import React from 'react';
import profilePic from '../assets/profile-pic.jpeg';
import { rhythm } from '../utils/typography';
import Footer from './Footer';

class Bio extends React.Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: rhythm(2),
        }}
      >
        <img
          src={profilePic}
          alt={`Princiya Sequeira`}
          style={{
            marginRight: rhythm(1 / 2),
            marginBottom: 0,
            width: rhythm(2),
            backgroundSize: 'contain',
            borderRadius: '8px',
          }}
        />
        <div>
          <p style={{ maxWidth: 310, marginBottom: 0 }}>
            Personal blog by <a href="http://princiya.com">Princiya Sequeira</a>
            .
          </p>
          <Footer marginTop={false} />
        </div>
      </div>
    );
  }
}

export default Bio;
