import { ObjectId } from 'mongodb'
import { Card, State, Status, Mode } from '../types'

const isString = (str: any): boolean => typeof str === 'string'
const isBoolean = (field: any): boolean => typeof field === 'boolean'
const isDateTime = (field: any): boolean => field instanceof Date
const isNull = (field: any): boolean => field === null

export function validateCard (body: any): Card {
  // code
  if (isNull(body.code)) throw new Error('Attribute code is required')
  if (!isString(body.code)) throw new Error('Attribute code must be a string')
  if (body.code.length < 10 || body.code.length > 10) throw new Error('Attribute code must be 10 characters long')

  // state
  if (isNull(body.state)) throw new Error('Attribute state is required')
  if (!isString(body.state)) throw new Error('Attribute state must be a string')
  if (Object.values(State).includes(body.state)) throw new Error('Attribute state must be active or inactive')

  // status
  if (isNull(body.status)) throw new Error('Attribute status is required')
  if (!isString(body.status)) throw new Error('Attribute status must be a string')
  if (Object.values(Status).includes(body.status)) throw new Error('Attribute status must be On or Off')

  // mode
  if (isNull(body.mode)) throw new Error('Attribute mode is required')
  if (!isString(body.mode)) throw new Error('Attribute mode must be a string')
  if (Object.values(Mode).includes(body.mode)) throw new Error('Attribute mode must be time, montly or recharge')

  // payment
  if (isNull(body.payment)) throw new Error('Attribute payment is required')
  if (!isBoolean(body.payment)) throw new Error('Attribute payment must be a boolean')

  // service
  if (isNull(body.service)) throw new Error('Attribute service is required')
  if (body.service instanceof ObjectId) throw new Error('Attribute service must be a string')

  // start
  if (isNull(body.start)) throw new Error('Attribute start is required')
  if (!isDateTime(body.start)) throw new Error('Attribute start must be a string')

  // end
  if (isNull(body.end)) throw new Error('Attribute end is required')
  if (!isDateTime(body.end)) throw new Error('Attribute end must be a string')

  // since
  if (isNull(body.since)) throw new Error('Attribute since is required')
  if (!isDateTime(body.since)) throw new Error('Attribute since must be a string')

  // until
  if (isNull(body.until)) throw new Error('Attribute until is required')
  if (!isDateTime(body.until)) throw new Error('Attribute until must be a string')

  return 
}
