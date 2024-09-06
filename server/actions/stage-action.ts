"use server";

import { connectToDatabase } from "../mongoose";
import { StageParams } from "../shared-params";
import Stage from "@/database/stage-model";

export async function createStage(stageData: StageParams) {
  try {
    connectToDatabase();
    const stage = await Stage.create(stageData);
    return stage;
  } catch (error) {
    console.log(error);
  }
}

export async function getStages() {
  const stages = await Stage.find({});
  return stages;
}
