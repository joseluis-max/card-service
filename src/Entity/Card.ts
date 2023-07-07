import { ObjectId } from 'mongodb'
import { Mode, State, Status } from '../types'

export default class Card {
  code: string // ok
  state: State // active, inactive
  status: Status // active, inactive
  mode: Mode //
  payment: boolean
  service: ObjectId
  start: Date // Date
  end: DateTime
  since: DateTime
  until: Datetime
  createdAt: DateTime
  updatedAt: DateTime
  constructor(object) {
    this.code = object.code
    this.state = object.state
    this.status = object.status
    this.mode = object.mode
    this.payment = object.payment
    this.service = object.service
    this.start = object.start
    this.end = object.end
    this.since = object.since
    this.until = object.until
    this.createdAt = object.createdAt
    this.updatedAt = object.updatedAt
  }
}