import mongoose, { Schema, Document } from "mongoose";

export interface IChat extends Document {

  participants: mongoose.Types.ObjectId[];
  lastMessage?: mongoose.Types.ObjectId;
  createdAt: Date;

}

const ChatSchema = new Schema({

  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  ],

  lastMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
},
{
  timestamps: true
});

export default mongoose.model<IChat>("Chat", ChatSchema);