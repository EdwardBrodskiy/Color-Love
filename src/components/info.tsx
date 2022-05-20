import Color from 'color'
import { graphql, useStaticQuery } from 'gatsby'
import * as React from 'react'
import { useState } from 'react'
import { ColorRatingPair } from '../localstorage'

type Props = {}

// markup
const Info = ({ ...props }: Props & React.HTMLAttributes<HTMLDivElement>) => {
  const description = useStaticQuery(graphql`
    query MyQuery {
      site {
        siteMetadata {
          description
        }
      }
    }
  `)
  return (
    <h3
      style={{
        position: 'absolute',
        right: '0.2em',
        bottom: '0.2em',
        textAlign: 'right',
        color: 'inverse',
      }}
    >
      {description.site.siteMetadata.description}
    </h3>
  )
}

export default Info
