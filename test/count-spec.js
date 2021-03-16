const expect = require('chai').expect
const path = require('path')

const { countVotes, countVotesInCsv } = require('..')

describe('count votes', () => {
  it('finds the winner', () => {
    const csvFilename = path.join(__dirname, 'test.csv')
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

  it('can have ties', () => {
    const csv = `
      crawl-links,npm-alias,cy-log-tips,connect-to-db,doom-fixtures
      2,5,1,3,4
      3,5,4,2,1
    `
    const counted = countVotesInCsv(csv, [
      'crawl-links',
      'npm-alias',
      'cy-log-tips',
      'connect-to-db',
      'doom-fixtures',
    ])
    expect(counted).to.deep.equal([
      ['doom-fixtures', 5],
      ['connect-to-db', 5],
      ['cy-log-tips', 5],
      ['crawl-links', 5],
      ['npm-alias', 0],
    ])
  })
})
