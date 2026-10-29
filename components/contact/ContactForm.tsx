'use client';

import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { FormEvent, useRef, useState } from 'react';
import { LoaderCircle, Send } from 'lucide-react';

const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID?.trim() ?? '';
const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID?.trim() ?? '';
const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY?.trim() ?? '';
const isConfigured = Boolean(serviceId && templateId && publicKey);

type FormStatus = 'idle' | 'sending' | 'sent' | 'error' | 'rate-limited' | 'unconfigured';

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const sendingRef = useRef(false);
  const [status, setStatus] = useState<FormStatus>('idle');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formRef.current || sendingRef.current) return;

    const form = formRef.current;
    const formData = new FormData(form);
    const honeypot = String(formData.get('company_website') ?? '');

    // Quietly discard obvious bot submissions without sending a message.
    if (honeypot) {
      form.reset();
      setStatus('sent');
      return;
    }

    if (!isConfigured) {
      setStatus('unconfigured');
      return;
    }

    sendingRef.current = true;
    setStatus('sending');

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: String(formData.get('name') ?? '').trim(),
          reply_to: String(formData.get('email') ?? '').trim(),
          subject: String(formData.get('subject') ?? '').trim(),
          message: String(formData.get('message') ?? '').trim(),
        },
        {
          publicKey,
          limitRate: { id: 'portfolio-contact-form', throttle: 30_000 },
        },
      );

      form.reset();
      setStatus('sent');
    } catch (error) {
      setStatus(error instanceof EmailJSResponseStatus && error.status === 429 ? 'rate-limited' : 'error');
    } finally {
      sendingRef.current = false;
    }
  };

  const fieldClassName =
    'mt-2 w-full rounded-xl border border-portfolio-border bg-portfolio-bg px-4 py-3 text-base text-portfolio-text placeholder:text-portfolio-muted transition-colors focus:border-portfolio-accent focus:outline-none focus:ring-2 focus:ring-portfolio-accent/25';

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="rounded-2xl border border-portfolio-border bg-portfolio-panel p-5 sm:p-7"
      aria-label="Send Chandu a message"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="text-sm font-medium text-portfolio-text">
            Your name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            maxLength={80}
            required
            className={fieldClassName}
            placeholder="Jane Smith"
          />
        </div>

        <div>
          <label htmlFor="contact-email" className="text-sm font-medium text-portfolio-text">
            Email address
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            maxLength={254}
            required
            className={fieldClassName}
            placeholder="jane@example.com"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="contact-subject" className="text-sm font-medium text-portfolio-text">
            Subject
          </label>
          <input
            id="contact-subject"
            name="subject"
            type="text"
            maxLength={120}
            required
            className={fieldClassName}
            placeholder="What would you like to discuss?"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="contact-message" className="text-sm font-medium text-portfolio-text">
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={6}
            maxLength={4000}
            required
            className={`${fieldClassName} min-h-36 resize-y`}
            placeholder="Share a few details so I can get back to you."
          />
          <p className="mt-2 text-xs text-portfolio-muted">Please don’t include passwords or other sensitive information.</p>
        </div>
      </div>

      <div
        className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor="contact-company-website">Leave this field empty</label>
        <input
          id="contact-company-website"
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-md text-xs leading-relaxed text-portfolio-muted">
          Your message goes to Chandu. Your email address is used to reply.
        </p>
        <button
          type="submit"
          disabled={status === 'sending'}
          className="inline-flex min-h-12 w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-portfolio-accent px-5 py-3 text-sm font-semibold text-[#0B1220] transition-colors hover:bg-portfolio-accent-light focus:outline-none focus:ring-2 focus:ring-portfolio-accent focus:ring-offset-2 focus:ring-offset-portfolio-panel disabled:cursor-wait disabled:opacity-70 sm:w-auto"
        >
          {status === 'sending' ? (
            <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <Send className="h-4 w-4" aria-hidden="true" />
          )}
          {status === 'sending' ? 'Sending…' : 'Send message'}
        </button>
      </div>

      <div className="mt-4 min-h-6" aria-live="polite" role={status === 'error' || status === 'unconfigured' ? 'alert' : 'status'}>
        {status === 'sent' && (
          <p className="text-sm text-[#34D399]">Message sent. Thanks for reaching out.</p>
        )}
        {status === 'error' && (
          <p className="text-sm text-[#F87171]">
            I couldn’t send your message. Please try again or email{' '}
            <a className="underline underline-offset-2" href="mailto:chanduchanduchalla7@gmail.com">
              Chandu directly
            </a>.
          </p>
        )}
        {status === 'rate-limited' && (
          <p className="text-sm text-[#FBBF24]">
            Please wait 30 seconds before trying again, or email{' '}
            <a className="underline underline-offset-2" href="mailto:chanduchanduchalla7@gmail.com">
              Chandu directly
            </a>.
          </p>
        )}
        {status === 'unconfigured' && (
          <p className="text-sm text-[#FBBF24]">
            The form is not connected yet. Please email{' '}
            <a className="underline underline-offset-2" href="mailto:chanduchanduchalla7@gmail.com">
              Chandu directly
            </a>.
          </p>
        )}
      </div>
    </form>
  );
}
