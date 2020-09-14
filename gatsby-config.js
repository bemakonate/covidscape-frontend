/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  siteMetadata: {
    siteTitle: "Covidscape",
    siteDesc: "Covid can't touch us here",
    twitterUsername: "@covidscape",
    image: "/twitter-img.png",
    siteUrl: process.env.GATSBY_CLIENT_URL || "http://localhost:8000",
    backendUrl: process.env.GATSBY_API_URL || "http://localhost:1337",
  },

  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/src/assets`,
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/gatsby-config.js`,
      },
    },
    {
      resolve: `gatsby-source-strapi`,
      options: {
        apiURL: process.env.GATSBY_API_URL || `http://localhost:1337`,
        queryLimit: 1000, // Default to 100
        contentTypes: [`categories`, `products`],
        singleTypes: [],
      }
    }
  ]
}
