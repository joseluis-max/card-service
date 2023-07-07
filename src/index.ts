import express from 'express'
import MongoDB from './Providers/Mongodb'
import { validateCard } from './utils/Utils'
import { Card } from './types'
const app = express()
app.use(express.json())
const uri = 'mongodb+srv://luisjvaldiviezo:Zf91WkuSOuhzjfEZ@cluster0.qqpuche.mongodb.net/?retryWrites=true&w=majority'

const mongodb = new MongoDB(uri)
// /api/v1/card/insert → insert a new card.
// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.post('/api/v1/card/insert', async (req, res) => {
  // validate req.body
  try {
    const newCard: Card = validateCard(req.body)
    await mongodb.connect()
    await mongodb.insertOne('Cards', newCard)
    res.status(200).json({
      message: 'card inserted',
      card: newCard
    })
  } catch (e: any) {
    res.status(400).send(e.message)
  }
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
