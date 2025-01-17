import { Schema, model, models } from "mongoose";

export interface LinkDocument {
  tag: string;
  description: string;
  url: string;
  creator_id: string;
  createdAt: Date;
  updatedAt: Date;
};

const LinkSchema = new Schema<LinkDocument>({
  tag: {
    type: String,
    required: [true, "Tag is required"],
    unique: true,
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  creator_id: {
    type: String,
    required: [true, "Creator Id is required"],
  },
  url: {
    type: String,
    required: [true, "URL is required"],
  },
}, {
  timestamps: true
});

const Link = models.Link || model<LinkDocument>("Link", LinkSchema);
export default Link;
