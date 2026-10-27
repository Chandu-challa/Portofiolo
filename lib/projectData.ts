import screenshotManifest from '@/lib/projectScreenshots.json';

export interface ProjectImage {
  src: string;
  alt: string;
  originalName: string;
}

export type ProjectCategory = 'workflow' | 'quality' | 'operations';

export interface Project {
  id: string;
  title: string;
  shortTitle: string;
  category: string;
  filterCategory: ProjectCategory;
  description: string;
  objective: string;
  confirmedScreens: string;
  myRole: string;
  features: string[];
  images: ProjectImage[];
  displayOrder: number;
}

const screenshots = screenshotManifest as Record<string, ProjectImage[]>;

const projectContribution =
  'Full Stack Developer contribution within the GreenTech Industries team. The available screenshots document the application screens, but do not establish individual module ownership.';

export const projects: Project[] = ([
  {
    id: 'cms-machine-shop',
    title: 'Change Management System — Machine Shop',
    shortTitle: 'CMS — Machine Shop',
    category: 'Enterprise Workflow Management',
    filterCategory: 'workflow',
    description:
      'An internal change workflow with dedicated request, assessment, risk review, approval, document, tracking, and history screens.',
    objective:
      'Give Machine Shop teams a structured way to submit, assess, approve, and track requested changes.',
    confirmedScreens:
      'The available screenshots show change requests and transaction details, feasibility and risk assessments, approval views, document handling, comparison screens, and tracking tables.',
    myRole: projectContribution,
    features: [
      'Change request and transaction details',
      'Feasibility and risk assessment screens',
      'Approval and change tracking views',
      'Document and history screens',
    ],
    images: screenshots['cms-machine-shop'] ?? [],
    displayOrder: 1,
  },
  {
    id: 'cms-foundry',
    title: 'Change Management System — Foundry',
    shortTitle: 'CMS — Foundry',
    category: 'Enterprise Change Management',
    filterCategory: 'workflow',
    description:
      'A Foundry change workflow shown through request, assessment, ECR tracking, item, and requirement screens.',
    objective:
      'Organize Foundry change requests and keep their assessment and tracking information together.',
    confirmedScreens:
      'The available screenshots show request and assessment forms, ECR tracking, item records, and a requirements table. They do not confirm additional workflow stages.',
    myRole: projectContribution,
    features: [
      'Change request and assessment forms',
      'ECR tracking view',
      'Item records',
      'Requirements table',
    ],
    images: screenshots['cms-foundry'] ?? [],
    displayOrder: 2,
  },
  {
    id: 'gauge-management',
    title: 'Gauge Management System',
    shortTitle: 'Gauge Management',
    category: 'Quality Systems',
    filterCategory: 'quality',
    description:
      'An internal GreenTech Industries application. Screenshots and project files for this system were not available in the portfolio workspace.',
    objective:
      'Project workflows and the business objective need confirmation before they can be described accurately.',
    confirmedScreens:
      'No Gauge Management System screenshots or source files were present in the available workspace.',
    myRole:
      'The supplied portfolio brief identifies this as one of the six internal applications. Project-specific responsibilities need confirmation.',
    features: [],
    images: screenshots['gauge-management'] ?? [],
    displayOrder: 6,
  },
  {
    id: 'security-management',
    title: 'Security Management System',
    shortTitle: 'Security Management',
    category: 'Security and Visitor Workflows',
    filterCategory: 'operations',
    description:
      'An internal application with screens for visitor requests, gate check-in, approvals, visitor history, vehicle logs, bicycle records, and access management.',
    objective:
      'Support day-to-day visitor and gate workflows through organized request, check-in, history, vehicle, and bicycle screens.',
    confirmedScreens:
      'The available screenshots show visitor request, gate check-in, approvals and history, visitor details, vehicle records, bicycle logs, open transactions, and access screens. Personal details are blurred.',
    myRole: projectContribution,
    features: [
      'Visitor request and gate check-in screens',
      'Visitor approval and history views',
      'Vehicle and bicycle records',
      'Open transactions and access screens',
    ],
    images: screenshots['security-management'] ?? [],
    displayOrder: 3,
  },
  {
    id: 'dormitory-management',
    title: 'Dormitory Management System',
    shortTitle: 'Dormitory Management',
    category: 'Internal Facility Management',
    filterCategory: 'operations',
    description:
      'An internal facility application with room status, requisition, checkout, maintenance, and employee-history screens.',
    objective:
      'Bring dormitory-related room and request workflows into one internal application.',
    confirmedScreens:
      'The available screenshots show room-wise status, requisition and approval views, checkout, maintenance, employee history, and supplier forms. Personal records are blurred.',
    myRole: projectContribution,
    features: [
      'Room-wise status view',
      'Requisition and approval screens',
      'Checkout and maintenance screens',
      'Employee-history and supplier screens',
    ],
    images: screenshots['dormitory-management'] ?? [],
    displayOrder: 4,
  },
  {
    id: 'canteen-management',
    title: 'Canteen Management System',
    shortTitle: 'Canteen Management',
    category: 'Internal Operations Management',
    filterCategory: 'operations',
    description:
      'An internal canteen application with screens for menus, stock, grain issue, recipe and ingredient mapping, consumption, and access.',
    objective:
      'Support canteen menu and inventory workflows through connected item, stock, recipe, and consumption screens.',
    confirmedScreens:
      'The available screenshots show menu, stock entry and adjustment, grain issue, item and grocery masters, recipe viewing, ingredient mapping and consumption, non-recipe items, and access. Operational values are blurred.',
    myRole: projectContribution,
    features: [
      'Menu and inventory screens',
      'Stock entry, adjustment, and grain issue',
      'Recipe and ingredient mapping',
      'Consumption and access screens',
    ],
    images: screenshots['canteen-management'] ?? [],
    displayOrder: 5,
  },
] as Project[]).sort((first, second) => first.displayOrder - second.displayOrder);
