#!/usr/bin/env node

const { countVotes } = require('..')
const join = require('path').join

const help = ['USE: npx borda <votes csv filename> "column1,column2,..."'].join(
  '\n',
)

require('simple-bin-help')({
  minArguments: 4,
  packagePath: join(__dirname, '..', 'package.json'),
  help,
})

const csvFilename = process.argv[2]
const columns = process.argv[3]
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean)
const counted = countVotes(csvFilename, columns)
console.log(counted)
