import Image from "next/image";
import Link from "next/link";
import { getUserProjects } from "@/lib/actions";
import { ProjectInterface, UserProfile } from "@/common.types";

interface RelatedProjectsType {
  userId: string;
  projectId: string;
}

const RelatedProjects: React.FC<RelatedProjectsType> = async ({
  userId,
  projectId,
}) => {
  const { user } = (await getUserProjects({ id: userId })) as {
    user?: UserProfile;
  };

  const projects = user?.projects?.edges?.filter(
    ({ node: project }) => project?.id !== projectId
  );

  if (projects?.length === 0) return null;

  return (
    <section className="flex flex-col mt-32 w-full">
      <div className="flexBetween">
        <p className="text-base font-bold">More by {user?.name}</p>
        <Link
          href={`/profile/${user?.id}`}
          className="text-primary-purple text-base"
        >
          View All
        </Link>
      </div>

      <div className="related_projects-grid">
        {projects?.map(({ node }: { node: ProjectInterface }) => (
          <div className="flexCenter related_project-card drop-shadow-card">
            <Link
              href={`/project/${node?.id}`}
              className="flexCenter group relative w-full h-full rounded-2xl overflow-hidden"
            >
              <Image
                src={node?.image}
                width={414}
                height={314}
                className="max-w-[414px] max-h-[314px] w-full h-full object-cover object-top"
                alt="project image"
              />

              <div className="hidden group-hover:flex related_project-card_title">
                <p className="w-full">{node?.title}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RelatedProjects;
