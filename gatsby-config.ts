import type { GatsbyConfig } from 'gatsby'

const config: GatsbyConfig = {
  siteMetadata: {
    title: `ColorLove`,
    siteUrl: `https://www.yourdomain.tld`,
    description:
      'This is a site to find your favorite colors for a project or just to answer the eternal question.',
  },
  plugins: [],
}

module.exports = {
  pathPrefix: '/Color-Love',
}

export default config
