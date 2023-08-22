import React from "react";
import { getAllProjects } from "@/lib/actions";

import Categories from "@/components/Categories";
import ProjectCard from "@/components/ProjectCard";

import { ProjectInterface } from "@/common.types";

interface HomeType {}

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

const Home: React.FC<HomeType> = async () => {
  const data = (await getAllProjects()) as ProjectSearch;
  const projectsToDisplay = data?.projectSearch?.edges || [];

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
      <h1>categories</h1>

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

      <h1>load more</h1>
    </section>
  );
};

export default Home;
