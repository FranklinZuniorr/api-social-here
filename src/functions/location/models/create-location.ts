import mongoose, { Schema, Document, Model } from 'mongoose';

interface Location extends Document {
  userName: string;
  location: {
    type: 'Point';
    coordinates: [number, number];
  };
}

const LocationSchema: Schema<Location> = new Schema({
  userName: {
    type: String,
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
});

LocationSchema.index({ location: '2dsphere' });

export type LocationModelType = Model<Location>;

const LocationModel: Model<Location> = mongoose.model<Location>('Location', LocationSchema);

export default LocationModel;
