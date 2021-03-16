const expect = require('chai').expect
const fs = require('fs')
const path = require('path')

const { countVotes } = require('..')

describe('count votes', () => {
  it('finds the winner', () => {
    const csvFilename = path.join(__dirname, 'votes.csv')
    const counted = countVotes(
      csvFilename,
      [
        'crawl-links',
        'npm-alias',
        'cy-log-tips',
        'connect-to-db',
        'doom-fixtures',
      ],
      ['email'],
    )
  })
})
