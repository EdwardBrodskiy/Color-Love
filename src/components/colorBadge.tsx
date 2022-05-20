import Color from 'color'
import * as React from 'react'
import { useState } from 'react'
import { ColorRatingPair } from '../localstorage'
import { GetColorName } from 'hex-color-to-color-name'

type Props = {
  value: ColorRatingPair
  position: number
}

// markup
const ColorBadge = ({
  position,
  value,
  ...props
}: Props & React.HTMLAttributes<HTMLDivElement>) => {
  const [isShown, setIsShown] = useState(false)
  const podium_badges = ['#FFD700', '#C0C0C0', '#cc6633']
  const badge_color = position < 3 ? podium_badges[position] : `#555`
  const text_color = Color(value.color).isDark() ? 'white' : 'black'
  return (
    <div
      style={{ position: 'relative', color: text_color }}
      onClick={() => {
        navigator.clipboard.writeText(value.color)
      }}
    >
      <div
        {...props}
        style={{
          // maxWidth: `${85 / colors.length}%`,
          aspectRatio: '1',
          backgroundColor: value.color,
          padding: '2rem',
          margin: '0.2em',

          border: `6px outset ${badge_color}`,
          borderRadius: '100%',
        }}
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
      ></div>
      <div
        style={{
          position: 'absolute',
          padding: '0.4em',
          margin: '0.2em',
          textAlign: 'center',
          backgroundColor: value.color,
          borderRadius: '0.5em',
          zIndex: 100,
          display: isShown ? 'block' : 'none',
        }}
      >
        <p
          style={{
            fontWeight: 'bold',
            margin: 0,
          }}
        >
          {GetColorName(value.color)}
        </p>
        <p
          style={{
            margin: 0,
          }}
        >
          {value.color}
        </p>
        <p
          style={{
            fontStyle: 'italic',
            margin: 0,
          }}
        >
          Rating: {Math.round(value.rating)}
        </p>
      </div>
    </div>
  )
}

export default ColorBadge
