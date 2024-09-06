import { getCourses } from "@/server/actions/course-action";
const page = async () => {
  const courses = await getCourses();
  console.log(courses);
  return (
    <div>
      <span>home</span>
    </div>
  );
};

export default page;
