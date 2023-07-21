import { ObjectId } from 'mongodb'

export enum Status {
  on = 'On',
  off = 'Off'
}

export enum State {
  active = 'active',
  inactive = 'inactive'
}

export enum Mode {
  time = 'time',
  montly = 'montly',
  recharge = 'recharge'
}

export interface Card {
  code: string // ok
  state: State // active, inactive
  status: Status // on, off
  mode: Mode //
  payment: boolean
  service: ObjectId
  start: Date
  end: Date
  since: Date
  until: Date
  createdAt: Date
  updatedAt: Date
}

export interface Database {
  readonly _client: any
  connect: () => Promise<void>
  disconnect: () => Promise<void>
  getCollection: (collectionName: string) => any
  insertOne: (collectionName: string, document: any) => Promise<void>
}
