import mongoose from 'mongoose';

export const conenctDB = async () => {
  const dbUri = process.env.DATABASE_URL;

  try {
    await mongoose.connect(dbUri);
  } catch (err) {
    console.error('Error while connecting to mongo db');
    throw err;
  }
};
