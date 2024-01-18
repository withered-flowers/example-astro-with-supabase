import { faker } from "@faker-js/faker";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { Product, User } from "../schema/example";

const connectionString = process.env.SUPABASE_DB_CONNECTION_STRING;

if (!connectionString) {
	throw new Error("Connection string not found");
}

const client = postgres(connectionString, { prepare: false, max: 1 });
const db = drizzle(client);

const USERS_TO_CREATE = 10;
const PRODUCTS_TO_CREATE = 100;

const users = [];
const products = [];

for (let i = 0; i < USERS_TO_CREATE; i++) {
	users.push({
		name: faker.person.fullName(),
		email: faker.internet.email().toLocaleLowerCase(),
	});
}

for (let i = 0; i < PRODUCTS_TO_CREATE; i++) {
	const productName = `${faker.commerce.productName()} ${i + 1}`;

	products.push({
		product: productName,
		slug: faker.helpers.slugify(productName).toLowerCase(),
		description: faker.commerce.productDescription(),
		authorId: faker.number.int({ min: 1, max: USERS_TO_CREATE }),
	});
}

await db.insert(User).values(users).execute();
await db.insert(Product).values(products).execute();

await client.end();
