'use client';

import { type FormEvent, useState } from 'react';

type FormDataState = {
  name: string;
  email: string;
  message: string;
  website: string;
};

type SubmitStatus =
  | { type: null; message: string }
  | { type: 'success'; message: string }
  | { type: 'error'; message: string };

const inputClassName =
  'w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-textPrimary placeholder-textMuted focus:outline-none focus:ring-2 focus:ring-teal dark:border-white/10 dark:bg-[#1A1F25] dark:text-[#F2F5F8] dark:focus:ring-tealDark';

export function ContactForm() {
  const [formData, setFormData] = useState<FormDataState>({
    name: '',
    email: '',
    message: '',
    website: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>({
    type: null,
    message: '',
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.website !== '') {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    const formEl = e.currentTarget;
    const fd = new FormData(formEl);
    const params = new URLSearchParams();
    for (const [key, value] of Array.from(fd.entries())) {
      params.append(key, String(value));
    }
    const body = params.toString();

    fetch('/__forms.html', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Request failed');
        }
        setSubmitStatus({
          type: 'success',
          message: "Message sent! I'll get back to you soon.",
        });
        setFormData({ name: '', email: '', message: '', website: '' });
      })
      .catch(() => {
        setSubmitStatus({
          type: 'error',
          message: 'Failed to send message. Please try again.',
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <form
      name="contact"
      onSubmit={handleSubmit}
      className="relative w-full max-w-xl"
    >
      <input type="hidden" name="form-name" value="contact" />

      <div
        className="pointer-events-none absolute opacity-0"
        style={{ left: -9999 }}
        aria-hidden
      >
        <input
          type="text"
          name="website"
          value={formData.website}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, website: e.target.value }))
          }
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
        />
      </div>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="contact-name"
            className="mb-1.5 block text-sm font-medium text-textPrimary dark:text-[#F2F5F8]"
          >
            Name
          </label>
          <input
            id="contact-name"
            type="text"
            name="name"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            required
            className={inputClassName}
            placeholder="Your name"
          />
        </div>

        <div>
          <label
            htmlFor="contact-email"
            className="mb-1.5 block text-sm font-medium text-textPrimary dark:text-[#F2F5F8]"
          >
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            name="email"
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
            required
            className={inputClassName}
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label
            htmlFor="contact-message"
            className="mb-1.5 block text-sm font-medium text-textPrimary dark:text-[#F2F5F8]"
          >
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            value={formData.message}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, message: e.target.value }))
            }
            required
            rows={5}
            className={`${inputClassName} resize-y`}
            placeholder="Your message"
          />
        </div>
      </div>

      {submitStatus.type === 'success' ? (
        <div
          className="mt-4 rounded-lg border border-success/40 bg-success/10 px-4 py-3 text-sm text-success dark:border-success/50 dark:bg-success/15 dark:text-success"
          role="status"
        >
          {submitStatus.message}
        </div>
      ) : null}

      {submitStatus.type === 'error' ? (
        <div
          className="mt-4 rounded-lg border border-error/40 bg-error/10 px-4 py-3 text-sm text-error dark:border-error/50 dark:bg-error/15 dark:text-error"
          role="alert"
        >
          {submitStatus.message}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 w-full rounded-lg bg-teal px-6 py-3 font-medium text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-50 dark:bg-tealDark"
      >
        {isSubmitting ? 'Sending...' : 'Send message'}
      </button>
    </form>
  );
}
