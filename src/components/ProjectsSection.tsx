"use client";

import { useState } from 'react';
import Image from 'next/image';
import { urlFor } from '../sanity/image';
import ProjectModal from './ProjectModal';
import ScrollReveal from './ScrollReveal';

type Project = {
  _id: string;
  title: string;
  summary?: string;
  image?: any;
  url?: string;
  repo?: string;
  tech?: string[];
  description?: string;
  gallery?: any[];
};

type ProjectsSectionProps = {
  projects: Project[] | null | undefined;
};

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const handleCardClick = (project: Project) => {
    setActiveProject(project);
  };

  const handleCloseModal = () => {
    setActiveProject(null);
  };

  // Transform project data into modal props
  const getModalProps = (project: Project | null) => {
    if (!project) return null;

    // Build images array
    const images: Array<{ src: string; alt: string }> = [];

    // Add main image if available
    if (project.image) {
      images.push({
        src: urlFor(project.image).width(1200).height(800).url(),
        alt: `${project.title} cover`,
      });
    }

    // Add gallery images if available (gracefully handle if gallery doesn't exist)
    if (project.gallery && Array.isArray(project.gallery)) {
      project.gallery.forEach((img: any, index: number) => {
        if (img) {
          images.push({
            src: urlFor(img).width(1200).height(800).url(),
            alt: `${project.title} - image ${index + 2}`,
          });
        }
      });
    }

    return {
      isOpen: true,
      onClose: handleCloseModal,
      title: project.title,
      images,
      description: project.description || project.summary || undefined,
      liveUrl: project.url,
      repoUrl: project.repo,
      tech: project.tech,
    };
  };

  if (!projects || projects.length === 0) {
    return null;
  }

  const modalProps = getModalProps(activeProject);

  return (
    <>
      <section aria-labelledby="projects-title" id="projects" className="mb-16 md:mb-24 lg:mb-32">
        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={5}
          blurStrength={10}
          containerClassName="mb-8"
        >
          Featured Projects
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((p) => (
            <article
              key={p._id}
              className="bg-white rounded-lg overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
              onClick={() => handleCardClick(p)}
              role="button"
              tabIndex={0}
              aria-label={`View details for ${p.title}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCardClick(p);
                }
              }}
            >
              <div className="aspect-video bg-gray-100 overflow-hidden">
                {p.image && (
                  <Image
                    src={urlFor(p.image).width(800).height(450).url()}
                    alt={`${p.title} cover`}
                    width={800}
                    height={450}
                    className="object-cover w-full h-full hover:opacity-90 transition-opacity"
                  />
                )}
              </div>
              <div className="p-6 space-y-3">
                <h3 className="text-xl md:text-2xl font-bold text-black">{p.title}</h3>
                {p.summary && <p className="text-gray-600 leading-relaxed line-clamp-2">{p.summary}</p>}
                <div className="flex gap-4">
                  {p.url && (
                    <a
                      className="text-gray-700 hover:text-red-500 transition-colors duration-200 underline"
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Live
                    </a>
                  )}
                  {p.repo && (
                    <a
                      className="text-gray-700 hover:text-red-500 transition-colors duration-200 underline"
                      href={p.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Code
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {modalProps && (
        <ProjectModal
          isOpen={modalProps.isOpen}
          onClose={modalProps.onClose}
          title={modalProps.title}
          images={modalProps.images}
          {...(modalProps.description && { description: modalProps.description })}
          {...(modalProps.liveUrl && { liveUrl: modalProps.liveUrl })}
          {...(modalProps.repoUrl && { repoUrl: modalProps.repoUrl })}
          {...(modalProps.tech && { tech: modalProps.tech })}
        />
      )}
    </>
  );
}

