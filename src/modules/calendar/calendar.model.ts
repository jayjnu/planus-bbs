import mongoose, { Schema } from 'mongoose';

const Calendar = mongoose.model(
  'Calendar',
  new Schema({
    crew: { type: Schema.Types.ObjectId, ref: 'Crew' },
    start_datetime: Schema.Types.Date,
    end_datetime: Schema.Types.Date
  })
);

export default Calendar;
