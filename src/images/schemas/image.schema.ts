import * as mongoose from 'mongoose'

export const ImageSchema = new mongoose.Schema({
    title: String,
    URL: String,
});
  