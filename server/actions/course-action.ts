"use server";

import Course from "@/database/course-model";
import { connectToDatabase } from "../mongoose";
import { CourseParams } from "../shared-params";
import { ObjectId } from "mongodb";
import Teacher from "@/database/teacher-model";
import Stage from "@/database/stage-model";

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

// Assuming you have a function to get courses
export async function getCourses() {
  try {
    connectToDatabase();
    // Use `populate()` to fetch related data for teacher and stage
    const courses = await Course.find({})
      .populate({ path: "teacher", model: Teacher })
      .populate({ path: "stage", model: Stage })
      .sort({ createdAt: -1 }); // Sort by creation date (newest first)
    return courses;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
