import { Schema, Document, models, model } from "mongoose";

export interface IStage extends Document {
  name: string;
  material: string;
  createdAt: Date;
}

const StageSchema = new Schema({
  name: { type: String, require: true },
  material: { type: String, require: true },
  createdAt: { type: Date, default: Date.now },
});

const Stage = models.Stage || model("Stage", StageSchema);

export default Stage;
