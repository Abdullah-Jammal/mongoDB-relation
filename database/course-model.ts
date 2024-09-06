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
  name: { type: String, require: true },
  teacher: [{ type: Schema.Types.ObjectId, ref: "Teacher" }],
  image: { type: String, require: true },
  price: { type: Number, require: true },
  discount: { type: Number },
  stage: [{ type: Schema.Types.ObjectId, ref: "Stage" }],
  createdAt: { type: Date, default: Date.now },
});

const Course = models.Course || model("Course", CourseSchema);

export default Course;
