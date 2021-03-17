import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors({optionsSuccessStatus: 200}))

// api index
app.get('/', (req, res) => {
  res.send('Hello word')
})

// if no parameters, shows current Date
app.get('/api/timestamp', (req, res) => {
  let date = new Date()
  res.send({
    utc: date.toUTCString(),
    unix: date.getTime(),
  })
})

app.get('/api/timestamp/:date', (req, res) => {
  // requirement: acept unix ms number as param
  const dateParams = isNaN(Number(req.params.date))
    ? req.params.date
    : Number(req.params.date)

  const timeResponse = new Date(dateParams)

  // Handles invalid date
  if (isNaN(timeResponse.getTime())) {
    res.send({
      error: 'Invalid Date',
    })
  } else {
    const utcResponse = timeResponse.toUTCString()
    const unixDate = timeResponse.getTime()

    res.send({
      utc: utcResponse,
      unix: unixDate,
    })
  }
})

// SERVER INIT
const port = process.env.PORT

app.listen(port, () => {
  console.log(`server listening on port ${port}`)
})
