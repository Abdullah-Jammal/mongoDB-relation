"use server";

import Course from "@/database/course-model";
import { connectToDatabase } from "../mongoose";
import { CourseParams } from "../shared-params";
import { ObjectId } from "mongodb";

export async function createCourse(courseData: CourseParams) {
  try {
    connectToDatabase();

    const { image, price, discount, teacher, name, stage } = courseData;

    // Convert teacher and stage to ObjectId
    const teacherId = new ObjectId(teacher);
    const stageId = new ObjectId(stage);

    const course = await Course.create({
      name,
      stage: stageId,
      teacher: teacherId,
      discount,
      price,
      image,
    });

    return course;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
