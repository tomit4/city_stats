03/29/2023
NOTE: codeberg went down, delete this and try again 

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
- [x] Refactor nested data to use Sqlite's native json functionality(see test dir)
- [x] Create a basic sample schema for a State
- [x] Mock Up 3 States and test aggregating into sqlite via csv/bash
- [x] Create a basic sample schema for a City
- [x] Fill an Sqlite database with data of both States and Cities
- [x] Use NodeJs to return sqlite data using basic http request tool, curl
- [ ] Implement search queries using select statements from both states and cities tables (see below)
- [ ] Create a sample website which simply queries the database and displays
- [ ] Add query functionality by the user, utilizing selects/joins for search filtering
- [ ] Deploy API endpoints via Linode and frontend via netlify
- [ ] Remove private status of this repo, and clean up using .gitignore and git rm -r

__Notes:__
The user should be able to do interesting url queries with their url strings
here. For example, if they wish to find out about the cities that exist in their
state they should be able to go to:
```
https://citystats.com/api/states/cities
```
And receive a list of all the major metropolitan cities in their area.
Conversely, if they wish to find out more about state specific government
officials, they should be able to input:
```
https://citystats.com/api/cities/`city_name`/senators
```
And Find out who the senators for the state that `city_name` is within.

This is probably easily achievable via simple nested SELECT statements. See
[sqlite's documentation](https://www.sqlite.org/docs.html).

OF NOTE, BUT DEPRECATED:
There might be a better way to create the database using bash, the sqlite-cli,
and sqlite's native json parser. See [this stackoverflow](https://stackoverflow.com/questions/46407770/how-to-convert-a-json-file-to-an-sqlite-database) article regarding how to "quickly" insert json into an sqlite database.
