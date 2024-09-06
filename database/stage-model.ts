import { Schema, Document, models, model } from "mongoose";

export interface IStage extends Document {
  name: string;
  material: string;
  createdAt: Date;
}

const StageSchema = new Schema({
  name: { type: String, required: true }, // Fixed typo
  material: { type: String, required: true }, // Fixed typo
  createdAt: { type: Date, default: Date.now },
});

const Stage = models.Stage || model<IStage>("Stage", StageSchema);

export default Stage;
