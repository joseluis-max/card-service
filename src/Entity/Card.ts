import { ObjectId } from 'mongodb'
import { Mode, State, Status, Card } from '../types'

export default class _Card {
  code: string // ok
  state: State // active, inactive
  status: Status // on, off
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
    this.code = object.code
    this.state = object.state
    this.status = object.status
    this.mode = object.mode
    this.payment = object.payment
    this.service = object.service
    this.start = new Date(object.start)
    this.end = new Date(object.end)
    this.since = new Date(object.since)
    this.until = new Date(object.until)
    this.createdAt = new Date()
    this.updatedAt = new Date()
  }
}
