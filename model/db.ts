import mongoose from 'mongoose';

mongoose.connect(process.env.DB_ENDPOINT || '', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

console.log('mogodb connected successfully', mongoose);

export default mongoose;
