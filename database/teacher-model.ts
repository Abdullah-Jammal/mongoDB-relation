import { Schema, Document, models, model } from "mongoose";

export interface ITeacher extends Document {
  name: string;
  image?: string;
  material: string;
  createdAt: Date;
}

const TeacherSchema = new Schema({
  name: { type: String, required: true }, // Fixed typo
  image: { type: String },
  material: { type: String, required: true }, // Fixed typo
  createdAt: { type: Date, default: Date.now },
});

const Teacher = models.Teacher || model<ITeacher>("Teacher", TeacherSchema);

export default Teacher;
