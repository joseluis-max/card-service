import { MongoClient, Collection, Document, DeleteResult, UpdateResult } from 'mongodb'
import { Database } from '../types'
export default class MongoDB implements Database {
  readonly _client: MongoClient

  constructor (uri: string) {
    this._client = new MongoClient(uri)
  }

  async connect (): Promise<void> {
    await this._client.connect()
  }

  async disconnect (): Promise<void> {
    await this._client.close()
  }

  getCollection (collectionName: string): Collection<Document> {
    return this._client.db().collection(collectionName)
  }

  async insertOne (collectionName: string, document: Document): Promise<void> {
    await this.getCollection(collectionName).insertOne(document)
  }

  async deleteOne (collectionName: string, filter: Document): Promise<DeleteResult> {
    return await this.getCollection(collectionName).deleteOne(filter)
  }

  async findOne (collectionName: string, filter: Document): Promise<Document | null> {
    return await this.getCollection(collectionName).findOne(filter)
  }

  async updateOne (collectionName: string, filter: Document, document: Document): Promise<UpdateResult> {
    return await this.getCollection(collectionName).updateOne(filter, document)
  }
}
