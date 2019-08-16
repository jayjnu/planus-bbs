import mongoose, { Schema } from 'mongoose';

const Crew = mongoose.model(
  'Crew',
  new Schema({
    members: { type: Schema.Types.ObjectId, ref: 'User' }
  })
);

export default Crew;
