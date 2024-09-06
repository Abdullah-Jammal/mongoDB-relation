import { Schema, Document, model, models } from "mongoose";

export interface ICourse extends Document {
  name: string;
  teacher: Schema.Types.ObjectId[];
  image: string;
  price: number;
  discount?: number;
  stage: Schema.Types.ObjectId[];
  createdAt: Date;
}

const CourseSchema = new Schema({
  name: { type: String, required: true },
  teacher: [{ type: Schema.Types.ObjectId, ref: "Teacher", required: true }],
  image: { type: String, required: true },
  price: { type: Number, required: true },
  discount: { type: Number },
  stage: [{ type: Schema.Types.ObjectId, ref: "Stage", required: true }],
  createdAt: { type: Date, default: Date.now },
});

const Course = models.Course || model<ICourse>("Course", CourseSchema);

export default Course;
