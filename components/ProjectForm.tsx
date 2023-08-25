"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { categoryFilters } from "@/constants";
import { createProject, updateProject } from "@/lib/actions";

import FormField from "@/components/FormField";
import CustomMenu from "@/components/CustomMenu";
import Button from "@/components/Button";

import { ProjectInterface, SessionInterface } from "@/common.types";

interface ProjectFormType {
  type: "create" | "edit";
  session: SessionInterface;
  project?: ProjectInterface;
}

const ProjectForm: React.FC<ProjectFormType> = ({ type, session, project }) => {
  const router = useRouter();

  const [form, setForm] = useState({
    image: project?.image || "",
    title: project?.title || "",
    description: project?.description || "",
    liveSiteUrl: project?.liveSiteUrl || "",
    githubUrl: project?.githubUrl || "",
    category: project?.category || "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleStateChange(fieldName: string, value: string) {
    setForm((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  }

  function onChangeImage(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();

    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.includes("image"))
      return alert("please upload an image file");

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => handleStateChange("image", reader.result as string);
  }

  async function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      if (type === "create")
        await createProject({ form, creatorId: session.user.id });
      else if (type === "edit" && project)
        await updateProject({ form, projectId: project.id! });

      router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleFormSubmit} className="flexStart form">
      <div className="flexStart form_image-container">
        <label htmlFor="poster" className="flexCenter form_image-label">
          {!form.image && "choose a poster for your project"}
        </label>

        <input
          type="file"
          id="image"
          accept="image/*"
          className="form_image-input"
          onChange={onChangeImage}
        />

        {form.image && (
          <Image
            src={form.image}
            alt="poster"
            className="sm:p-10 object-contain z-20"
            fill
          />
        )}
      </div>

      <FormField
        title="Title"
        state={form.title}
        placeholder="Flexible"
        setState={(value) => handleStateChange("title", value)}
      />

      <FormField
        title="Description"
        state={form.description}
        placeholder="Showcase and discover remakable developer projects."
        setState={(value) => handleStateChange("description", value)}
      />

      <FormField
        type="url"
        title="Website URL"
        state={form.liveSiteUrl}
        placeholder="https://example.com"
        setState={(value) => handleStateChange("liveSiteUrl", value)}
      />

      <FormField
        type="url"
        title="Github URL"
        state={form.githubUrl}
        placeholder="https://github.com/user-name"
        setState={(value) => handleStateChange("githubUrl", value)}
      />

      <CustomMenu
        title="Category"
        state={form.category}
        filters={categoryFilters}
        setState={(value) => handleStateChange("category", value)}
      />

      <div className="flxStart w-full">
        <Button
          title={
            isSubmitting
              ? type === "create"
                ? "Creating"
                : "Editing"
              : type === "create"
              ? "Create"
              : "Edit"
          }
          type="submit"
          leftIcon={isSubmitting ? "" : "/plus.svg"}
          isSubmitting={isSubmitting}
        />
      </div>
    </form>
  );
};

export default ProjectForm;
