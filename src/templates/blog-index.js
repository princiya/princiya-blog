import { graphql, Link } from 'gatsby';
import React from 'react';
import { get, kebabCase } from 'lodash';

import Footer from '../components/Footer';
import Layout from '../components/Layout';
import Panel from '../components/Panel';
import SEO from '../components/SEO';
import BlogItems from '../components/BlogItems';
import { rhythm } from '../utils/typography';

import './blog.css';

class BlogIndexTemplate extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title');
    const langKey = this.props.pageContext.langKey;

    const posts = get(this, 'props.data.allMarkdownRemark.edges');

    return (
      <Layout location={this.props.location} title={siteTitle} margin="custom">
        <SEO />
        <main>
          {langKey !== 'en' && langKey !== 'ru' && (
            <Panel>
              These articles have been{' '}
              <a
                href="https://github.com/princiya/blog#contributing-translations"
                target="_blank"
                rel="noopener noreferrer"
              >
                translated by the community
              </a>
              .
            </Panel>
          )}
          <div style={{ textAlign: 'center' }}>
            <span>Featured categories: &nbsp;</span>
            {this.props.data.allMarkdownRemark.group.map(tag => {
              const featuredTags = ['leadership', 'technical', 'mentorship'];

              if (featuredTags.includes(tag.fieldValue)) {
                return (
                  <Link
                    key={tag.fieldValue}
                    to={`/tags/${kebabCase(tag.fieldValue)}/`}
                    className="tagLabel"
                  >
                    {tag.fieldValue} ({tag.totalCount})
                  </Link>
                );
              }

              return null;
            })}
          </div>
          <BlogItems posts={posts} langKey={this.props.pageContext.langKey} />
        </main>
      </Layout>
    );
  }
}

export default BlogIndexTemplate;

export const pageQuery = graphql`
  query($langKey: String!) {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(
      filter: { fields: { langKey: { eq: $langKey } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
      edges {
        node {
          fields {
            slug
            langKey
          }
          timeToRead
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            tags
            spoiler
            cover {
              childImageSharp {
                sizes(maxWidth: 630) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
          }
        }
      }
    }
  }
`;
