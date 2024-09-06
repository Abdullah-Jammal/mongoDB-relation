import { createTeacher } from "@/server/actions/create-teacher";

export default async function Home() {
  await createTeacher();
  return (
    <div>
      <span>Welcome mongoose to my skills</span>
      <h1>الصفحه الرئيسيه</h1>
    </div>
  );
}
