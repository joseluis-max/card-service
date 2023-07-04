import { MongoClient, Collection, Document } from 'mongodb'

export default class MongoDB {
  private readonly client: MongoClient

  constructor (uri: string) {
    this.client = new MongoClient(uri)
  }

  async connect (): Promise<void> {
    await this.client.connect()
  }

  async disconnect (): Promise<void> {
    await this.client.close()
  }

  getCollection (collectionName: string): Collection<Document> {
    return this.client.db().collection(collectionName)
  }

  async insertOne (collectionName: string, document: Document): Promise<void> {
    await this.getCollection(collectionName).insertOne(document)
  }
}
