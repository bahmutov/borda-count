const expect = require('chai').expect
const path = require('path')

const { countVotes, countVotesInCsv } = require('..')

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
    expect(counted).to.deep.equal([
      ['crawl-links', 12],
      ['connect-to-db', 9],
      ['cy-log-tips', 8],
      ['doom-fixtures', 6],
      ['npm-alias', 4],
    ])
  })

  it('handles empty strings', () => {
    const csv = `
      crawl-links,npm-alias,cy-log-tips,connect-to-db,doom-fixtures
      1,3,2,"",""
    `
    const counted = countVotesInCsv(csv, [
      'crawl-links',
      'npm-alias',
      'cy-log-tips',
      'connect-to-db',
      'doom-fixtures',
    ])
    expect(counted).to.deep.equal([
      ['crawl-links', 4],
      ['cy-log-tips', 3],
      ['npm-alias', 2],
      ['doom-fixtures', 0],
      ['connect-to-db', 0],
    ])
  })
})
