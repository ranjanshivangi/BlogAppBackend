import logger from './logger';
import { MongoClient } from 'mongodb';

const database = async () => {
    const DATABASE =
        process.env.NODE_ENV === 'test'
            ? process.env.DATABASE_TEST
            : process.env.DATABASE;

    const client = new MongoClient(DATABASE, { useNewUrlParser: true, useUnifiedTopology: true });
    const myDb = "blogAppDB";
    const collectionOne = "users";
    const collectionTwo = "blogs";

    try {
        await client.connect();
        logger.info('Connected to the database.');
        const userCollection = client.db(myDb).collection(collectionOne);
        const blogCollection = client.db(myDb).collection(collectionTwo);
        module.exports = {userCollection,blogCollection};

    } catch (error) {
        logger.error('Could not connect to the database.', error);
    }
};
export default database;