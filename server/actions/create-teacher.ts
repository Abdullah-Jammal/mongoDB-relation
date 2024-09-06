"use server";

import Teacher from "@/database/teacher-model";
import { connectToDatabase } from "../mongoose";
import { TeacherParams } from "../shared-params";

export async function createTeacher(teacherData: TeacherParams) {
  try {
    connectToDatabase();
    const teacher = await Teacher.create(teacherData);
    return teacher;
  } catch (error) {
    console.log(error);
  }
}

export async function getTeachers() {
  try {
    const teachers = await Teacher.find({});
    return teachers;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
