import { Schema, Document, models, model } from "mongoose";

export interface ITeacher extends Document {
  name: string;
  image?: string;
  material: string;
  createdAt: Date;
}

const TeacherSchema = new Schema({
  name: { type: String, require: true },
  image: { type: String },
  material: { type: String, require: true },
  createdAt: { type: Date, default: Date.now },
});

const Teacher = models.Teacher || model("Teacher", TeacherSchema);

export default Teacher;
