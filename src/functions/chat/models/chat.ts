import mongoose, { Schema, Document, Model } from 'mongoose';
import { ENUM_LOCATION_TYPE } from '../../../constants';

export interface Chat {
  userName: string;
  message: string;
  location: {
    type: ENUM_LOCATION_TYPE.POINT;
    coordinates: [number, number];
  };
}

const ChatSchema: Schema<Chat & Document> = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    message: {
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
  },
  {
    timestamps: true
  }
);

ChatSchema.index({ location: '2dsphere' });
ChatSchema.index({ createdAt: 1 }, { expireAfterSeconds: 3600 });

export type ChatModelType = Model<Chat>;

const ChatModel: Model<Chat> = mongoose.model<Chat>('Chat', ChatSchema);

ChatModel.createIndexes();

export default ChatModel;
