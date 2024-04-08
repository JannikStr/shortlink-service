import { Schema, model, models } from "mongoose";

export interface UserDocument {
  email: string;
  password: string;
  name: string;
  image?: string;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<UserDocument>({
  email: {
    type: String,
    unique: true,
    required: [true, "Email address is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    select: false
  },
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [3, "Name must be at least 3 characters long."],
    maxlength: [30, "Name cannot be longer than 30 characters."]
  },
  image: {
    type: String,
    required: false,
    default: ""
  },
}, {
    timestamps: true
});

const User = models.User || model<UserDocument>("User", UserSchema);

export default User;
