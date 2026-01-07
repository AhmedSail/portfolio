import HomeView from "@/src/modules/home/ui/view/home-view";
import { getProjects, getSkills, getProfile } from "@/src/db/queries";

export const revalidate = 3600; // revalidate every hour

const page = async () => {
  const [projects, skills, profile] = await Promise.all([
    getProjects(),
    getSkills(),
    getProfile(),
  ]);
  return (
    <div>
      <HomeView projects={projects} skills={skills} profile={profile} />
    </div>
  );
};

export default page;
