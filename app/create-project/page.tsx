import React from "react";

import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";

import Modal from "@/components/Modal";
import ProjectForm from "@/components/ProjectForm";

interface pageType {}

const CreateProject: React.FC<pageType> = async () => {
  const session = await getCurrentUser();

  if (!session?.user) redirect("/");

  return (
    <Modal>
      <h3 className="modal-head-text">Create a New Project</h3>
      <ProjectForm session={session} type="create" />
    </Modal>
  );
};

export default CreateProject;
