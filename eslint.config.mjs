/** Minimal ESLint flat config (Next.js FlatCompat + eslint-config-next can error on ESLint 9 in some setups). */
export default [
  {
    ignores: [".next/**", "out/**", "node_modules/**", "next-env.d.ts"],
  },
];
