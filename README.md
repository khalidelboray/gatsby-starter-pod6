
# Gatsby Lumen pod6

Lumen is a minimal, lightweight and mobile-first starter for creating blogs uses
[Gatsby](https://github.com/gatsbyjs/gatsby).

This is a fork of
[gatsby-starter-lumen](https://github.com/alxshelepenok/gatsby-starter-lumen)
updated for support pod6 markup languge.

## Features
+ Beautiful typography inspired by [matejlatin/Gutenberg](https://github.com/matejlatin/Gutenberg).
+ [Mobile-First](https://medium.com/@mrmrs_/mobile-first-css-48bc4cc3f60f) approach in development.
+ Sidebar menu built using a configuration block.
+ Automatic RSS generation.
+ Automatic Sitemap generation.
+ Google Analytics support.
+ Disqus Comments support.

## Folder Structure
```
├── GNUmakefile
├── LICENSE
├── README.md
├── bin
│   ├── make-rss.js
│   ├── makeNow.js
│   └── pod6js
├── config.js
....
├── pub
│   ├── pages
│   │   ├── about.pod6
│   │   ├── contacts.pod6
│   │   └── gatsby-astronaut.png
│   └── posts
│       ├── 01-post.pod6
│       └── gatsby-astronaut.png
├── pub.all
├── src
.......
├── static
....
```

## Getting Started
Install this starter (assuming Gatsby is installed) by running from your CLI:
`gatsby new lumen-pod6 https://github.com/zag/gatsby-starter-pod6`

#### Running in Development
`gatsby develop`

#### Building
`yarn export`

#### Deploy with Netlify

##### WARNING !    set **yarn export** as  Build command in Netlify!
![](https://prnt.sc/sclyb5)


Netlify CMS can run in any frontend web environment, but the quickest way to try it out is by running it on a pre-configured starter site with Netlify. Use the button below to build and deploy your own copy of the repository:

<a href="https://app.netlify.com/start/deploy?repository=https://github.com/zag/gatsby-starter-pod6" target="_blank"><img src="https://www.netlify.com/img/deploy/button.svg" alt="Deploy to Netlify"></a>

After clicking that button, you’ll authenticate with GitHub and choose a repository name. Netlify will then automatically create a repository in your GitHub account with a copy of the files from the template. Next, it will build and deploy the new site on Netlify, bringing you to the site dashboard when the build is complete. Next, you’ll need to set up Netlify’s Identity service to authorize users to log in to the CMS.

## Screenshot

![](https://prnt.sc/sclyxv)

