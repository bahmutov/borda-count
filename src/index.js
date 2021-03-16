const loader = require('csv-load-sync');
const { toPairs, sortBy } = require('lodash')

const csv = loader('votes.csv', {
  skip: 'email',
  convert: {
    'crawl-links': parseInt,
    'npm-alias': parseInt,
    'cy-log-tips': parseInt,
    'connect-to-db': parseInt,
    'doom-fixtures': parseInt
  }
});
if (!csv.length) {
  console.error('There are no records in the file')
  process.exit(1)
}

const getStartSums = (csv) => {
  const start = {}
  const firstRow = csv[0]
  Object.keys(firstRow).forEach(key => {
    start[key] = 0
  })
  return start
}

// const toNumbers = s => {
//   Object.keys(s).forEach(key => {
//     const value = s[key]
//     if (value !== '') {
//       s[key] = parseInt(s[key])
//     } else {
//       delete s[key]
//     }
//   })
//   return s
// }

const summed = csv.reduce((sums, s) => {
  const maxVote = Object.keys(sums).length + 1
  Object.keys(sums).forEach(key => {
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
