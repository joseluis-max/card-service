import { MongoClient, Collection } from 'mongodb'
import MongoDB from '../src/Providers/Mongodb'

// Mock the MongoDB client and collection
jest.mock('mongodb')

describe('MongoDB', () => {
  let mongoDB: MongoDB
  let mockClient: MongoClient
  let mockCollection: Collection<Document>

  beforeEach(() => {
    // Create a new instance of MongoDB
    mongoDB = new MongoDB('mongodb://localhost:27017/test')

    // Create a mock instance of the MongoClient
    mockClient = new MongoClient()

    // Create a mock instance of the Collection
    mockCollection = ({
      findOne: jest.fn(),
      find: jest.fn().mockReturnThis(),
      toArray: jest.fn(),
      insertOne: jest.fn(),
      insertMany: jest.fn(),
      updateOne: jest.fn(),
      updateMany: jest.fn(),
      deleteOne: jest.fn(),
      deleteMany: jest.fn(),
      countDocuments: jest.fn()
    } as unknown) as Collection<Document>

    // Mock the MongoClient and collection
    MongoClient.connect = jest.fn().mockResolvedValue(mockClient)
    mongoDB.getCollection = jest.fn().mockReturnValue(mockCollection)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('connect', () => {
    it('should connect to the MongoDB server', async () => {
      await mongoDB.connect()

      expect(MongoClient.connect).toHaveBeenCalledWith('mongodb://localhost:27017/test')
      expect(mongoDB.client).toBe(mockClient)
    })
  })

  describe('disconnect', () => {
    it('should disconnect from the MongoDB server', async () => {
      await mongoDB.disconnect()

      expect(mockClient.close).toHaveBeenCalled()
    })
  })

  describe('getCollection', () => {
    it('should return the MongoDB collection', () => {
      const collectionName = 'users'
      const collection = mongoDB.getCollection(collectionName)

      expect(collection).toBe(mockCollection)
      expect(mongoDB.client.db().collection).toHaveBeenCalledWith(collectionName)
    })
  })

  describe('insertOne', () => {
    it('should insert a single document into a collection', async () => {
      const collectionName = 'users'
      const document = { name: 'John Doe' }

      await mongoDB.insertOne(collectionName, document)

      expect(mockCollection.insertOne).toHaveBeenCalledWith(document)
    })
  }
})
