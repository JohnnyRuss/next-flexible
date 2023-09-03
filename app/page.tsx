import React from "react";
import { getAllProjects } from "@/lib/actions";

import Categories from "@/components/Categories";
import ProjectCard from "@/components/ProjectCard";
import LoadMore from "@/components/LoadMore";

import { ProjectInterface } from "@/common.types";

interface HomeType {
  searchParams: { category: string; end_cursor: string; start_cursor: string };
}

interface ProjectSearch {
  projectSearch: {
    edges: {
      node: ProjectInterface;
    }[];
    pageInfo: {
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor: string;
      endCursor: string;
    };
  };
}

export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = true;

const Home: React.FC<HomeType> = async ({
  searchParams: { category, start_cursor, end_cursor },
}) => {
  const data = (await getAllProjects({
    category,
    first: 3,
    startCursor: start_cursor,
    endCursor: end_cursor,
  })) as ProjectSearch;

  const projectsToDisplay = data?.projectSearch?.edges || [];
  const pageInfo = data?.projectSearch?.pageInfo;

  if (projectsToDisplay.length === 0)
    return (
      <section className="flexStart flex-col paddings">
        <Categories />

        <p className="no-result-text text-center">
          No projects found, go create some first.
        </p>
      </section>
    );

  return (
    <section className="flexStart flex-col paddings mb-16">
      <Categories />

      <section className="projects-grid">
        {projectsToDisplay.map(({ node: project }) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            image={project.image}
            title={project.title}
            name={project.createdBy.name}
            userId={project.createdBy.id}
            avatarUrl={project.createdBy.avatarUrl}
          />
        ))}
      </section>

      <LoadMore
        startCursor={pageInfo?.startCursor}
        endCursor={pageInfo.endCursor}
        hasPreviousPage={pageInfo.hasPreviousPage}
        hasNextPage={pageInfo.hasNextPage}
      />
    </section>
  );
};

export default Home;
