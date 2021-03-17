const { parseCSV, getHeaders } = require('csv-load-sync')
const { toPairs, sortBy, reverse, isNaN } = require('lodash')
const fs = require('fs')

if (typeof getHeaders !== 'function') {
  throw new Error('Expected getHeaders function')
}

function countVotesInCsv(csvText, columns, skip = []) {
  if (!Array.isArray(columns)) {
    throw new Error('expected list of columns')
  }
  if (!columns.length) {
    throw new Error('expected a few columns')
  }

  const N = columns.length
  // in Borda tournament count, the points for each place are
  // place 1: N - 1
  // place 2: N - 2
  // ...
  // place N - 1: 1
  // place N: 0
  const points = columns.map((_, k) => N - 1 - k)
  // because the ranks start with 1,
  // insert a dummy element into the votes list
  points.unshift(0)

  const convert = {}
  columns.forEach((column) => {
    convert[column] = parseInt
  })
  const csv = parseCSV(csvText, {
    skip,
    convert,
  })
  if (!csv.length) {
    throw new Error(`no records found in your CSV text`)
  }

  const getStartSums = (csv) => {
    const start = {}
    const firstRow = csv[0]
    Object.keys(firstRow).forEach((key) => {
      start[key] = 0
    })
    return start
  }

  const summed = csv.reduce((sums, s) => {
    Object.keys(sums).forEach((key) => {
      const vote = s[key]
      if (isNaN(vote)) {
        return
      }
      sums[key] += points[s[key]]
    })
    return sums
  }, getStartSums(csv))

  const sortedByVotes = reverse(sortBy(toPairs(summed), 1))
  return sortedByVotes
}

function countVotes(csvFilename, columns, skip = []) {
  const csvText = fs.readFileSync(csvFilename, 'utf8')
  return countVotesInCsv(csvText, columns, skip)
}

module.exports = {
  countVotes,
  countVotesInCsv,
  getHeaders,
}
