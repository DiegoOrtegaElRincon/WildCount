/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_KEY: string;
    // Declare other environment variables you use here
    // Example: readonly VITE_ANOTHER_VAR: string;
  
    // more properties can be added as needed
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }