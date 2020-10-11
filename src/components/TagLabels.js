import React from 'react';
import { Link } from 'gatsby';

const TagLabels = ({ tags }) => (
  <div className="tags" style={{ zIndex: 1 }}>
    {tags.map(tag => (
      <Link
        style={{ boxShadow: 'none' }}
        to={`/tags/${tag}`}
        rel="bookmark"
        className="tagLabel"
      >
        {tag}
      </Link>
    ))}
  </div>
);

export default TagLabels;
