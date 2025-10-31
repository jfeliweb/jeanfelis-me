"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

type ProjectModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  images: Array<{ src: string; alt: string }>;
  description?: string;
  liveUrl?: string;
  repoUrl?: string;
  tech?: string[];
};

export default function ProjectModal({
  isOpen,
  onClose,
  title,
  images,
  description,
  liveUrl,
  repoUrl,
  tech,
}: ProjectModalProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  const hasMultipleImages = images.length > 1;

  // Reset slide when modal opens or images change
  useEffect(() => {
    if (isOpen) {
      setActiveSlide(0);
      // Store the previously focused element
      previousActiveElement.current = document.activeElement as HTMLElement;
      // Focus the close button when modal opens
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 0);
    }
  }, [isOpen, images.length]);

  // Focus trap
  useEffect(() => {
    if (!isOpen) return;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const modal = modalRef.current;
      if (!modal) return;

      const focusableElements = modal.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleTabKey);
    return () => document.removeEventListener('keydown', handleTabKey);
  }, [isOpen]);

  // Handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Restore focus when modal closes
  useEffect(() => {
    if (!isOpen && previousActiveElement.current) {
      previousActiveElement.current.focus();
      previousActiveElement.current = null;
    }
  }, [isOpen]);

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Carousel navigation
  const goToNext = () => {
    setActiveSlide((prev) => (prev + 1) % images.length);
  };

  const goToPrevious = () => {
    setActiveSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-[1000]"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-2xl rounded-xl bg-white dark:bg-zinc-900 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Close button */}
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 dark:bg-zinc-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-zinc-800 transition-colors shadow-lg"
          aria-label="Close project details"
        >
          <svg className="w-5 h-5 text-gray-900 dark:text-gray-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image carousel */}
        <div className="relative h-64 sm:h-80 bg-black flex items-center justify-center">
          {images.length > 0 && images[activeSlide]?.src ? (
            <>
              <Image
                src={images[activeSlide].src}
                alt={images[activeSlide].alt}
                fill
                className="object-contain"
                priority
              />
              
              {/* Navigation arrows */}
              {hasMultipleImages && (
                <>
                  <button
                    onClick={goToPrevious}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 dark:bg-zinc-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-zinc-800 transition-colors shadow-lg z-10"
                    aria-label="Previous image"
                  >
                    <svg className="w-5 h-5 text-gray-900 dark:text-gray-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={goToNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 dark:bg-zinc-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-zinc-800 transition-colors shadow-lg z-10"
                    aria-label="Next image"
                  >
                    <svg className="w-5 h-5 text-gray-900 dark:text-gray-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  
                  {/* Slide indicator */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs font-medium z-10">
                    {activeSlide + 1} / {images.length}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="text-gray-400 text-sm">No image available</div>
          )}
        </div>

        {/* Content section */}
        <div className="p-6 overflow-y-auto flex-1">
          <h2 id="project-modal-title" className="text-2xl md:text-3xl font-bold text-black dark:text-white mb-4">
            {title}
          </h2>

          {/* Description */}
          {description && (
            <div className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              {description}
            </div>
          )}

          {/* Tech stack */}
          {tech && tech.length > 0 && (
            <ul className="flex flex-wrap gap-2 mt-4">
              {tech.map((t) => (
                <li
                  key={t}
                  className="rounded-full border px-3 py-1 text-xs font-medium bg-zinc-50 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:border-zinc-700"
                >
                  {t}
                </li>
              ))}
            </ul>
          )}

          {/* Links */}
          <div className="flex gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-zinc-700">
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-gray-900 dark:bg-zinc-800 text-white hover:bg-gray-800 dark:hover:bg-zinc-700 transition-colors font-medium"
              >
                Live
              </a>
            )}
            {repoUrl && (
              <a
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors font-medium"
              >
                Code
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

