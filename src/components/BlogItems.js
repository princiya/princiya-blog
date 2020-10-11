import React from 'react';
import get from 'lodash/get';
import { Link } from 'gatsby';

import { rhythm } from '../utils/typography';
import { formatPostDate, formatReadingTime } from '../utils/helpers';
import TagLabels from './TagLabels';

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
                  fontSize: rhythm(1),
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
            <p
              dangerouslySetInnerHTML={{
                __html: node.frontmatter.spoiler,
              }}
              style={{ zIndex: 1 }}
            />
            <TagLabels tags={node.frontmatter.tags || []} />
          </div>
        </article>
      );
    })}
  </div>
);

export default BlogItems;
