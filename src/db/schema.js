import { integer, pgTable, varchar, uuid, text } from "drizzle-orm/pg-core";
export const usersTable = pgTable("users", {
  id: uuid().primaryKey().unique(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: text().notNull(),
  salt: text().notNull(),
});
