import React from 'react';
import profilePic from '../assets/profile-pic.jpeg';
import { rhythm } from '../utils/typography';
import Footer from './Footer';

import './main.css';

class Bio extends React.Component {
  render() {
    return (
      <div
        style={{
          marginBottom: rhythm(2),
        }}
        className="bio layout__body"
      >
        <img
          src={profilePic}
          alt={`Princiya Sequeira`}
          style={{
            marginRight: rhythm(1 / 2),
            marginBottom: 0,
            width: rhythm(2),
            backgroundSize: 'contain',
            borderRadius: '4px',
          }}
        />
        <div style={{ maxWidth: '50%', marginBottom: 0 }}>
          <p
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: rhythm(0.75),
            }}
          >
            Personal blog by{' '}
            <a href="https://princiya.com">Princiya Sequeira</a>.
          </p>
          <p>I blog about my journey into a technical leadership role.</p>
          {/* <p> and how I
            manage the balance between leading technical teams, mentoring
            juniors, hiring and interview best practices, scaling
            infrastructures and securing them.
          </p> */}
          <p>
            I am a skilled programmer with strong communication skills and 12+
            years of experience building full-stack web & mobile apps,
            implementing CI/CD solutions and supporting infrastructures,
            including 3+ years of experience leading technical teams at scale.
          </p>
          <a href="https://princiya.com/blog/tags" rel="noopener noreferrer">
            See all blog categories
          </a>
          <Footer marginTop={false} />
        </div>
      </div>
    );
  }
}

export default Bio;
