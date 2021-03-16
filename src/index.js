const { load } = require('csv-load-sync')
const { toPairs, sortBy } = require('lodash')

function countVotes(csvFilename, columns = [], skip = []) {
  const convert = {}
  columns.forEach((column) => {
    convert[column] = parseInt
  })
  const csv = load(csvFilename, {
    skip,
    convert,
  })
  if (!csv.length) {
    console.error('There are no records in the file')
    process.exit(1)
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
    const maxVote = Object.keys(sums).length + 1
    Object.keys(sums).forEach((key) => {
      if (s[key]) {
        sums[key] += s[key]
      } else {
        // the user has not ranked this option
        // thus give it max
        sums[key] += maxVote
      }
    })
    return sums
  }, getStartSums(csv))

  const sortedByVotes = sortBy(toPairs(summed), 1)

  console.log(sortedByVotes)
}

module.exports = {
  countVotes,
}
