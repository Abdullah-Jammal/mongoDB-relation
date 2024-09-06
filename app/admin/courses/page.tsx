import UploadCourse from "@/components/admin/upload-course";
import { getStages } from "@/server/actions/stage-action";
import { getTeachers } from "@/server/actions/create-teacher";

const page = async () => {
  const stages = await getStages();
  const teachers = await getTeachers();
  return (
    <div className="container mx-auto mt-12 mb-6">
      <h2 className="mb-12 font-bold text-[30px] main-color">أنشاء دورة</h2>
      <UploadCourse stages={stages} teachers={teachers} />
    </div>
  );
};

export default page;
