import mongoose, { Schema, Document, Model } from 'mongoose';
import { ENUM_LOCATION_TYPE } from '../constants';

export interface Location {
  userName: string;
  location: {
    type: ENUM_LOCATION_TYPE.POINT;
    coordinates: [number, number];
  };
}

const LocationSchema: Schema<Location & Document> = new Schema({
  userName: {
    type: String,
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: [ENUM_LOCATION_TYPE.POINT],
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