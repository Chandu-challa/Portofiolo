# Chandu Challa Portfolio

A one-page developer portfolio built with Next.js 16, React 19, TypeScript, Tailwind CSS, Framer Motion, and EmailJS. It presents Chandu Challa’s experience, education, technical skills, certificates, selected public projects, and six private enterprise applications.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. Create a production build with `npm run build`, then serve it with `npm start`.

## Contact form email delivery

The contact form sends messages through EmailJS to `chanduchanduchalla7@gmail.com`. Set up an EmailJS email service and template, then configure these public identifiers in `.env.local` for local development and in the Netlify site environment for deployment:

```text
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

Set the EmailJS template’s **To Email** to `chanduchanduchalla7@gmail.com` and **Reply To** to `{{reply_to}}`. Use `{{from_name}}`, `{{reply_to}}`, `{{subject}}`, and `{{message}}` in the email subject/body. Keep the recipient fixed in the template; do not use a visitor-provided field for it. Restrict allowed origins in EmailJS to the local development address and deployed site, and enable provider-side spam protection. The form reports an error and offers a direct email fallback until all three identifiers are configured. Never put an EmailJS private key in a `NEXT_PUBLIC_` variable.

## Project screenshots

The site serves optimized WebP previews in `public/images/project-screenshots/`. Employee and operational values are obscured; the first Machine Shop preview is a blank form with no records. Five enterprise systems have screenshot-backed case studies. Gauge Management System is represented without screenshots or unverified workflow claims. Original enterprise screenshots are preserved in the ignored `.local-private-assets/project-screenshots-original/` folder and are not included in the public site.

The featured projects section links to CareerGraph, HRMS Lite, and Fake Job Detection. The HRMS frontend depends on a hosted API that may need time to wake up. Enterprise case studies describe only workflows visible in the available screenshots. Project-specific implementation stacks, individual module ownership, and code-level challenges are not claimed where supporting source files or notes were unavailable.

## Resume and contact

The resume action opens the PDF at `public/images/Fullstack_developer.pdf`, served at `/images/Fullstack_developer.pdf`. The contact section includes a direct WhatsApp link using the public phone number; it opens a chat for the visitor to send manually and does not require a WhatsApp API account. Update `RESUME_URL`, `EMAIL`, `LINKEDIN_URL`, and `GITHUB_URL` near the top of `app/page.tsx` when those destinations change.

## Deployment

The project retains its Next.js configuration and existing `@netlify/plugin-nextjs` dependency. The contact form requires the three EmailJS public identifiers above in Netlify’s site environment, followed by a redeploy.

The old `/about`, `/projects`, `/experience`, `/contact`, and `/certificates` paths redirect to their matching sections on the home page.
