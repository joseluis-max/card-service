import express from 'express'
import { ObjectId } from 'mongodb'
import MongoDB from './Providers/Mongodb'
import { validateCard } from './utils/Utils'
import { Card, State, Status } from './types'
const app = express()
app.use(express.json())
const uri = 'mongodb+srv://luisjvaldiviezo:Zf91WkuSOuhzjfEZ@cluster0.qqpuche.mongodb.net/?retryWrites=true&w=majority'
const db = new MongoDB(uri)

// /api/v1/card/insert → insert a new card.
app.post('/api/v1/card/insert', async (req, res) => {
  try {
    const newCard: Card = validateCard(req.body)
    await db.connect()
    await db.insertOne('Cards', newCard)
    res.status(200).json({
      message: 'Card inserted !',
      card: newCard
    })
    await db.disconnect()
  } catch (e: any) {
    res.status(400).send(e.message)
  }
})

// /api/v1/card/delete → delete a card.
app.delete('/api/v1/card/delete/:id', async (req, res) => {
  try {
    const { id } = req.params
    await db.connect()
    const result = await db.deleteOne('Cards', { _id: new ObjectId(id) })
    if (result.deletedCount === 0) throw new Error('Card not found !')
    res.status(200).send({ message: 'Card deleted !'})
  } catch (e: any) {
    res.status(400).send(e.message)
  }
})

// api/v1/card/:id → Get information from a card.
app.get('/api/v1/card/:id', async (req, res) => {
  try {
    const { id } = req.params
    await db.connect()
    const result = await db.findOne('Cards', { _id: new ObjectId(id) })
    await db.disconnect()

    if (!result) throw new Error('Card not found !')
    res.status(200).send({
      messsage: 'Card found !',
      card: result
    })
  } catch (e: any) {
    res.status(400).send(e.message)
  }
})

// api/v1/card/start /:id→ active service time card.
app.put('/api/v1/card/read/:id', async (req, res) => {
  try {
    const { id } = req.params
    await db.connect()
    const card = await db.findOne('Cards', { _id: new ObjectId(id) })
    if (!card) throw new Error('Card not found !')

    if (card.status === Status.off) throw new Error('Card not updated, is Off !')

    if (card.state === State.inactive) {
      await db.updateOne('Cards', { _id: new ObjectId(id), status: Status.on },  { $set: {'start': new Date(), 'state': State.active }})
    } else {
      await db.updateOne('Cards', { _id: new ObjectId(id), status: Status.on },  { $set: {'end': new Date(), 'state': State.inactive }})
    }

    res.status(200).send({
      message: 'Card update !',
      card: await db.findOne('Cards', { _id: new ObjectId(id) })
    })
    await db.disconnect()
  } catch (e: any) {
    res.status(400).send(e.message)
  }
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
