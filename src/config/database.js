import logger from './logger';
import { MongoClient } from 'mongodb';

const database = async () => {
    const DATABASE =
        process.env.NODE_ENV === 'test'
            ? process.env.DATABASE_TEST
            : process.env.DATABASE;
    const client = await MongoClient.connect(DATABASE, { useNewUrlParser: true, useUnifiedTopology: true });
    logger.info('Connected to the database.');
    
    try {
        const userCollection = client.db(process.env.myDb).collection(process.env.userCollection);
        const blogCollection = client.db(process.env.myDb).collection(process.env.blogCollection);
        module.exports = { userCollection, blogCollection };

    } catch (error) {
        logger.error('Could not connect to the database.', error);
    }
};
export default database;