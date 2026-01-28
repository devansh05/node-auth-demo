import {
  integer,
  pgTable,
  varchar,
  uuid,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
export const usersTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: text().notNull(),
  salt: text().notNull(),
  role: varchar().notNull(),
});

export const sessionTable = pgTable("session", {
  id: uuid().primaryKey().defaultRandom(),
  userId: uuid()
    .references(() => usersTable.id)
    .notNull(),
  createdAt: timestamp().defaultNow().notNull(),
});
