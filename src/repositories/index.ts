import * as schema from "@/database/schema/example";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// We will use this inside Astro
// So we will use import.meta.env instead of process.env
const connectionString = import.meta.env.SUPABASE_DB_CONNECTION_STRING;

const getDb = async () => {
	const client = postgres(connectionString, { prepare: false, max: 1 });
	const db = drizzle(client, { schema: schema });
	return db;
};

export const getAllUsers = async () => {
	const db = await getDb();
	const users = await db.query.User.findMany();
	return users;
};

export const getAllProducts = async () => {
	const db = await getDb();
	const products = await db.query.Product.findMany({
		columns: {
			product: true,
			slug: true,
			description: true,
			createdAt: true,
		},
	});
	return products;
};

export const getAllProductsWithRelations = async () => {
	const db = await getDb();
	const products = await db.query.Product.findMany({
		with: {
			Author: true,
		},
	});
	return products;
};
