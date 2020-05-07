
/**
 * Make rss file. Must run after gatsby export
 */
const log = (i) => console.log(JSON.stringify(i, null,2))
const fs = require('fs')
const pages = JSON.parse(fs.readFileSync('./pub.all/rss.src.json'))[0].sort( (a ,b) => new Date(a.PUBDATE) - new Date(b.PUBDATE) ).reverse().splice(0,20)

const conf = require('../config.js')
const rss = `<?xml version="1.0" ?>
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>${conf.title}</title>
      <atom:link href="${conf.url}/rss.xml" rel="self" type="application/rss+xml"/>
      <link>${conf.url}</link>
      <description>${conf.title}</description>
      <language>ru</language>
${pages
  .map(
    post => `      <item>
        <title>${post.TITLE}</title>
        <link>${conf.url}${post.publishUrl}</link>
        <guid>${conf.url}${post.publishUrl}</guid>
        <pubDate>${new Date(post.PUBDATE).toUTCString()}</pubDate>
        <description><![CDATA[
          <p>${post.DESCR}
          <a href="${conf.url}${post.publishUrl}">&nearr;</a></p>
        ]]></description>
      </item>`
  )
  .join("\n")}
    </channel>
  </rss>
`
fs.writeFileSync('./pub.all/rss.xml', rss )
console.log(rss)