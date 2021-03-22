import React from 'react';
import { Link } from 'gatsby';
import Toggle from './Toggle';
import Helmet from 'react-helmet';

import { rhythm, scale } from '../utils/typography';
import sun from '../assets/sun.png';
import moon from '../assets/moon.png';
import Bio from './Bio';

import './main.css';

class Layout extends React.Component {
  state = {
    theme: null,
  };
  componentDidMount() {
    this.setState({ theme: window.__theme });
    window.__onThemeChange = () => {
      this.setState({ theme: window.__theme });
    };
  }
  renderHeader() {
    const { location, title } = this.props;
    const rootPath = `${__PATH_PREFIX__}/`;

    return (
      <>
        <h1
          style={{
            ...scale(0.25),
            marginBottom: 0,
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: 'none',
              textDecoration: 'none',
              color: 'var(--textLink)',
            }}
            to={'/'}
          >
            {title}
          </Link>
        </h1>
        <h1
          style={{
            ...scale(0.25),
            marginBottom: 0,
            marginTop: 0,
            fontFamily: 'cursive',
          }}
        >
          <a
            style={{
              boxShadow: 'none',
              textDecoration: 'none',
              color: 'var(--textLink)',
            }}
            href="https://princiya.com"
          >
            Princiya
          </a>
        </h1>
      </>
    );
  }
  render() {
    const { children, maxWidth = false, margin = 'auto' } = this.props;
    const bodyStyle = {
      padding: `0 ${rhythm(3 / 4)} 2.625rem`,
    };

    if (margin === 'auto') {
      bodyStyle.marginLeft = 'auto';
      bodyStyle.marginRight = 'auto';
    }

    if (maxWidth === true) {
      bodyStyle.maxWidth = rhythm(24);
    }

    return (
      <div
        style={{
          color: 'var(--textNormal)',
          background: 'var(--bg)',
          transition: 'color 0.2s ease-out, background 0.2s ease-out',
          minHeight: '100vh',
        }}
      >
        <Helmet
          meta={[
            {
              name: 'theme-color',
              content: this.state.theme === 'light' ? '#ffa8c5' : '#282c35',
            },
          ]}
        />
        <div>
          <header className="header">
            {this.renderHeader()}
            {this.state.theme !== null ? (
              <Toggle
                icons={{
                  checked: (
                    <img
                      src={moon}
                      width="16"
                      height="16"
                      role="presentation"
                      style={{ pointerEvents: 'none' }}
                    />
                  ),
                  unchecked: (
                    <img
                      src={sun}
                      width="16"
                      height="16"
                      role="presentation"
                      style={{ pointerEvents: 'none' }}
                    />
                  ),
                }}
                checked={this.state.theme === 'dark'}
                onChange={e =>
                  window.__setPreferredTheme(
                    e.target.checked ? 'dark' : 'light'
                  )
                }
              />
            ) : (
              <div style={{ height: '24px' }} />
            )}
          </header>
          <aside className="bg-secondary">
            <Bio />
          </aside>
          <div style={bodyStyle} className="layout__body">
            {children}
          </div>
          <aside className="bg-secondary">
            <Bio />
          </aside>
        </div>
      </div>
    );
  }
}

export default Layout;
