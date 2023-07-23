import express from 'express'
import MongoDB from './Providers/Mongodb'
import { ObjectId } from 'mongodb'
import { validateCard } from './utils/Utils'
import { Card, State, Mode } from './types'
const app = express()
app.use(express.json())
const uri = 'mongodb+srv://luisjvaldiviezo:Zf91WkuSOuhzjfEZ@cluster0.qqpuche.mongodb.net/?retryWrites=true&w=majority'
const db = new MongoDB(uri)

//TODO: change state to boolean

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

    if (!card.status) throw new Error('Card not updated, is Off !')

    if (card.state === State.inactive) {
      await db.updateOne('Cards', { _id: new ObjectId(id), state: State.inactive },  { $set: {'start': new Date(), 'state': State.active }})
    } else {
      await db.updateOne('Cards', { _id: new ObjectId(id), state: State.active },  { $set: {'end': new Date(), 'state': State.inactive }})
    }

    // TODO: search service and change for id service in card
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
app.put('/api/v1/card/update/:id', (_req, _res) => {

})

// api/v1/card/mode/:id → change working mode card.
app.post('/api/v1/card/mode/:id/:mode', async (req, res) => {
  try {
    const { id, mode } = req.params
    if (!Object.keys(Mode).includes(mode)) throw new Error(`Mode not found, will be one of the followings: ${Object.values(Mode).join(",")}!`)
    await db.connect()
    const card = await db.findOne('Cards', { _id: new ObjectId(id) })
    if (!card) throw new Error('Card not found !')
    await db.updateOne('Cards', { _id: new ObjectId(id) },  { $set: {'mode': mode }})
    res.status(200).send({
      message: 'Mode changed !',
      card: await db.findOne('Cards', { _id: new ObjectId(id) })
    })
  } catch (e: any) {
    res.status(400).send(e.message)
  }
})

// api/v1/card/mode/:id → change card payment
app.put('/api/v1/card/payment/:id', async (req, res) => {
  try {
    const { id } = req.params
    await db.connect()
    const card = await db.findOne('Cards', { _id: new ObjectId(id) })
    if (!card) throw new Error('Card not found !')
    await db.updateOne('Cards', { _id: new ObjectId(id) },  { $set: {'payment': !card.payment }})
    res.status(200).send({
      message: 'Payment Changed !',
      card: await db.findOne('Cards', { _id: new ObjectId(id) })
    })
  } catch (e: any) {
    res.status(400).send(e.message)
  }
})

// api/v1/card/status/:id → change card status
app.put('/api/v1/card/status/:id', async (req, res) => {
  try {
    const { id } = req.params
    await db.connect()
    const card = await db.findOne('Cards', { _id: new ObjectId(id) })
    if (!card) throw new Error('Card not found !')
    await db.updateOne('Cards', { _id: new ObjectId(id) },  { $set: {'status': !card.status }})
    res.status(200).send({
      message: 'Payment Changed !',
      card: await db.findOne('Cards', { _id: new ObjectId(id) })
    })
  } catch (e: any) {
    res.status(400).send(e.message)
  }
})

app.listen(3000, () => {
  console.log('server running on port 3000')
})
