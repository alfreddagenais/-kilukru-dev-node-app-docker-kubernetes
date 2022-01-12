/* eslint-disable no-console */
const express = require('express')
const app = express()
const PORT = process.env.PORT || 8080
const packageJson = require('./package.json')
const path = require('path')

// Serve static files
app.use(express.static(path.join(__dirname, 'docs')))
app.use('/assets', express.static(path.join(__dirname, 'docs/assets')))

// Index page
app.get('/', (req, res) => {
  console.log('request made')
  res.sendFile('./docs/index.html', { root: __dirname })
})

app.get('/api/health', (req, res) => {
  res.status(200).json({
    version: packageJson.version,
  })
})

app.use((req, res) => {
  res.status(404).sendFile('./docs/404.html', { root: __dirname })
})

app.listen(PORT, () => {
  console.log(`listening for request on port ${PORT}`)
})
