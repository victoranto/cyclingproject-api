const express = require('express')

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const stravaRouter = require('./src/routes/strava')

const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const path = require('path')

const swaggerSpec = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'pokeApi Ordatic Test',
      version: '1.0.0'
    },
    servers: [
      {
        url: 'http://localhost:3000'
      }
    ]
  },
  apis: [`${path.join(__dirname, './src/routes/*.js')}`]
}


app.use('/', stravaRouter)
app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)))

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})

module.exports = app
