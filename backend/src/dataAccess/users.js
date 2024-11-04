import { Mongo } from "../database/mongo.js"
import { ObjectId } from 'mongodb'
import crypto from 'crypto'

const collectioName = 'users'

export default class UsersDataAccess {
    async getUsers() {
        const result = await Mongo.db
        .collection(collectioName)
        .find({ })
        .toArray()
        
        return result
    }

    async deleteUser(userId) {
        const result = await Mongo.db
        .collection(collectioName)
        .findOneAndDelete({ _id: new ObjectId(userId) }) 
        
        return result
    }

    async updateUser(userId, userData) {
        if(userData.password) {
            const salt = crypto.randomBytes(16)
    
            crypto.pbkdf2(userData.password, salt, 310000, 16, 'sha256', async (err, hashedPassword) => {
                if(err) {
                    throw new Error('Error during hashing password')
                }
                userData = { ...userData, password: hashedPassword, salt }
                
                const result = await Mongo.db
                .collection(collectioName)
                .findOneAndUpdate(
                    { _id: new ObjectId(userId) },
                    { $set: userData }
                )
    
                return result
            })              
        } else {
            const result = await Mongo.db
            .collection(collectioName)
            .findOneAndUpdate(
                { _id: new ObjectId(userId) },
                { $set: userData }
            )

            return result
        }       
        
    }
}