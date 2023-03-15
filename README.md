### City Stats API

:construction: This repository is currently under heavy construction

#### Installation

```
git clone <this_url>
```
```
cd city_stats && npm install
```
```
npm run start
```

This API will return various statistical data about United States city generally
reflected from Wikipedia.

__To Do:__
- [x] Create a basic sample schema for a State
- [x] Mock Up 3 States and test aggregating into sqlite via csv/bash
- [ ] Add brief description of States/Cities
- [x] Create a basic sample schema for a City
- [x] Fill an Sqlite database with data of both States and Cities
- [x] Use NodeJs to return sqlite data using basic http request tool, curl
- [ ] Create a sample website which simply queries the database and displays
- [ ] Add query functionality by the user, utilizing selects/joins for search filtering
- [ ] Deploy API endpoints via Linode and frontend via netlify
- [ ] Remove private status of this repo, and clean up using .gitignore and git rm -r

__Notes:__

There might be a better way to create the database using bash, the sqlite-cli,
and sqlite's native json parser. See [this stackoverflow](https://stackoverflow.com/questions/46407770/how-to-convert-a-json-file-to-an-sqlite-database) article regarding how to "quickly" insert json into an sqlite database.

On the other hand, using JavaScript's native, Object.keys() method and
Object.values() might be able to check if there's a nested object within a JSON
file and use an iterator for even the CREATE and/or INSERT statements we have
written currently.
