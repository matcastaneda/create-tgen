interface Template {
  title: string;
  value: string;
  disabled: boolean;
}

export const availableTemplates: Template[] = [
  {
    title: 'Next.js 15 + ESLint + TypeScript + Shadcn/ui',
    value: 'next-15-eslint-tw-shadcn',
    disabled: false,
  },
  {
    title: 'Next.js 15 + ESLint + TypeScript + Tailwind CSS',
    value: 'next-15-eslint-tw',
    disabled: true,
  },
  {
    title: 'Next.js 14 + ESLint + TypeScript + Shadcn/ui',
    value: 'next-eslint-tw-shadcn',
    disabled: true,
  },
  {
    title: 'Next.js 14 + ESLint + TypeScript + Tailwind CSS',
    value: 'next-eslint-tw',
    disabled: true,
  },
  {
    title: 'React (vite) + ESLint + TypeScript + Shadcn/ui',
    value: 'vite-eslint-tw-shadcn',
    disabled: false,
  },
  {
    title: 'React (vite) + ESLint + TypeScript + Tailwind CSS',
    value: 'vite-eslint-tw',
    disabled: false,
  },
];
