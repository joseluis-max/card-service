import { ObjectId } from 'mongodb'
import { Mode, State, Card } from '../types'

export default class _Card {
  code: string // ok
  state: State // active, inactive
  status: boolean // on, off
  mode: Mode //
  payment: boolean
  service: ObjectId
  start: Date // Date
  end: Date
  since: Date
  until: Date
  createdAt: Date
  updatedAt: Date

  constructor (object: Card) {
    const now = new Date()
    this.code = object.code
    this.state = object.state
    this.status = object.status
    this.mode = object.mode
    this.payment = object.payment
    this.service = object.service
    this.start = now
    this.end = now
    this.since = now
    this.until = now
    this.createdAt = now
    this.updatedAt = now
  }
}
