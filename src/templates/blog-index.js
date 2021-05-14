import { graphql, Link } from 'gatsby';
import React from 'react';
import { get, kebabCase } from 'lodash';

import Footer from '../components/Footer';
import Layout from '../components/Layout';
import Panel from '../components/Panel';
import SEO from '../components/SEO';
import BlogItems from '../components/BlogItems';
import { rhythm } from '../utils/typography';
import webTracking from '../assets/web-tracking.jpeg';
import redux from '../assets/redux.png';
import webrtc from '../assets/webrtc.jpg';

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
          <div style={{ textAlign: 'center', margin: '2rem' }}>
            <span>Featured articles</span>
          </div>
          <div className="blog-items">
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
                      href="https://medium.com/free-code-camp/how-to-connect-react-to-redux-a-diagrammatic-guide-d2687c14750a"
                      rel="noopener"
                      target="_blank"
                    >
                      How to connect react to redux - a diagrammatic guide
                    </a>
                  </h3>
                  <small>April 23, 2019</small>
                </header>
                <img
                  src={redux}
                  alt={'Connect react to redux'}
                  style={{
                    zIndex: 1,
                    marginTop: rhythm(1),
                  }}
                />
                <p
                  style={{
                    zIndex: 1,
                    fontSize: rhythm(0.7),
                    marginTop: rhythm(1),
                  }}
                >
                  Here is a diagrammatic guide to better understand how Redux
                  connects to React.
                </p>
              </div>
            </article>
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
                      href="https://medium.com/free-code-camp/what-you-should-know-about-web-tracking-and-how-it-affects-your-online-privacy-42935355525"
                      rel="noopener"
                      target="_blank"
                    >
                      Web Tracking - what you should know about your privacy
                      online
                    </a>
                  </h3>
                  <small>April 23, 2018</small>
                </header>
                <img
                  src={webTracking}
                  alt={'Web Tracking'}
                  style={{
                    zIndex: 1,
                    marginTop: rhythm(1),
                  }}
                />
                <p
                  style={{
                    zIndex: 1,
                    fontSize: rhythm(0.7),
                    marginTop: rhythm(1),
                  }}
                >
                  This is my attempt to explain how web tracking works in a
                  nutshell.
                </p>
              </div>
            </article>
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
                      href="https://princiya777.wordpress.com/2017/08/06/webrtc-a-detailed-history/"
                      rel="noopener"
                      target="_blank"
                    >
                      WebRTC - a detailed history
                    </a>
                  </h3>
                  <small>August 06, 2017</small>
                </header>
                <img
                  src={webrtc}
                  alt={'WebRTC'}
                  style={{
                    zIndex: 1,
                    marginTop: rhythm(1),
                  }}
                />
                <p
                  style={{
                    zIndex: 1,
                    fontSize: rhythm(0.7),
                    marginTop: rhythm(1),
                  }}
                >
                  The initial version of the OpenWebRTC implementation was
                  developed internally at Ericsson Research. The latter is
                  maintained by the Google Chrome team.
                </p>
              </div>
            </article>
          </div>
          <div style={{ textAlign: 'center' }}>
            <span style={{ display: 'inline-block', margin: '3rem' }}>
              Featured categories: &nbsp;
            </span>
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
