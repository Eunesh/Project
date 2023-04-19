import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/login": "http://localhost:3000",
      "/register": "http://localhost:3000",
      "/membership": "http://localhost:3000",
      "/logout": "http://localhost:3000",
      "/verify_payment": "http://localhost:3000",
      "/membershipInfo": "http://localhost:3000",
      "/checkMembership": "http://localhost:3000",
      "/trainerRegister": "http://localhost:3000",
      "/trainersData": "http://localhost:3000",
      "/varifyTrainers": "http://localhost:3000",
      "/removeTrainers": "http://localhost:3000",
      "/usersData": "http://localhost:3000",
      "/deleteUser": "http://localhost:3000",
      "/adminAuthentication": "http://localhost:3000",
      "/AdminPasswordUpdate": "http://localhost:3000",
      "/UserPasswordUpdate": "http://localhost:3000",
      "/Adminlogout": "http://localhost:3000",

      // '/startedmembership': 'http://localhost:3000',
    },
  },
  plugins: [react()],
});
