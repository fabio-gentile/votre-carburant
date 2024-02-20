import mongoose, { Schema, models, InferSchemaType } from 'mongoose';

interface Bookmark {
  stationId: string;
  _id?: string;
}

interface IUser {
  name: string;
  email: string;
  avatar?: string;
  bookmarks?: Bookmark[];
}

const userSchema: Schema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    bookmarks: [
      {
        stationId: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const UserModel: mongoose.Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default UserModel;
