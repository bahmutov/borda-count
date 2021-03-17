#!/usr/bin/env node

const { countVotes, getHeaders } = require('..')
const join = require('path').join

const help = [
  'USE: npx borda <votes csv filename> "skip column1,skip column2,..."',
].join('\n')

require('simple-bin-help')({
  minArguments: 3,
  packagePath: join(__dirname, '..', 'package.json'),
  help,
})

const csvFilename = process.argv[2]
const columns = getHeaders(csvFilename)

// list of columns to skip
let skip
if (process.argv[3]) {
  skip = process.argv[3]
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
}

const counted = countVotes(csvFilename, columns, skip)
console.log(counted)
