import Color from 'color'
import { graphql, useStaticQuery } from 'gatsby'
import * as React from 'react'
import ColorTile from '../components'
import Info from '../components/info'
import Podium from '../components/podium'
import {
  setColors,
  getColors,
  Colors,
  ColorRatingPair,
  getTopColors,
} from '../localstorage'

// styles
const pageStyles = {
  color: '#232129',
  fontFamily: '-apple-system, Roboto, sans-serif, serif',
  boxSizing: 'border-box' as 'border-box',
  position: 'absolute' as 'absolute',
  top: '0',
  bottom: '0',
  right: '0',
  left: '0',
}

// markup
const IndexPage = () => {
  const [colors, setColors] = React.useState<Colors>()
  const [top, setTop] = React.useState<Array<ColorRatingPair>>(getTopColors(10))
  const nextQuestion = () => {
    setColors(getRandomColors())
    setTop(getTopColors(10))
  }
  if (colors == undefined) {
    nextQuestion()
    console.log('hi')
    return <div>loading</div>
  }
  return (
    <main style={pageStyles}>
      <ColorTile
        color={colors[0]}
        onClick={() => {
          updateResult(colors[0], colors[1])
          nextQuestion()
        }}
      />
      <ColorTile
        color={colors[1]}
        onClick={() => {
          updateResult(colors[1], colors[0])
          nextQuestion()
        }}
      />
      <Podium colors={top} />
      <Info />
    </main>
  )
}

const updateResult = (winner: string, looser: string) => {
  const entries = getColors([winner, looser])
  const e_winner = getExpectedElo(entries[winner], entries[looser])
  const e_looser = getExpectedElo(entries[looser], entries[winner])
  entries[winner] = updateEloScore(entries[winner], 1, e_winner)
  entries[looser] = updateEloScore(entries[looser], 0, e_looser)
  setColors(entries)
}

const getExpectedElo = (this_rating: number, other_rating: number): number =>
  1 / (1 + Math.pow(10, (other_rating - this_rating) / 400))

const updateEloScore = (
  rating: number,
  result: number,
  expected: number
): number => rating + 32 * (result - expected)

const getRandomColors = (): Colors => {
  let colors: Colors = ['#fff', '#fff']
  while (colors[0] === colors[1]) {
    colors = [randomColor(), randomColor()]
  }
  return colors
}

const randomColor = (): string => {
  const resolution = 4
  return Color.rgb(
    Math.floor((Math.random() * 256) / (256 / resolution)) * (256 / resolution),
    Math.floor((Math.random() * 256) / (256 / resolution)) * (256 / resolution),
    Math.floor((Math.random() * 256) / (256 / resolution)) * (256 / resolution)
  ).hex()
}

export default IndexPage
