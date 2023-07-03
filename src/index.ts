import express from 'express'

const app = express()

app.use(express.json())

// /api/v1/card/insert → insert a new card.
app.post('/api/v1/card/insert', (_req, res) => {
  res.send('insert a new card')
})

// /api/v1/card/delete → delete a card.
app.delete('/api/v1/card/delete', (_req, res) => {
  res.send('delete a card')
})

// api/v1/card/:id → Get information from a card.
app.get('/api/v1/card/:id', (_req, res) => {
  res.send('Get information from a card')
})

// api/v1/card/start /:id→ active service time card.
app.get('/api/v1/card/start/:id', (_req, res) => {
  res.send('active service time card')
})

// api/v1/card/end/:id →  inactive service time card.
app.get('/api/v1/card/end/:id', (_req, res) => {
  res.send('inactive service time card')
})

// api/v1/card/update/:id → update info card.
app.put('/api/v1/card/update/:id', (_req, res) => {
  res.send('update info card')
})

// api/v1/card/mode/:id → change working mode card.
app.put('/api/v1/card/mode/:id', (_req, res) => {
  res.send('change working mode card')
})

// api/v1/card/mode/:id → change card mode payment
app.put('/api/v1/card/payment/:id', (_req, res) => {
  res.send('change card mode payment')
})

app.listen(3000, () => {
  console.log('server running on port 3000')
})
