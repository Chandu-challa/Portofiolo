export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  description: string;
  category: string;
  href: string;
}

export const certificates: Certificate[] = [
  {
    id: 'python-course',
    title: 'Python Course Completion Certificate',
    issuer: 'Coding Brains',
    description: 'Python programming course covering fundamentals, object-oriented programming, and advanced concepts.',
    category: 'Programming',
    href: 'https://drive.google.com/drive/folders/1aPtOVH8bxfkzITk1XNFCQZUR_qBSxKPZ?usp=sharing',
  },
  {
    id: 'artificial-intelligence',
    title: 'Artificial Intelligence',
    issuer: 'Slash Mark',
    description: 'Foundations of AI, machine learning algorithms, and practical implementations.',
    category: 'AI / ML',
    href: 'https://drive.google.com/file/d/1EpyO0_dBkxNgXh4XwiYE5RKXywlfvfGl/view?usp=sharing',
  },
  {
    id: 'sql-internship',
    title: 'SQL Internship',
    issuer: 'Slash Mark',
    description: 'Database design, query optimization, complex queries, and SQL Server management.',
    category: 'Database',
    href: 'https://drive.google.com/file/d/1logckmuyqxZgxPUSCblxJ0WkRn5Uxoj7/view?usp=sharing',
  },
];
