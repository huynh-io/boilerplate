import nextConfig from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import tanstackQuery from "@tanstack/eslint-plugin-query";

const config = [
  ...nextConfig,
  ...nextTypescript,
  ...tanstackQuery.configs["flat/recommended"],
  {
    ignores: ["tailwind.config.ts"],
  },
];

export default config;
