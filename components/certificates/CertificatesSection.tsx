'use client';

import { motion } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';
import { certificates } from '@/lib/certificates';

export default function CertificatesSection() {
  return (
    <section
      id="certificates"
      className="py-16 sm:py-20"
      aria-labelledby="certificates-heading"
    >
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
          className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-portfolio-accent">Learning</p>
            <h2 id="certificates-heading" className="text-3xl font-bold text-portfolio-text sm:text-4xl">
              Certificates
            </h2>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-portfolio-muted">
            Selected certificates in programming, artificial intelligence, and databases.
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-3">
          {certificates.map((certificate, index) => (
            <motion.article
              key={certificate.id}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="group flex h-full flex-col rounded-2xl border border-portfolio-border bg-portfolio-panel p-5 transition-colors hover:border-portfolio-accent/40"
            >
              <div className="mb-5 flex items-start justify-between gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-portfolio-accent/20 bg-portfolio-accent/10 text-portfolio-accent-light">
                  <Award className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="rounded-full border border-portfolio-border bg-portfolio-card px-2.5 py-1 text-xs text-portfolio-muted">
                  {certificate.category}
                </span>
              </div>
              <h3 className="text-base font-semibold leading-snug text-portfolio-text">{certificate.title}</h3>
              <p className="mt-2 text-base text-portfolio-muted">{certificate.issuer}</p>
              <p className="mt-3 flex-1 text-base leading-relaxed text-portfolio-muted">{certificate.description}</p>
              <a
                href={certificate.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${certificate.title} certificate`}
                className="mt-5 inline-flex min-h-11 items-center gap-2 self-start rounded-lg text-sm font-medium text-portfolio-accent-bright transition-colors hover:text-portfolio-text focus:outline-none focus:ring-2 focus:ring-portfolio-accent"
              >
                View certificate
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
