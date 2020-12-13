module.exports = {
  siteMetadata: {
    title: 'P`s Blog',
    author: 'Princiya Sequeira',
    description: 'Personal blog by Princiya Sequeira',
    siteUrl: 'http://princiya.com/blog',
    social: {
      twitter: '@princi_ya',
    },
  },
  pathPrefix: '/blog',
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `http://princiya.com/blog`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `social-cards`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
              wrapperStyle: `border: 1px solid #efefef`,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          'gatsby-remark-autolink-headers',
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              inlineCodeMarker: '÷',
            },
          },
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
            },
          },
          '@weknow/gatsby-remark-twitter',
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-170472515-1`,
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                const siteUrl = site.siteMetadata.siteUrl;
                const postText = `
                <div style="margin-top=55px; font-style: italic;">(This is an article posted to my blog at princiya.com/blog. You can read it online by <a href="${siteUrl +
                  edge.node.fields.slug}">clicking here</a>.)</div>
              `;

                let html = edge.node.html;
                // Hacky workaround for https://github.com/gaearon/overreacted.io/issues/65
                html = html
                  .replace(/href="\//g, `href="${siteUrl}/`)
                  .replace(/src="\//g, `src="${siteUrl}/`)
                  .replace(/"\/static\//g, `"${siteUrl}/static/`)
                  .replace(/,\s*\/static\//g, `,${siteUrl}/static/`);

                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.frontmatter.spoiler,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ 'content:encoded': html + postText }],
                });
              });
            },
            query: `
              {
                allMarkdownRemark(
                  limit: 1000,
                  sort: { order: DESC, fields: [frontmatter___date] }
                  filter: {fields: { langKey: {eq: "en"}}}
                ) {
                  edges {
                    node {
                      excerpt(pruneLength: 250)
                      html
                      fields { 
                        slug   
                      }
                      frontmatter {
                        title
                        date
                        spoiler
                      }
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: "P's Blog RSS Feed",
          },
        ],
      },
    },
    // {
    //   resolve: `gatsby-plugin-ebook`,
    //   options: {
    //     filename: 'princiya-blog.epub',
    //     query: `
    //       {
    //         site {
    //           siteMetadata {
    //             title
    //             author
    //           }
    //         }
    //         allMarkdownRemark(
    //           sort: { fields: frontmatter___date, order: ASC },
    //           filter: { fields: { langKey: { eq: "en" } } }
    //         ) {
    //           edges {
    //             node {
    //               id
    //               fileAbsolutePath
    //               rawMarkdownBody
    //               frontmatter {
    //                 title
    //                 date
    //               }
    //             }
    //           }
    //         }
    //       }`,
    //   },
    // },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `P's Blog`,
        short_name: `P's Blog`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#ffa7c4`,
        display: `minimal-ui`,
        icon: `src/assets/icon.png`,
        theme_color_in_head: false,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography',
      },
    },
    {
      resolve: 'gatsby-plugin-i18n',
      options: {
        langKeyDefault: 'en',
        useLangKeyLayout: false,
      },
    },
    `gatsby-plugin-catch-links`,
  ],
};
