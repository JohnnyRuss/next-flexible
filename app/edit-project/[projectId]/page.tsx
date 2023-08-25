import React from "react";

import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { getProjectDetails } from "@/lib/actions";

import Modal from "@/components/Modal";
import ProjectForm from "@/components/ProjectForm";
import { ProjectInterface } from "@/common.types";

interface pageType {
  params: { projectId: string };
}

const EditProject: React.FC<pageType> = async ({ params: { projectId } }) => {
  const session = await getCurrentUser();

  if (!session?.user) redirect("/");

  const { project } = (await getProjectDetails({ id: projectId })) as {
    project: ProjectInterface;
  };

  return (
    <Modal>
      <h3 className="modal-head-text">Edit Project</h3>
      <ProjectForm session={session} type="edit" project={project} />
    </Modal>
  );
};

export default EditProject;
