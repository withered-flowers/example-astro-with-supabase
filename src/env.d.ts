/// <reference types="astro/client" />

interface ImportMetaEnv {
	// Private Environment Variables
	readonly SUPABASE_DB_CONNECTION_STRING: string;
	readonly SUPABASE_URL: string;
	readonly SUPABASE_JWT_SECRET: string;
	readonly SUPABASE_SERVICE_ROLE_KEY: string;

	// Public Environment Variables
	readonly PUBLIC_SITE_URL: string;
	readonly PUBLIC_SUPABASE_URL: string;
	readonly PUBLIC_SUPABASE_ANON_KEY: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
