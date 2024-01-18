import { relations } from "drizzle-orm";
import {
	integer,
	pgTable,
	serial,
	text,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const User = pgTable("Users", {
	id: serial("id").primaryKey(),
	name: varchar("name", { length: 256 }).notNull(),
	email: varchar("email", { length: 256 }).notNull().unique(),
	createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow(),
	updatedAt: timestamp("updatedAt", { withTimezone: true }).defaultNow(),
});

export const UserRelations = relations(User, ({ many }) => ({
	Products: many(Product),
}));

export const Product = pgTable("Products", {
	id: serial("id").primaryKey(),
	product: varchar("product", { length: 256 }).notNull().unique(),
	slug: text("slug").notNull().unique(),
	description: text("description"),
	createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow(),
	updatedAt: timestamp("updatedAt", { withTimezone: true }).defaultNow(),
	authorId: integer("authorId")
		.notNull()
		.references(() => User.id, { onDelete: "cascade", onUpdate: "cascade" }),
});

export const ProductRelations = relations(Product, ({ one }) => ({
	Author: one(User, {
		fields: [Product.authorId],
		references: [User.id],
	}),
}));

export const userInsertSchema = createInsertSchema(User);
export const userSelectSchema = createSelectSchema(User);
export const productInsertSchema = createInsertSchema(Product);
export const productSelectSchema = createSelectSchema(Product);
