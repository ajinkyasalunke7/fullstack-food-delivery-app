import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  compilerOptions: {
    module: "ES6",
    jsx: "preserve",
    checkJs: true,
  },
});
