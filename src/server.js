const express = require('express')
const cors = require('cors')
const axios = require('axios')
const app = express()
const port = 5000

app.use(cors())

app.get('/',(req, res) => {
    axios.get("https://www.mobile.de/hiring-challenge.json").then(resp => res.json(resp.data)).catch(err => res.json(err))
})

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})