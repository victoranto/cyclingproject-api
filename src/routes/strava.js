const express = require('express')
const axios = require('axios')
const NodeCache = require('node-cache')
// const Bottleneck = require('bottleneck')

const router = express.Router()

const baseURL = 'https://www.strava.com/api/v3'

const cache = new NodeCache({ stdTTL: 60 * 60 * 24 })
const checkCache = (req, res, next) => {
  try {
    const { id } = req.params
    if (cache.has(id)) {
      console.log('cache')
      return res.status(200).json(cache.get(id))
    }
    return next()
  } catch (error) {
    throw new Error(error)
  }
}

// const limiter = new Bottleneck({
//   maxConcurrent: 10
// })

router.get('/test', checkCache, async (req, res) => {
  return res.status(200).json({
    message: 'I am alive'
  })
})

router.get('/athlete/:id', checkCache, async (req, res) => {
  try {
    const { id } = req.params
    const config = {
      headers: { Authorization: `Bearer ${req.headers.access_token}` }
    }
    const { data } = await axios.get(
                          `${baseURL}/athlete`,
                          config
    )
    if (data) {
      cache.set(id, data)
      return res.status(200).json(data)
    }
  } catch (error) {
    if (error.response.status === 404) {
      return res.status(error.response.status).json({
        message: 'Athlete not found'
      })
    }
    // if (error.response.status === 401) {
    //   return res.status(error.response.status).json({
    //     message: 'Invalid Token'
    //   })
    // }
    return res.status(error.response.status).json({
      message: error.response.statusText
    })
    // throw new Error(error)
  }
})

module.exports = router
