"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { deleteProject } from "@/lib/actions";

interface ProjectActionsType {
  projectId: string;
}

const ProjectActions: React.FC<ProjectActionsType> = ({ projectId }) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const onDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteProject({ id: projectId });
      router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Link
        href={`/edit-project/${projectId}`}
        className="flexCenter edit-action_btn"
      >
        <Image src="/pencil.svg" width={15} height={15} alt="edit" />
      </Link>

      <button
        type="button"
        onClick={onDelete}
        className={`flexCenter delete-action_btn ${
          isDeleting ? "bg-gray" : "bg - bg-primary-purple"
        }`}
      >
        <Image src="/trash.svg" width={15} height={15} alt="delete" />
      </button>
    </>
  );
};

export default ProjectActions;
