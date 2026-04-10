'use client';

import { useCallback, useEffect, useId, useRef } from 'react';

export type ProjectModalProject = {
  name: string;
  description: string;
  tech: string[];
  liveUrl: string;
  githubUrl?: string;
  githubUrls?: string[];
  status: string;
};

type ProjectModalProps = {
  isOpen: boolean;
  onCloseAction: () => void;
  project: ProjectModalProject;
};

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
  ).filter((el) => !el.hasAttribute('disabled') && el.tabIndex !== -1);
}

function isValidHttpUrl(value: string): boolean {
  try {
    const u = new URL(value);
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch {
    return false;
  }
}

function getGithubLinks(project: ProjectModalProject): string[] {
  if (project.githubUrls?.length) {
    return project.githubUrls.filter(Boolean);
  }
  if (project.githubUrl) {
    return [project.githubUrl];
  }
  return [];
}

export function ProjectModal({
  isOpen,
  onCloseAction,
  project,
}: ProjectModalProps) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const onCloseActionRef = useRef(onCloseAction);

  useEffect(() => {
    onCloseActionRef.current = onCloseAction;
  }, [onCloseAction]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!isOpen || !dialogRef.current) return;

      if (event.key === 'Escape') {
        event.preventDefault();
        onCloseActionRef.current();
        return;
      }

      if (event.key !== 'Tab') return;

      const focusables = getFocusableElements(dialogRef.current);
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (first == null || last == null) return;

      const active = document.activeElement as HTMLElement | null;

      if (event.shiftKey) {
        if (active === first || !dialogRef.current.contains(active)) {
          event.preventDefault();
          last.focus();
        }
      } else if (active === last) {
        event.preventDefault();
        first.focus();
      }
    },
    [isOpen],
  );

  useEffect(() => {
    if (!isOpen) {
      return () => {};
    }

    previousFocusRef.current = document.activeElement as HTMLElement | null;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const frame = requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
      previousFocusRef.current?.focus?.();
      previousFocusRef.current = null;
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) {
    return null;
  }

  const githubLinks = getGithubLinks(project).filter(isValidHttpUrl);
  const showLive = project.liveUrl && isValidHttpUrl(project.liveUrl);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="presentation"
      onClick={onCloseAction}
    >
      <div
        className="absolute inset-0 bg-black/50 dark:bg-black/70"
        aria-hidden="true"
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 max-h-[min(90vh,40rem)] w-full max-w-lg overflow-y-auto rounded-2xl border border-borderSubtle bg-white p-6 shadow-card dark:border-white/10 dark:bg-[#1A1F25] md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onCloseAction}
          className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full text-textSecondary transition-colors hover:bg-bgMuted hover:text-textPrimary focus:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 dark:text-[#C2CBD4] dark:hover:bg-white/10 dark:hover:text-[#F2F5F8] dark:focus-visible:ring-tealDark dark:focus-visible:ring-offset-[#1A1F25]"
          aria-label="Close dialog"
        >
          <svg
            className="size-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="pr-10">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-textMuted dark:text-[#8A94A0]">
            {project.status}
          </p>
          <h2
            id={titleId}
            className="text-xl font-semibold text-textPrimary dark:text-[#F2F5F8] md:text-2xl"
          >
            {project.name}
          </h2>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-textSecondary dark:text-[#C2CBD4] md:text-base">
          {project.description}
        </p>

        {project.tech.length > 0 ? (
          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tech stack">
            {project.tech.map((item) => (
              <li key={item}>
                <span className="inline-block rounded-full border border-borderSubtle bg-offWhite px-3 py-1 text-xs font-medium text-textSecondary dark:border-white/10 dark:bg-white/5 dark:text-[#C2CBD4]">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {showLive ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-teal px-5 py-2.5 text-sm font-semibold text-textPrimary transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 dark:bg-tealDark dark:text-white dark:focus-visible:ring-tealDark dark:focus-visible:ring-offset-[#1A1F25]"
            >
              Live demo
            </a>
          ) : null}

          {githubLinks.map((url, index) => (
            <a
              key={url}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={
                githubLinks.length > 1
                  ? `View ${project.name} on GitHub (${index + 1} of ${githubLinks.length})`
                  : `View ${project.name} on GitHub`
              }
              className="inline-flex items-center justify-center rounded-full border-2 border-teal bg-transparent px-5 py-2.5 text-sm font-semibold text-teal transition-colors hover:bg-teal/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 dark:border-tealDark dark:text-tealDark dark:hover:bg-tealDark/10 dark:focus-visible:ring-tealDark dark:focus-visible:ring-offset-[#1A1F25]"
            >
              {githubLinks.length > 1 ? `GitHub (${index + 1})` : 'GitHub'}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
