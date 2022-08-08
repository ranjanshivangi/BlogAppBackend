import { ObjectId } from "mongodb";

export const validObjectId = (value) => {
    if (value === null) {
        throw new Error('_id: null. Please enter the Id of the blog')
    }
    else {
        const objectId = new ObjectId(`${value}`);
        if (ObjectId.isValid(objectId)) {
            return objectId;
        }
        else {
            throw new Error('Invalid _id of the blog')
        }
    }
}
