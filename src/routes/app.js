const express = require('express')
const axios = require('axios')
const NodeCache = require('node-cache')
// const Bottleneck = require('bottleneck')
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient('https://zljslemzrsvewzbzyxhk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpsanNsZW16cnN2ZXd6Ynp5eGhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njc1NzcxMzksImV4cCI6MTk4MzE1MzEzOX0.pL7Gx8FO1xzENaOpbMiOh7M1NniPcBYMO5l1ilbAJ28')

const router = express.Router()

router.post('/test', async (req, res) => {
  try {
    const { email } = req.body
    const { status, statusText } = await supabase
      .from('users')
      .insert([
        { email }
      ])
    return res.status(status).json(statusText)
  } catch (error) {
    return res.status(400).json({
      message: 'error.response.statusText'
    })
  }
})

module.exports = router
