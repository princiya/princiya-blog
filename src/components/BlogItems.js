import React from 'react';
import get from 'lodash/get';
import { Link } from 'gatsby';
import Img from 'gatsby-image';

import { rhythm } from '../utils/typography';
import { formatPostDate, formatReadingTime } from '../utils/helpers';
import TagLabels from './TagLabels';
import card from '../assets/card.gif';

const BlogItems = ({ posts, langKey }) => (
  <div className="blog-items">
    {posts.map(({ node }) => {
      if ((node.frontmatter.tags || []).includes('draft')) return null;

      const title = get(node, 'frontmatter.title') || node.fields.slug;

      return (
        <article key={node.fields.slug} className="blog-item">
          <div className="blog-item__content">
            <header style={{ zIndex: 1 }}>
              <h3
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: rhythm(0.8),
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link
                  style={{ boxShadow: 'none' }}
                  to={node.fields.slug}
                  rel="bookmark"
                >
                  {title}
                </Link>
              </h3>
              <small>
                {formatPostDate(node.frontmatter.date, langKey)}
                {` • ${formatReadingTime(node.timeToRead)}`}
              </small>
            </header>
            {node.frontmatter.cover && node.frontmatter.cover.childImageSharp && (
              <Img
                sizes={node.frontmatter.cover.childImageSharp.sizes}
                style={{
                  zIndex: 1,
                  marginTop: rhythm(1),
                }}
              />
            )}
            {title.indexOf('GIF') > 0 && (
              <img
                src={card}
                alt={title}
                style={{
                  zIndex: 1,
                  marginTop: rhythm(1),
                }}
              />
            )}
            <p
              dangerouslySetInnerHTML={{
                __html: node.frontmatter.spoiler,
              }}
              style={{
                zIndex: 1,
                fontSize: rhythm(0.7),
                marginTop: rhythm(1),
              }}
            />
            <TagLabels tags={node.frontmatter.tags || []} />
          </div>
        </article>
      );
    })}
    <article className="blog-item">
      <div className="blog-item__content">
        <header style={{ zIndex: 1 }}>
          <h3
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: rhythm(0.8),
              marginBottom: rhythm(1 / 4),
            }}
          >
            <a
              style={{ boxShadow: 'none' }}
              href="https://princiya777.wordpress.com/"
              rel="noopener"
              target="_blank"
            >
              From the archives
            </a>
          </h3>
        </header>
        {/* <img
          src={webrtc}
          alt={"WebRTC"}
          style={{
            zIndex: 1,
            marginTop: rhythm(1),
          }}
        /> */}
        <p
          style={{
            zIndex: 1,
            fontSize: rhythm(0.7),
            marginTop: rhythm(1),
          }}
        >
          All old posts can be found under princiya777.wordpress.com.
        </p>
      </div>
    </article>
  </div>
);

export default BlogItems;
