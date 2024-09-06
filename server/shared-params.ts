// import { Schema } from "mongoose";

// import { IStage } from "@/database/stage-model";
// import { ITeacher } from "@/database/teacher-model";

export interface TeacherParams {
  name: string;
  image?: string;
  material: string;
}

export interface StageParams {
  name: string;
  material: string;
}

export interface CourseParams {
  name: string;
  teacher: string; // Accept as string
  image: string;
  price: number;
  discount?: number;
  stage: string; // Accept as string
}
