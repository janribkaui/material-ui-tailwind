import type { Config } from "tailwindcss";
import sharedConfig from "@repo/tailwind-config/tailwind.config.ts";

const config: Pick<Config, "content" | "presets"> = {
  content: [
    "./src/features/**/*.{js,ts,jsx,tsx}",
    "./src/shared/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@repo/shared/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@repo/ui/**/*.{js,ts,jsx,tsx}",
  ],
  presets: [sharedConfig],
};

export default config;
