import mongoose from 'mongoose';

mongoose.connect(process.env.DB_ENDPOINT || '', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default mongoose;
