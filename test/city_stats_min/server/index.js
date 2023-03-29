const app = require('express')()
const json = require('express').json
const cors = require('cors')
const bodyParser = require('body-parser')
const db = require('../db/sqlite.js')
// const path = require('path')
// const route = express.Router()

// Server configuration
const port = process.env.PORT || 5000
app.use(
    cors({
        origin: true,
        credentials: true,
    }),
)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(json())

// app.use(express.static(path.join(__dirstate_name, "public")))

// Main routes
app.get('/states', async (req, res) => {
    await db.all('SELECT * FROM states;', [], function(err, rows) {
        rows.forEach(r => {
            r.senators = JSON.parse(r.senators)
            r.house_delegation = JSON.parse(r.house_delegation)
            r.area = JSON.parse(r.area)
            r.area.total = r.area.total.replace(/\"/g, '')
            r.area.land = r.area.land.replace(/\"/g, '')
            r.area.water = r.area.water.replace(/\"/g, '')
            r.population = JSON.parse(r.population)
            r.population.total = r.population.total.replace(/\"/g, '')
            r.population.density = r.population.density.replace(/\"/g, '')
            r.population.median_household_income = r.population.median_household_income.replace(/\"/g, '')
        })
        return res.send(rows)
    })
})
app.get('/cities', async (req, res) => {
    await db.all('SELECT * FROM cities;', [], function(err, rows) {
        rows.forEach(r => {
            r.government = JSON.parse(r.government)
            r.counties = JSON.parse(r.counties)
            r.area = JSON.parse(r.area)
            r.area.city = r.area.city.replace(/\"/g, '')
            r.area.land = r.area.land.replace(/\"/g, '')
            r.area.water = r.area.water.replace(/\"/g, '')
            r.population = JSON.parse(r.population)
            r.population.city = r.population.city.replace(/\"/g, '')
            r.population.density = r.population.density.replace(/\"/g, '')
            r.population.metro = r.population.metro.replace(/\"/g, '')
            r.zip_codes = JSON.parse(r.zip_codes)
            r.fips_code = JSON.parse(r.fips_code)
            r.gnis_feature_ids = JSON.parse(r.gnis_feature_ids)
            r.government.type = r.government.type.replace(/\"/g, '')
            r.government.mayor = r.government.mayor.replace(/\"/g, '')
            r.government.city_council = JSON.parse(r.government.city_council)
        })
        return res.send(rows)
    })
})

// Starts Server...
app.listen(port, () => {
    console.log(`Serving sqlite database as JSON on port: ${port}`)
})
