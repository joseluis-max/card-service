
import { MongoClient, Collection } from 'mongodb'

/**
 * Class representing a MongoDB client.
 * @description MongoDB `instance` - The MongoDB unique instance.
 * @description string `URI` - The MongoDB connection URI.
 * @description MongoClient `client` - The MongoDB client.
 */
export default class MongoDB {
  private static instance: MongoDB
  private readonly URI!: string
  private client!: MongoClient

  /**
   * Create an instance of MongoDB.
   * @param {string} uri - The MongoDB connection URI.
   */
  constructor (uri: string) {
    if (MongoDB.instance === null) {
      MongoDB.instance = new MongoDB(uri)
      this.URI = uri
    }
    return MongoDB.instance
  }

  /**
   * Connect to the MongoDB server.
   * @returns {Promise<void>} A Promise that resolves when the connection is established.
   */
  public async connect (): Promise<void> {
    this.client = await MongoClient.connect(this.URI)
  }

  /**
   * Disconnect from the MongoDB server.
   * @returns {Promise<void>} A Promise that resolves when the disconnection is complete.
   */
  public async disconnect (): Promise<void> {
    await this.client?.close()
  }

  /**
   * Get a collection from the MongoDB database.
   * @param {string} name - The name of the collection.
   * @returns {Collection<Document>} The MongoDB collection.
   */
  public getCollection (name: string): Collection<Document> {
    return this.client.db().collection(name)
  }

  /**
   * Insert a single document into a collection.
   * @param {string} collection - The name of the collection.
   * @param {Document} document - The document to insert.
   * @returns {Promise<void>} A Promise that resolves when the document is inserted.
   */
  public async insertOne (collection: string, document: Document): Promise<void> {
    await this.getCollection(collection).insertOne(document)
  }

  /**
   * Insert multiple documents into a collection.
   * @param {string} collection - The name of the collection.
   * @param {Document[]} documents - The documents to insert.
   * @returns {Promise<void>} A Promise that resolves when the documents are inserted.
   */
  public async insertMany (collection: string, documents: Document[]): Promise<void> {
    await this.getCollection(collection).insertMany(documents)
  }

  /**
   * Find a single document in a collection.
   * @param {string} collection - The name of the collection.
   * @param {Document} query - The query to match the document.
   * @returns {Promise<Document | null>} A Promise that resolves with the matched document, or null if not found.
   */
  public async findOne (collection: string, query: Document): Promise<Document | null> {
    return this.getCollection(collection).findOne(query)
  }

  /**
   * Find multiple documents in a collection.
   * @param {string} collection - The name of the collection.
   * @param {Document} query - The query to match the documents.
   * @returns {Promise<Document[]>} A Promise that resolves with an array of matched documents.
   */
  public async findMany (collection: string, query: Document): Promise<Document[]> {
    return this.getCollection(collection).find(query).toArray()
  }

  /**
   * Update a single document in a collection.
   * @param {string} collection - The name of the collection.
   * @param {Document} query - The query to match the document.
   * @param {Document} document - The updated document.
   * @returns {Promise<void>} A Promise that resolves when the document is updated.
   */
  public async updateOne (collection: string, query: Document, document: Document): Promise<void> {
    await this.getCollection(collection).updateOne(query, document)
  }

  /**
   * Update multiple documents in a collection.
   * @param {string} collection - The name of the collection.
   * @param {Document} query - The query to match the documents.
   * @param {Document} document - The updated document.
   * @returns {Promise<void>} A Promise that resolves when the documents are updated.
   */
  public async updateMany (collection: string, query: Document, document: Document): Promise<void> {
    await this.getCollection(collection).updateMany(query, document)
  }

  /**
   * Delete a single document from a collection.
   * @param {string} collection - The name of the collection.
   * @param {Document} query - The query to match the document.
   * @returns {Promise<void>} A Promise that resolves when the document is deleted.
   */
  public async deleteOne (collection: string, query: Document): Promise<void> {
    await this.getCollection(collection).deleteOne(query)
  }

  /**
   * Deletes multiple documents from a collection based on a query.
   *
   * @param {string} collection - The name of the collection.
   * @param {Document} query - The query object specifying the documents to delete.
   * @returns {Promise<void>} A promise that resolves when the deletion is complete.
   * @throws {Error} If there is an error while deleting the documents.
   */
  public async deleteMany (collection: string, query: Document): Promise<void> {
    await this.getCollection(collection).deleteMany(query)
  }

  /**
   * Counts the number of documents in a collection based on a query.
   *
   * @param {string} collection - The name of the collection.
   * @param {Document} query - The query object specifying the documents to count.
   * @returns {Promise<number>} A promise that resolves with the number of documents matching the query.
   * @throws {Error} If there is an error while counting the documents.
   */
  public async count (collection: string, query: Document): Promise<number> {
    return this.getCollection(collection).countDocuments(query)
  }
}
