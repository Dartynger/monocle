const functions = require('firebase-functions')

const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors({ origin: true }))

app.post('/events', (request, response) => {
  console.log(request.body)
  response.send('Endpoint for Monobank Webhooks!')
})

exports.api = functions.https.onRequest(app)
