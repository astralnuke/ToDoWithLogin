import mongoose from 'mongoose'

export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost/merndb')
    console.log('DB is connected')
  } catch (err) {
    throw new Error('Error to connect to MongoDB')
  }
}
