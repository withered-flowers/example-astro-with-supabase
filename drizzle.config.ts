import { type Config, defineConfig } from "drizzle-kit";

const connString = process.env.SUPABASE_DB_CONNECTION_STRING || "";

export default defineConfig({
	schema: "./src/database/schema/*",
	out: "./src/database/migrations/",
	breakpoints: true,
	driver: "pg",
	dbCredentials: {
		connectionString: connString,
	},
	verbose: true,
	strict: true,
}) satisfies Config;
