/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */
const React = require('react')
const siteConfig = require('./config.js')
exports.onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <link
      rel="alternate"
      type="application/rss+xml"
      title="RSS"
      href={`${siteConfig.url}/rss.xml`}
    />,
  ])
}
