import { ObjectId } from 'mongodb'
import _Card from '../Entity/Card'
import { Card, State, Status, Mode } from '../types'

const isString = (str: any): boolean => typeof str === 'string'
// const isNumber = (number: any): boolean => typeof number === 'number'
const isBoolean = (field: any): boolean => typeof field === 'boolean'
// const isDateTime = (field: any): boolean => new Date(field) instanceof Date
const isNull = (field: any): boolean => field === undefined || field === null

export function validateId(id: any) {
  if (isNull(id)) throw new Error('Attribute id is required')
  if (!ObjectId.isValid(id)) throw new Error('Attribute id is not valid')
  return id
}

export function validateCard (body: any): Card {
  // code
  if (isNull(body.code)) throw new Error('Attribute code is required')
  if (!isString(body.code)) throw new Error('Attribute code must be a string')
  if (body.code.length < 10 || body.code.length > 10) throw new Error('Attribute code must be 10 characters long')

  // state
  if (isNull(body.state)) throw new Error('Attribute state is required')
  if (!isString(body.state)) throw new Error('Attribute state must be a string')
  if (!Object.values(State).includes(body.state)) throw new Error('Attribute state must be active or inactive')

  // status
  if (isNull(body.status)) throw new Error('Attribute status is required')
  if (!isString(body.status)) throw new Error('Attribute status must be a string')
  if (!Object.values(Status).includes(body.status)) throw new Error('Attribute status must be On or Off')

  // mode
  if (isNull(body.mode)) throw new Error('Attribute mode is required')
  if (!isString(body.mode)) throw new Error('Attribute mode must be a string')
  if (!Object.values(Mode).includes(body.mode)) throw new Error('Attribute mode must be time, montly or recharge')

  // payment
  if (isNull(body.payment)) throw new Error('Attribute payment is required')
  if (!isBoolean(body.payment)) throw new Error('Attribute payment must be a boolean')

  // service
  if (isNull(body.service)) throw new Error('Attribute service is required')
  if (!ObjectId.isValid(body.service)) throw new Error('Attribute service must be a number')

  return new _Card(body)
}
