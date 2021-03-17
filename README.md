# borda-count
> Counting ranked votes using the [Borda tournament method](https://en.wikipedia.org/wiki/Borda_count)

## Install

```
npm i borda-count
## or using Yarn
yarn add borda-count
```

## Use

Count votes in the given "votes.csv" and skip any columns

```
crawl-links,npm-alias,cy-log-tips,connect-to-db,doom-fixtures,email
2,5,1,3,4,b
3,5,4,2,1,t
1,3,2,"","",n
2,3,5,1,4,h
5,4,1,2,3,f
```

```
npx borda votes.csv email
```

You can pass multiple column names to skip

```
npx borda votes.csv email,crawl-links
```

## Output

Prints the choices ordered by points assigned to each place

```
npx borda votes.csv

Choice         Votes
-------------  -----
connect-to-db  20
cy-log-tips    19
crawl-links    18
doom-fixtures  17
npm-alias      13
```
