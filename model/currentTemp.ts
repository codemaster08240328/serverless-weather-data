import mongoose from './db';
import { Document, Model } from 'mongoose';

const curTempSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    required: true,
  },
  timezone: {
    type: Number,
    required: true,
  },
  temp: { type: Number, required: true },
  feels_temp: { type: Number, required: true },
  temp_min: { type: Number, required: true },
  temp_max: { type: Number, required: true },
  id: { type: Number, required: true },
});

export interface ICurTempSchema extends Document {
  name: string;
  time: string;
  timezone: number;
  temp: number;
  feels_temp: number;
  temp_min: number;
  temp_max: number;
  id: number;
}

export default mongoose.model<ICurTempSchema, Model<ICurTempSchema>>(
  'CurTemp',
  curTempSchema
);
