import {getCliClient} from 'sanity/cli'

const client = getCliClient()

const key = () => Math.random().toString(36).slice(2, 10)

// label, uk, usa, eu, circumferenceMm, diameterMm
const ringRows: [string, string, string, number, number, number][] = [
  ['', 'A', '0.5', 38, 37.8, 12.04],
  ['', 'B', '1', 39, 39.1, 12.45],
  ['', 'C', '1.5', 40, 40.4, 12.85],
  ['', 'D', '2', 42, 41.7, 13.26],
  ['', 'E', '2.5', 43, 42.9, 13.67],
  ['', 'F', '3', 44, 44.2, 14.07],
  ['', 'G', '3.5', 45, 45.5, 14.48],
  ['', 'H', '4', 47, 46.8, 14.88],
  ['', 'I', '4.25', 48, 48, 15.29],
  ['', 'J', '4.75', 49, 48.7, 15.49],
  ['XS', 'K', '5.25', 50, 50, 15.9],
  ['', 'L', '5.75', 51, 51.2, 16.31],
  ['', 'M', '6.25', 52, 52.5, 16.71],
  ['S', 'N', '6.75', 54, 53.8, 17.12],
  ['', 'O', '7.25', 55, 55.1, 17.53],
  ['M', 'P', '7.75', 56, 56.3, 17.93],
  ['', 'Q', '8.25', 58, 57.6, 18.34],
  ['L', 'R', '8.75', 59, 58.9, 18.75],
  ['', 'S', '9.25', 60, 60.2, 19.15],
  ['', 'T', '9.75', 61, 61.4, 19.56],
  ['XL', 'U', '10.25', 63, 62.7, 19.96],
  ['', 'V', '10.75', 64, 64, 20.37],
  ['', 'W', '11.25', 65, 65.3, 20.78],
  ['', 'X', '11.75', 67, 66.6, 21.18],
  ['', 'Y', '12.25', 68, 67.8, 21.59],
  ['', 'Z', '12.75', 69, 68.5, 21.79],
]

// size, circumferenceInch, circumferenceCm
const braceletRows: [string, number, number][] = [
  ['S', 7, 17.78],
  ['M', 8, 20.32],
  ['L', 9, 22.86],
]

// size, lengthInch, lengthCm
const necklaceRows: [string, number, number][] = [
  ['18', 18, 45],
  ['20', 20, 50],
  ['22', 22, 55],
  ['24', 24, 60],
]

await client.createOrReplace({
  _id: 'shopInfo',
  _type: 'shopInfo',
  returnsText: '',
  shippingText: '',
  sizingIntro: '',
  ringSizes: ringRows.map(([label, uk, usa, eu, circumferenceMm, diameterMm]) => ({
    _key: key(),
    _type: 'ringSize',
    label,
    uk,
    usa,
    eu,
    circumferenceMm,
    diameterMm,
  })),
  braceletSizes: braceletRows.map(([size, circumferenceInch, circumferenceCm]) => ({
    _key: key(),
    _type: 'braceletSize',
    size,
    circumferenceInch,
    circumferenceCm,
  })),
  necklaceSizes: necklaceRows.map(([size, lengthInch, lengthCm]) => ({
    _key: key(),
    _type: 'necklaceSize',
    size,
    lengthInch,
    lengthCm,
  })),
})

console.log('shopInfo document seeded')
