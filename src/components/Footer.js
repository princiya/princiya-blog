import React from 'react';

import { rhythm } from '../utils/typography';

const Footer = ({ marginTop = true }) => (
  <footer
    style={{
      marginTop: marginTop ? rhythm(2.5) : 0,
      paddingTop: rhythm(1),
    }}
  >
    <a
      href="https://twitter.com/princi_ya"
      target="_blank"
      rel="noopener noreferrer"
    >
      twitter
    </a>{' '}
    &bull;{' '}
    <a
      href="https://github.com/princiya"
      target="_blank"
      rel="noopener noreferrer"
    >
      github
    </a>{' '}
    &bull;{' '}
    <a
      href="http://princiya.com/blog/rss.xml"
      target="_blank"
      rel="noopener noreferrer"
    >
      rss
    </a>
  </footer>
);

export default Footer;
