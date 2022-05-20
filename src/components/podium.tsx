import Color from 'color'
import * as React from 'react'
import { ColorRatingPair } from '../localstorage'
import ColorBadge from './colorBadge'

type Props = {
  colors: Array<ColorRatingPair>
}

// markup
const Podium = ({
  colors,
  ...props
}: Props & React.HTMLAttributes<HTMLDivElement>) => {
  const podium_badges = ['#FFD700', '#C0C0C0', '#cc6633']
  const color_blocks = colors.map((value, index) => (
    <ColorBadge position={index} value={value} key={index} />
  ))
  return (
    <div
      {...props}
      style={{
        display: 'flex',
        flexWrap: 'wrap',

        backgroundColor: 'transparent',
        position: 'absolute',
        left: '0.2em',
        top: '0.2em',
        right: '30%',
      }}
    >
      {color_blocks}
    </div>
  )
}

export default Podium
